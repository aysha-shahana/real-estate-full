from django.contrib.auth.models import Group, User
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

# Model Imports
from .models import Module, Child
from my_app.models import PropertyListing

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

@login_required(login_url='login') 
def index(request):
    # CRITICAL: Sidebar-il modules list cheyyaan database-il ninnu edukkunnu
    all_modules = Module.objects.all()
    return render(request, 'index.html', {'modules': all_modules})


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
