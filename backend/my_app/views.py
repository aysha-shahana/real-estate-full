from django.contrib.auth.models import Group, User
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.admin.views.decorators import staff_member_required

# Model Imports
from .models import Module, Child
from my_app.models import PropertyListing

from .decorators import admin_required , child_permission_required





# =========================================================================
# 1. AUTHENTICATION VIEWS (LOGIN, SIGNUP, LOGOUT)
# =========================================================================

@csrf_protect
def login_view(request):
    if request.user.is_authenticated:
        return redirect('index')
        
    if request.method == "POST":
        user_name = request.POST.get('username')
        pass_word = request.POST.get('password')
        
        user = authenticate(request, username=user_name, password=pass_word)
        
        if user is not None:
            auth_login(request, user)
            messages.success(request, f"Welcome back {user_name}! 🎉")
            return redirect('index') 
        else:
            messages.error(request, "Invalid username or password!")
            return redirect('login') 

    return render(request, 'login.html')


def signup_view(request):
    if request.method == "POST":
        user_name = request.POST.get('username')
        em_ail = request.POST.get('email')
        pass_word = request.POST.get('password')

        if User.objects.filter(username=user_name).exists():
            messages.error(request, "Username already taken!")
            return redirect('signup')
        
        user = User.objects.create_user(username=user_name, email=em_ail, password=pass_word)
        user.save()
        
        messages.success(request, "Account created successfully! Please Sign In.")
        return redirect('login')

    return render(request, 'logout.html')

def logout_view(request):
    auth_logout(request)
    messages.success(request, "Logged out successfully 👍")
    return redirect('login')


# =========================================================================
# 2. CORE DASHBOARD & LAYOUT ROUTING
# =========================================================================


@login_required
@admin_required
def index(request):
    
    # Main cards
    total_properties = PropertyListing.objects.count()

    featured_properties = PropertyListing.objects.filter(
        is_featured=True
    ).count()

    total_users = User.objects.count()

    # Property statistics
    buy_properties = PropertyListing.objects.filter(
        listing_type="buy"
    ).count()

    rent_properties = PropertyListing.objects.filter(
        listing_type="rent"
    ).count()

    sold_properties = PropertyListing.objects.filter(
        status="sold"
    ).count()

    rented_properties = PropertyListing.objects.filter(
        status="rented"
    ).count()

    # Property type chart
    villa_count = PropertyListing.objects.filter(
        property_type="villa"
    ).count()

    apartment_count = PropertyListing.objects.filter(
        property_type="apartment"
    ).count()

    house_count = PropertyListing.objects.filter(
        property_type="house"
    ).count()

    plot_count = PropertyListing.objects.filter(
        property_type="plot"
    ).count()

    # Visit requests
    pending_visits = VisitRequest.objects.filter(
        status="pending"
    ).count()

    accepted_visits = VisitRequest.objects.filter(
        status="accepted"
    ).count()

    rejected_visits = VisitRequest.objects.filter(
        status="rejected"
    ).count()


    # Recent properties
    recent_properties = PropertyListing.objects.order_by(
        "-created_at"
    )[:5]

    context = {
        # Main cards
        "total_properties": total_properties,
        "featured_properties": featured_properties,
        "total_users": total_users,

        # Property stats
        "buy_properties": buy_properties,
        "rent_properties": rent_properties,
        "sold_properties": sold_properties,
        "rented_properties": rented_properties,

        # Charts
        "villa_count": villa_count,
        "apartment_count": apartment_count,
        "house_count": house_count,
        "plot_count": plot_count,

        # Requests
        "pending_visits": pending_visits,
        "accepted_visits": accepted_visits,
        "rejected_visits": rejected_visits,

        # Recent properties
        "recent_properties": recent_properties,
    }

    return render(
        request,
        "index.html",
        context
    )




from .models import UserProfile
from django.contrib.auth import update_session_auth_hash



