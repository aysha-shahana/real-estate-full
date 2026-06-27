from.models import Module



from .models import Module

def global_modules(request):

    if not request.user.is_authenticated:
        return {"modules": []}

    is_super_admin = request.user.groups.filter(
        name="Super Admin"
    ).exists()

    if is_super_admin:
        modules = Module.objects.all()
    else:
        modules = Module.objects.filter(
            allowed_groups__in=request.user.groups.all()
        ).distinct()

    for module in modules:

        if is_super_admin:
            module.filtered_children = module.children.all()
        else:
            module.filtered_children = module.children.filter(
                allowed_groups__in=request.user.groups.all()
            ).distinct()

    return {
        "modules": modules
    }