from django.contrib import admin
from .models import Module, Child, PropertyListing , PropertyOffer ,PropertyBooking , Amenity


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
    
    
@admin.register(PropertyOffer)
class PropertyOfferAdmin(admin.ModelAdmin):
    list_display = (
        "property",
        "name",
        "phone",
        "offer_amount",
        "created_at"
    )
    
    
@admin.register(PropertyBooking)
class PropertyBookingAdmin(admin.ModelAdmin):
    list_display = (
        "property",
        "name",
        "phone",
        "booking_amount",
        "payment_status"
    )