from rest_framework import serializers
from my_app.models import PropertyListing , User , VisitRequest , PropertyOffer
        


class PropertyListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyListing
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(
        source="userprofile.profile_image",
        read_only=True
    )

    phone = serializers.CharField(
        source="userprofile.phone",
        read_only=True
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "profile_image",
            "phone",
        ]
        
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
        

class PropertyDetailSerializer(serializers.ModelSerializer):

    owner_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    member_since = serializers.SerializerMethodField()
    total_properties = serializers.SerializerMethodField()
    owner_image = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()

    class Meta:
        model = PropertyListing
        fields = "__all__"

    def get_member_since(self, obj):
        if obj.user:
            return obj.user.date_joined.strftime("%b %Y")
        return ""

    def get_total_properties(self, obj):
        if obj.user:
            return PropertyListing.objects.filter(
                user=obj.user
            ).count()
        return 0

    def get_owner_image(self, obj):
        try:
            return obj.user.userprofile.profile_image.url
        except:
            return None

    def get_phone(self, obj):
        try:
            return obj.user.userprofile.phone
        except:
            return ""