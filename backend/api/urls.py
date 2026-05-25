from django.urls import path
from .views import rent_properties, buy_properties, add_property, property_search
from .views import featured_properties , rent_property_search , buy_property_search

urlpatterns = [
    path("add-property/", add_property),
    path("buy-properties/", buy_properties),
    path("rent-properties/", rent_properties),
    path("property-search/", property_search, name="property-search"),
    path("featured-properties/", featured_properties),
    path("rent-property-search/", rent_property_search),
    path("buy-property-search/", buy_property_search)
]