@login_required
@admin_required
def admin_profile(request):

    profile, created = UserProfile.objects.get_or_create(
        user=request.user
    )

    if request.method == "POST":

        # PASSWORD CHANGE
        if "change_password" in request.POST:

            old_password = request.POST.get("old_password")
            new_password1 = request.POST.get("new_password1")
            new_password2 = request.POST.get("new_password2")

            if not request.user.check_password(old_password):
                messages.error(
                    request,
                    "Current password is incorrect."
                )

            elif new_password1 != new_password2:
                messages.error(
                    request,
                    "Passwords do not match."
                )

            else:
                request.user.set_password(
                    new_password1
                )
                request.user.save()

                update_session_auth_hash(
                    request,
                    request.user
                )

                messages.success(
                    request,
                    "Password updated successfully."
                )

            return redirect("admin-profile")

        # PROFILE UPDATE
        else:

            request.user.first_name = request.POST.get(
                "first_name"
            )

            request.user.last_name = request.POST.get(
                "last_name"
            )

            request.user.email = request.POST.get(
                "email"
            )

            profile.phone = request.POST.get(
                "phone"
            )

            if request.FILES.get("profile_image"):
                profile.profile_image = request.FILES.get(
                    "profile_image"
                )

            request.user.save()
            profile.save()

            messages.success(
                request,
                "Profile updated successfully."
            )

            return redirect("admin-profile")

    context = {
        "profile": profile,
        "total_properties": PropertyListing.objects.count(),
        "featured_properties": PropertyListing.objects.filter(
            is_featured=True
        ).count(),
        "pending_visits": VisitRequest.objects.filter(
            status="pending"
        ).count(),
        "recent_properties": PropertyListing.objects.order_by(
            "-created_at"
        )[:5],
    }

    return render(
        request,
        "admin_profile.html",
        context
    )

@login_required(login_url='login')
def module_view(request, module_id):
    module = get_object_or_404(Module, id=module_id)
    template_name = f'{module.url_name}' if module.url_name else 'index.html'
    return render(request, template_name, {'module': module})


# @login_required(login_url='login')
# def child_view(request, child_id):
#     child = get_object_or_404(Child, id=child_id)
#     all_modules = Module.objects.all() 
    
#     if child.url_name:
#         template_path = child.url_name if child.url_name.endswith('.html') else f"{child.url_name}.html"
#     else:
#         template_path = "index.html"
        
#     context = {'child': child, 'modules': all_modules} 
    
#     if "property_list" in template_path or "propertylist" in template_path:
#         context['listings'] = PropertyListing.objects.all()
        
#     return render(request, template_path, context)

@child_permission_required
@login_required(login_url="login")
def child_view(request, child_id):

    child = get_object_or_404(Child, id=child_id)

    if child.url_name:
        return redirect(child.url_name)

    return redirect("index")


# =========================================================================
# 3. EXTRA SUB-PAGES HANDLERS
# =========================================================================

@admin_required
@login_required(login_url='login')
def propertylist(request):
    
    if not request.user.is_staff:
        return redirect("/")
    
    all_properties = PropertyListing.objects.all()
    all_modules = Module.objects.all()
    context = {
        'listings': all_properties,
        'modules': all_modules
    }
    return render(request, 'property_list.html', context)


from .forms import PropertyForm

@login_required
def add_property(request):
    if request.method == "POST":
        form = PropertyForm(request.POST, request.FILES)

        if form.is_valid():
            property_obj = form.save(commit=False)
            property_obj.user = request.user
            property_obj.save()

            # Save ManyToMany fields (Amenities)
            form.save_m2m()

            messages.success(request, "Property added successfully.")
            return redirect("property-list")

    else:
        form = PropertyForm()

    return render(
        request,
        "property/add-property.html",
        {
            "form": form,
        },
    )
    

@login_required
def edit_property(request, id):

    property_obj = get_object_or_404(
        PropertyListing,
        id=id
    )

    if request.method == "POST":

        form = PropertyForm(
            request.POST,
            request.FILES,
            instance=property_obj
        )

        if form.is_valid():
            form.save()

            messages.success(
                request,
                "Property updated successfully."
            )

            return redirect("property-list")

    else:

        form = PropertyForm(
            instance=property_obj
        )

    return render(
        request,
        "edit-property.html",
        {
            "form": form,
            "property": property_obj,
        },
    )



