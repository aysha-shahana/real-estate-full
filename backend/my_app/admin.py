from django.contrib import admin
from .models import Module, Child, PropertyListing ,PropertyBooking , Amenity


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'url_name', 'icon')
    search_fields = ('name', 'url_name', 'icon')
    list_filter = ('name',)


@admin.register(Child)
class ChildAdmin(admin.ModelAdmin):
    filter_horizontal = ("allowed_groups",)
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
    
    filter_horizontal = ["amenities"]
    
from django.contrib import admin
from .models import VisitRequest

@admin.register(VisitRequest)
class VisitRequestAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "property",
        "name",
        "phone",
        "visit_date",
        "visit_time",
        "status",
    )

    list_filter = (
        "status",
        "visit_date",
    )

    search_fields = (
        "name",
        "phone",
        "email",
    )
    
    
    list_editable = (
        "status",
    )
    
    
@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ["name"]
    
    
    
@admin.register(PropertyBooking)
class PropertyBookingAdmin(admin.ModelAdmin):
    list_display = (
        "property",
        "name",
        "phone",
        "booking_amount",
        "payment_status"
    )
    
from .models import ContactInfo, ContactMessage

admin.site.register(ContactInfo)
admin.site.register(ContactMessage)
    

from .models import Blog
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'status',
        'created_at',
    )

    list_filter = (
        'status',
        'category',
    )

    search_fields = (
        'title',
        'meta_title',
        'meta_keywords',
    )

    prepopulated_fields = {
        'slug': ('title',)
    }