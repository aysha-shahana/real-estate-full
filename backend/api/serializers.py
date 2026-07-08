from rest_framework import serializers
from my_app.models import PropertyListing , User , VisitRequest , Amenity , NearbyPlace , ContactLead , ContactInfo , ContactMessage , Blog
        


class PropertyListingSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyListing
        fields = "__all__"

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None
        
class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

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

    def get_profile_image(self, obj):
        if hasattr(obj, "userprofile") and obj.userprofile.profile_image:
            return obj.userprofile.profile_image.url
        return None
        
class VisitRequestSerializer(serializers.ModelSerializer):
    
    property_title = serializers.CharField(
    source="property.title",
    read_only=True
)

    class Meta:
        model = VisitRequest
        fields = "__all__"
        

        
class AmenitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Amenity
        fields = ["id", "name"]
        
class NearbyPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NearbyPlace
        fields = "__all__"

class PropertyDetailSerializer(serializers.ModelSerializer):
    
    amenities = AmenitySerializer(
        many=True,
        read_only=True
    )
    
    nearby_places_list = NearbyPlaceSerializer(
        many=True,
        read_only=True
    )

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
        

class ContactLeadSerializer(
    serializers.ModelSerializer):

    property_title = serializers.CharField(
        source="property.title",
        read_only=True
    )

    class Meta:
        model = ContactLead
        fields = "__all__"
        
    def validate_phone(self, value):
        import re

        if not re.match(r'^[6-9]\d{9}$', value):
            raise serializers.ValidationError(
                "Enter a valid 10-digit phone number."
            )

        return value
    
    


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = "__all__"
        
        
class BlogSerializer(serializers.ModelSerializer):
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = "__all__"

    def get_featured_image(self, obj):
        if obj.featured_image:
            return obj.featured_image.url
        return None