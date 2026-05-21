from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from.models import Module, Child
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from my_app.models import PropertyListing
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.http import require_POST

# Create your views here.

@csrf_protect
def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            messages.success(request, f"Welcome back {username}! 🎉", extra_tags="login")
            return redirect('index')
        else:
            messages.error(request, "Invalid username or password" , extra_tags="logout")
    return render(request, 'login.html')

def user_logout(request):   
    auth_logout(request)
    messages.success(request, "Logged out successfully 👍")
    return redirect('login')

def module_view(request, module_id):
    module = get_object_or_404(Module, id=module_id)
    template_name = f'{module.url_name}' if module.url_name else 'index.html'
    return render(request,template_name, {'module': module})

def child_view(request, child_id):
    child = get_object_or_404(Child, id=child_id)
    
    # Safe fallback handler for template files
    if child.url_name:
        template_path = child.url_name if child.url_name.endswith('.html') else f"{child.url_name}.html"
    else:
        template_path = "index.html"
        
    # CREATE CONTEXT DICTIONARY
    context = {'child': child}
    
    # CRITICAL FIX: If the requested dashboard page is the property list, attach the database listings!
    if "property_list" in template_path or "propertylist" in template_path:
        context['listings'] = PropertyListing.objects.all()
        
    return render(request, template_path, context)

@csrf_protect
def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            messages.success(request, f"Welcome back {username}! 🎉", extra_tags="login")
            return redirect('index')
        else:
            messages.error(request, "Invalid username or password" , extra_tags="logout")
    return render(request, 'login.html')

def user_logout(request):   
    auth_logout(request)
    messages.success(request, "Logged out successfully 👍")
    return redirect('login')

def index(request):
    return render(request, "index.html")

def propertylist(request):
   # 1. Fetch all rows from your PropertyListing table
    all_properties = PropertyListing.objects.all()
    
    # 2. Pass it into the context dictionary with the exact key 'listings'
    context = {
        'listings': all_properties
    }
    return render(request, 'property_list.html', context)

def addgroup(request):
    return render(request, "add_group.html")


def grouplist(request):
    return render(request, "grouplist.html")


def adduser(request):
    return render(request, "add_user.html")

    
def userlist(request):
    return render(request, "userlist.html")


def login(request):
    return render(request, "login.html")