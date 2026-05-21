from django.contrib import admin
from .models import Module, Child, PropertyListing


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'url_name', 'icon')
    search_fields = ('name', 'url_name', 'icon')
    list_filter = ('name',)


@admin.register(Child)
class ChildAdmin(admin.ModelAdmin):
    list_display = ('name', 'module', 'url_name')
    search_fields = ('module__name', 'name', 'url_name')
    list_filter = ('module',)


@admin.register(PropertyListing)
class PropertyListingAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'price',
        'beds',
        'baths',
        'listing_type',
        'address',
    )

    search_fields = ('title', 'address')

    list_filter = (
        'listing_type',
        'beds',
        'baths',
    )

    list_per_page = 10