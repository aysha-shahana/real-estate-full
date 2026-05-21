from rest_framework import serializers
from my_app.models import PropertyListing

class PropertyListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyListing
        fields = '__all__'