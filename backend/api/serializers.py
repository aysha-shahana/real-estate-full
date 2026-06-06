from rest_framework import serializers
from my_app.models import PropertyListing , User , VisitRequest , PropertyOffer
        


class PropertyListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyListing
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(source="userprofile.profile_image")

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "profile_image"]
        
        
class VisitRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = VisitRequest
        fields = "__all__"
        


class PropertyOfferSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = PropertyOffer

        fields = "__all__"