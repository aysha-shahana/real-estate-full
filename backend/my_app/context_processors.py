from.models import Module


def global_modules(request):
    modules= Module.objects.all().order_by('id')
    return{
        'modules': modules
    }