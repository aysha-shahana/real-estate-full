from django.urls import path
from .views import rent_properties, buy_properties , add_property

urlpatterns = [
     path('add-property/', add_property),
    path('buy-properties/', buy_properties),
    path('rent-properties/', rent_properties),
]