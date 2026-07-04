from django.shortcuts import redirect
from .models import Child


def admin_required(view_func):

    def wrapper(request, *args, **kwargs):

        if request.user.groups.filter(
            name__in=["Super Admin", "Admin"]
        ).exists():

            return view_func(
                request,
                *args,
                **kwargs
            )

        return redirect(
            "home"
        ) # frontend home page

    return wrapper




from functools import wraps

def child_permission_required(view_func):

    @wraps(view_func)
    def wrapper(request, child_id, *args, **kwargs):

        child = Child.objects.get(id=child_id)

        if request.user.groups.filter(name="Super Admin").exists():
            return view_func(request, child_id, *args, **kwargs)

        if child.allowed_groups.filter(
            id__in=request.user.groups.values_list("id", flat=True)
        ).exists():
            return view_func(request, child_id, *args, **kwargs)

        return redirect("index")

    return wrapper