@login_required
def delete_property(request, id):

    property_obj = get_object_or_404(
        PropertyListing,
        id=id
    )

    property_obj.delete()

    messages.success(
        request,
        "Property deleted successfully."
    )

    return redirect("property-list")


@login_required
@admin_required
def edit_group(request, id):

    group = Group.objects.get(id=id)

    if request.method == "POST":

        group.name = request.POST.get(
            "group_name"
        )

        group.save()

        messages.success(
            request,
            "Group updated successfully"
        )

        return redirect("grouplist")

    return redirect("grouplist")


@admin_required
@login_required(login_url='login')
def addgroup(request):

    if request.method == "POST":
        group_name = request.POST.get("group_name")

        if group_name:
            Group.objects.create(name=group_name)
            messages.success(request, "User Group Added Successfully")
            return redirect("group-list")

    return render(request, "addgroup.html", {
        'modules': Module.objects.all()
    })

@admin_required
@login_required(login_url='login')
def grouplist(request):

    groups = Group.objects.all().order_by('-id')

    return render(request, "grouplist.html", {
        'groups': groups,
        'modules': Module.objects.all()
    })

@admin_required
@login_required(login_url='login')
def deletegroup(request, id):

    group = get_object_or_404(Group, id=id)
    group.delete()

    messages.success(request, "Group Deleted Successfully")

    return redirect('group-list')


@admin_required
@login_required(login_url='login')
def adduser_view(request):
    all_modules = Module.objects.all()  # Keeps sidebar navigation alive
    
    if request.method == "POST":
        user_name = request.POST.get('username', '').strip()
        em_ail = request.POST.get('email', '').strip()
        pass_word = request.POST.get('password', '')
        confirm_pass = request.POST.get('confirm_password', '')
        
        # 1. Validation: Check if fields are empty
        if not user_name or not pass_word:
            messages.error(request, "Username and password fields are strictly required.")
            return render(request, "add_user.html", {'modules': all_modules})
            
        # 2. Validation: Check password confirmation match
        if pass_word != confirm_pass:
            messages.error(request, "Passwords do not match! Please verify your inputs.")
            return render(request, "add_user.html", {'modules': all_modules, 'typed_username': user_name, 'typed_email': em_ail})

        # 3. Validation: Verify if username already exists in database
        if User.objects.filter(username=user_name).exists():
            messages.error(request, f"The username '{user_name}' is already taken!")
            return render(request, "add_user.html", {'modules': all_modules, 'typed_email': em_ail})

        # 4. Success Execution: Create the account securely
        new_user = User.objects.create_user(username=user_name, email=em_ail, password=pass_word)
        new_user.save()
        
        messages.success(request, f"User account '{user_name}' successfully registered! 🎉")
        return redirect('/child/2/')  # Redirects straight back to your user list view
        
    return render(request, "add_user.html", {'modules': all_modules})



@admin_required
@login_required(login_url='login')
def userlist(request):
   
    all_users = User.objects.all()
    all_modules = Module.objects.all() 
    
    context = {
        'users': all_users,
        'modules': all_modules
    }
    return render(request, "userlist.html", context)


# DELETE USER TRANSACTION

@admin_required
@login_required(login_url='login')
def delete_user(request, user_id):
    if request.method == "POST":
        # Prevent superusers from accidentally deleting themselves
        if request.user.id == int(user_id):
            messages.error(request, "You cannot delete your own active session account!")
            return redirect(request.META.get('HTTP_REFERER', 'index'))
            
        target_user = get_object_or_404(User, id=user_id)
        target_user.delete()
        messages.success(request, f"User account '{target_user.username}' successfully removed.")
    return redirect(request.META.get('HTTP_REFERER', 'index'))



