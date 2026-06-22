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
from my_app.models import PropertyOffer
from my_app.models import RentalApplication





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

def index(request):
    
    all_modules = Module.objects.all()

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

    # Offers
    pending_offers = PropertyOffer.objects.filter(
        status="pending"
    ).count()

    # Recent properties
    recent_properties = PropertyListing.objects.order_by(
        "-created_at"
    )[:5]

    context = {
        
        "modules": all_modules,
        
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
        "pending_offers": pending_offers,

        # Recent properties
        "recent_properties": recent_properties,
    }

    return render(
        request,
        "index.html",
        context
    )




from django.contrib.auth.decorators import login_required
from .models import UserProfile

@login_required
def admin_profile(request):

    profile, created = UserProfile.objects.get_or_create(
        user=request.user 
    )

    if request.method == "POST":

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

    context = {
        "profile": profile,

        "total_properties":
        PropertyListing.objects.count(),

        "featured_properties":
        PropertyListing.objects.filter(
            is_featured=True
        ).count(),

        "pending_visits":
        VisitRequest.objects.filter(
            status="pending"
        ).count(),

        "pending_offers":
        PropertyOffer.objects.filter(
            status="pending"
        ).count(),

        "recent_properties":
        PropertyListing.objects.order_by(
            "-created_at"
        )[:5]
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

@login_required(login_url='login')
def child_view(request, child_id):

    child = get_object_or_404(Child, id=child_id)
    all_modules = Module.objects.all()

    if child.url_name:
        template_path = child.url_name if child.url_name.endswith('.html') else f"{child.url_name}.html"
    else:
        template_path = "index.html"

    context = {
        'child': child,
        'modules': all_modules
    }

    # USER LIST
    if "userlist" in template_path or "user_list" in template_path:
        context['users'] = User.objects.all()

    # PROPERTY LIST
    if "property_list" in template_path or "propertylist" in template_path:
        context['listings'] = PropertyListing.objects.all()

    # GROUP LIST
    if "grouplist" in template_path or "group_list" in template_path:
        context['groups'] = Group.objects.all()
        
    # VISIT REQUEST LIST

    if "visit_requests" in template_path:
        context["visits"] = VisitRequest.objects.all().order_by(
        "-created_at"
    )
    
    # PROPERTY OFFERS
    if "property_offer" in template_path or "offers" in template_path:
        context["offers"] = PropertyOffer.objects.all().order_by(
        "-created_at"
    )
        
        
    # PROPERTY OFFERS

    if "offers" in template_path:

        offers = PropertyOffer.objects.all().order_by("-created_at")

        context["offers"] = offers

        context["total_offers"] = offers.count()

        context["highest_offer"] = (
        PropertyOffer.objects.aggregate(
            Max("offer_amount")
        )["offer_amount__max"]
    )
        
    if "rent_applications" in template_path:

        applications = RentalApplication.objects.all().order_by(
        "-created_at"
    )

        context["applications"] = applications

        context["total_applications"] = applications.count()

        context["total_properties"] = (
        PropertyListing.objects.count()
        )

    context["total_visits"] = (
        VisitRequest.objects.count()
    )

    return render(request, template_path, context)


# =========================================================================
# 3. EXTRA SUB-PAGES HANDLERS
# =========================================================================

@login_required(login_url='login')
def propertylist(request):
    all_properties = PropertyListing.objects.all()
    all_modules = Module.objects.all()
    context = {
        'listings': all_properties,
        'modules': all_modules
    }
    return render(request, 'property_list.html', context)

@login_required(login_url='login')
def addgroup(request):

    if request.method == "POST":
        group_name = request.POST.get("group_name")

        if group_name:
            Group.objects.create(name=group_name)
            messages.success(request, "User Group Added Successfully")
            return redirect("grouplist")

    return render(request, "addgroup.html", {
        'modules': Module.objects.all()
    })


@login_required(login_url='login')
def grouplist(request):

    groups = Group.objects.all().order_by('-id')

    return render(request, "grouplist.html", {
        'groups': groups,
        'modules': Module.objects.all()
    })


@login_required(login_url='login')
def deletegroup(request, id):

    group = get_object_or_404(Group, id=id)
    group.delete()

    messages.success(request, "Group Deleted Successfully")

    return redirect('grouplist')

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
@login_required(login_url='login')
def edit_user(request, user_id):
    target_user = get_object_or_404(User, id=user_id)
    all_modules = Module.objects.all()
    
    if request.method == "POST":
        target_user.username = request.POST.get('username')
        target_user.email = request.POST.get('email')
        target_user.save()
        messages.success(request, f"Account settings for '{target_user.username}' updated successfully.")
        return redirect('userlist')
        
    return render(request, 'edit_user.html', {'target_user': target_user, 'modules': all_modules})


def user_dashboard(request):
    return render(request, "dashboard/index.html") 


from my_app.models import VisitRequest

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

    return redirect("visit_requests")


def reject_visit(request, pk):

    visit = get_object_or_404(
        VisitRequest,
        id=pk
    )

    visit.status = "rejected"
    visit.save()

    return redirect("visit_requests")

from django.db.models import Max

@staff_member_required
def offer_list(request):

    offers = PropertyOffer.objects.all().order_by("-created_at")

    context = {
        "offers": offers,

        "total_offers": PropertyOffer.objects.count(),

        "highest_offer": PropertyOffer.objects.aggregate(
            Max("offer_amount")
        )["offer_amount__max"],

        "total_properties": PropertyListing.objects.count(),

        "total_visits": VisitRequest.objects.count(),
    }

    return render(
        request,
        "admin/offers.html",
        context
    )
    
    
    
def accept_offer(request, offer_id):

    offer = get_object_or_404(
        PropertyOffer,
        id=offer_id
    )

    offer.status = "accepted"
    offer.save()

    messages.success(
        request,
        "Offer accepted successfully."
    )

    return redirect(request.META.get("HTTP_REFERER"))



def reject_offer(request, offer_id):

    offer = get_object_or_404(
        PropertyOffer,
        id=offer_id
    )

    offer.status = "rejected"
    offer.save()

    messages.warning(
        request,
        "Offer rejected."
    )

    return redirect(request.META.get("HTTP_REFERER"))

def rent_applications(request):

    applications = RentalApplication.objects.all().order_by('-created_at')

    return render(
        request,
        "rent_applications.html",
        {
            "applications": applications
        }
    )