# EDIT USER TRANSACTION
@admin_required
@login_required(login_url='login')
def edit_user(request, user_id):
    target_user = get_object_or_404(User, id=user_id)
    all_modules = Module.objects.all()
    
    if request.method == "POST":
        target_user.username = request.POST.get('username')
        target_user.email = request.POST.get('email')
        target_user.save()
        messages.success(request, f"Account settings for '{target_user.username}' updated successfully.")
        return redirect('user-list')
        
    return render(request, 'edit_user.html', {'target_user': target_user, 'modules': all_modules})


def user_dashboard(request):
    return render(request, "dashboard/index.html") 


from my_app.models import VisitRequest


@login_required
@admin_required
def visit_requests(request):

    visits = VisitRequest.objects.all()

    return render(
        request,
        "visit_requests.html",
        {"visits": visits}
    )
    
def accept_visit(request, pk):

    visit = get_object_or_404(
        VisitRequest,
        id=pk
    )

    visit.status = "accepted"
    visit.save()

    return redirect("visit-requests")


def reject_visit(request, pk):

    visit = get_object_or_404(
        VisitRequest,
        id=pk
    )

    visit.status = "rejected"
    visit.save()

    return redirect("visit-requests")


    
from .models import Blog

@admin_required
@login_required(login_url="login")
def blog_list(request):
   
    blogs = Blog.objects.all().order_by("-created_at")
    all_modules = Module.objects.all()

    context = {
        "blogs": blogs,
        "modules": all_modules,
    }

    return render(request, "blog_list.html", context)


from .forms import BlogForm

@admin_required
@login_required(login_url="login")
def add_blog(request):


    all_modules = Module.objects.all()

    if request.method == "POST":
        form = BlogForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            messages.success(request, "Blog added successfully.")
            return redirect("blog-list")

    else:
        form = BlogForm()

    context = {
        "form": form,
        "modules": all_modules,
    }

    return render(request, "add_blog.html", context)


@admin_required
@login_required(login_url="login")
def edit_blog(request, id):

    blog = get_object_or_404(Blog, id=id)

    all_modules = Module.objects.all()

    if request.method == "POST":

        form = BlogForm(
            request.POST,
            request.FILES,
            instance=blog
        )

        if form.is_valid():

            form.save()

            messages.success(
                request,
                "Blog updated successfully."
            )

            return redirect("blog-list")

    else:

        form = BlogForm(instance=blog)

    context = {
        "form": form,
        "modules": all_modules,
        "blog": blog,
    }

    return render(
        request,
        "edit_blog.html",
        context
    )
    
    
@admin_required
@login_required(login_url="login")
def delete_blog(request, id):

    blog = get_object_or_404(
        Blog,
        id=id
    )

    if request.method == "POST":

        blog.delete()

        messages.success(
            request,
            "Blog deleted successfully."
        )

        return redirect("blog-list")

    context = {
        "blog": blog,
        "modules": Module.objects.all(),
    }

    return render(
        request,
        "delete_blog.html",
        context
    )
    
from .models import BlogCategory
from .forms import BlogCategoryForm


@login_required(login_url="login")
def add_blog_category(request):
    if request.method == "POST":
        form = BlogCategoryForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Category added successfully.")
            return redirect("blog_category_list")   # list page later create cheyyam
    else:
        form = BlogCategoryForm()

    return render(request, "add_blog_category.html", {
        "form": form
    })
    
@login_required(login_url="login")
def blog_category_list(request):
    categories = BlogCategory.objects.all()

    return render(
        request,
        "blog_category_list.html",
        {"categories": categories},
    )
    

def edit_blog_category(request, id):
    category = get_object_or_404(BlogCategory, id=id)

    if request.method == "POST":
        category.name = request.POST.get("name")
        category.slug = request.POST.get("slug")
        category.save()
        return redirect("blog_category_list")

    return render(request, "edit_blog_category.html", {"category": category})


from django.http import HttpResponse

def delete_blog_category(request, id):
    category = get_object_or_404(BlogCategory, id=id)

    if request.method == "POST":
        
        if category.blogs.exists():
            return HttpResponse("Cannot delete category with blogs")

        category.delete()
        return redirect("blog_category_list")

    return render(request, "delete_blog_category.html", {"category": category})