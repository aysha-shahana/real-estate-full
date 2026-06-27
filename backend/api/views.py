from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from my_app.models import PropertyListing , UserProfile , RentalApplication , ContactLead
from .serializers import PropertyListingSerializer , VisitRequestSerializer , PropertyDetailSerializer , ContactLeadSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from my_app.models import VisitRequest , Amenity



@api_view(['POST'])
def signup(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        'message': 'User created successfully'
    })
    
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_properties(request):

    properties = PropertyListing.objects.filter(
        user=request.user
    ).order_by("-id")

    serializer = PropertyListingSerializer(
        properties,
        many=True
    )

    return Response(serializer.data)
@api_view(['GET'])
def buy_properties(request):
    properties = PropertyListing.objects.filter(
        listing_type='buy'
    )

    serializer = PropertyListingSerializer(
        properties,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def rent_properties(request):
    properties = PropertyListing.objects.filter(
        listing_type='rent'
    )

    serializer = PropertyListingSerializer(
        properties,
        many=True
    )

    return Response(serializer.data)



# @api_view(["GET"])
# @permission_classes([AllowAny])
# def click_property_detail(request, id):

#     try:
#         property = PropertyListing.objects.get(id=id)

#         data = {
#             "id": property.id,
#             "title": property.title,
#             "price": property.price,
#             "address": property.address,
#             "beds": property.beds,
#             "baths": property.baths,
#             "sqft": property.sqft,
#             "description": property.description,
#             "property_type": property.property_type,
#             "listing_type": property.listing_type,
#             "status": property.status,
#             "image": property.image.url if property.image else None,
#             "furnishing": property.furnishing,
#             "parking": property.parking,
#             "ownership": property.ownership,
#             "year_built": property.year_built,
#             "nearby_places": property.nearby_places,
#             "amenities": [
#                 {
#                     "id": amenity.id,
#                     "name": amenity.name
#                 }
#                 for amenity in property.amenities.all()
#             ],
#         }

#         return JsonResponse(data)

#     except PropertyListing.DoesNotExist:
#         return JsonResponse(
#             {"error": "Property not found"},
#             status=404
#         )
 
 
 
@api_view(["GET"])
@permission_classes([AllowAny])
def click_property_detail(request, id):

    property_obj = PropertyListing.objects.get(id=id)

    serializer = PropertyDetailSerializer(property_obj)

    return Response(serializer.data)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_property(request):

    serializer = PropertyListingSerializer(data=request.data)

    if serializer.is_valid():

        property_obj = serializer.save(user=request.user)

        # Amenities save cheyyuka
        amenities = request.data.getlist("amenities")

        for amenity_name in amenities:
            amenity, created = Amenity.objects.get_or_create(
                name=amenity_name
            )
            property_obj.amenities.add(amenity)

        return Response(serializer.data)

    return Response(serializer.errors, status=400)
    
@api_view(['GET'])
def property_search(request):

    keyword = request.GET.get('keyword', '')
    status = request.GET.get('status', '')

    # FIXED
    property_type = request.GET.get(
        'property_type',
        ''
    )

    properties = PropertyListing.objects.all()

    # KEYWORD FILTER
    if keyword:
        properties = properties.filter(
            title__icontains=keyword
        )

    # STATUS FILTER
    if status:
        properties = properties.filter(
            status__iexact=status
        )

    # TYPE FILTER
    if property_type:
        properties = properties.filter(
            property_type__iexact=property_type
        )

    serializer = PropertyListingSerializer(
        properties,
        many=True
    )

    return Response(serializer.data)

@api_view(['GET'])
def featured_properties(request):

    properties = PropertyListing.objects.filter(
        is_featured=True
    )[:6]

    serializer = PropertyListingSerializer(
        properties,
        many=True
    )

    return Response(serializer.data)
@api_view(['GET'])
def rent_property_search(request):
    # Get parameters and strip whitespace
    property_type = request.GET.get('property_type', '').strip()
    budget = request.GET.get('budget', '').strip()

    # Base query
    properties = PropertyListing.objects.filter(listing_type='rent')

    # Apply property type filter if it's not an empty string
    if property_type:
        properties = properties.filter(property_type__iexact=property_type)

    # Apply budget ranges
    if budget == "50000-100000":
        properties = properties.filter(price__gte=50000, price__lte=100000)
    elif budget == "100000-300000":
        properties = properties.filter(price__gte=100000, price__lte=300000)
    elif budget == "300000-900000":
        properties = properties.filter(price__gte=300000, price__lte=900000)
    elif budget == "1000000":
        properties = properties.filter(price__gte=1000000)

    serializer = PropertyListingSerializer(properties, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def buy_property_search(request):
    # Get parameters and strip whitespace
    property_type = request.GET.get('property_type', '').strip()
    budget = request.GET.get('budget', '').strip()

    # Base query
    properties = PropertyListing.objects.filter(listing_type='buy')

    # Apply property type filter if it's not an empty string
    if property_type:
        properties = properties.filter(property_type__iexact=property_type)

    # Apply budget ranges
    if budget == "50000-100000":
        properties = properties.filter(price__gte=50000, price__lte=100000)
    elif budget == "100000-300000":
        properties = properties.filter(price__gte=100000, price__lte=300000)
    elif budget == "300000-900000":
        properties = properties.filter(price__gte=300000, price__lte=900000)
    elif budget == "1000000":
        properties = properties.filter(price__gte=1000000)

    serializer = PropertyListingSerializer(properties, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def user_dashboard(request):

    total_properties = PropertyListing.objects.count()

    active_properties = PropertyListing.objects.filter(
        status="available"
    ).count()

    sold_properties = PropertyListing.objects.filter(
        status="sold"
    ).count()

    recent_properties = PropertyListing.objects.all().order_by(
        '-id'
    )[:5]

    recent_data = []

    for property in recent_properties:

        recent_data.append({
            "title": property.title,
            "property_type": property.property_type,
            "status": property.status,
            "price": property.price,
        })

    data = {
        "total_properties": total_properties,
        "active_properties": active_properties,
        "sold_properties": sold_properties,
        "enquiries": 18,
        "recent_properties": recent_data,
    }

    return Response(data)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        property_count = PropertyListing.objects.filter(user=user).count()

        profile, created = UserProfile.objects.get_or_create(user=user)

        image_url = ""
        if profile.profile_image:
            image_url = request.build_absolute_uri(profile.profile_image.url)

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "property_count": property_count,
            "profile_image": image_url,
            "phone": profile.phone
        })
        
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_property(request, pk):
    try:
        property_obj = PropertyListing.objects.get(
            id=pk,
            user=request.user
        )

        property_obj.delete()

        return Response({
            "message": "Deleted successfully"
        })

    except PropertyListing.DoesNotExist:
        return Response(
            {"error": "Property not found"},
            status=404
        )
        

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_property(request, pk):

    try:
        property_obj = PropertyListing.objects.get(
            id=pk,
            user=request.user
        )

        serializer = PropertyListingSerializer(
            property_obj,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    except PropertyListing.DoesNotExist:
        return Response(
            {"error": "Property not found"},
            status=404
        )
        
        
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def property_detail(request, pk):
    try:
        property_obj = PropertyListing.objects.get(
            id=pk,
            user=request.user
        )

        serializer = PropertyListingSerializer(property_obj)

        return Response(serializer.data)

    except PropertyListing.DoesNotExist:
        return Response(
            {"error": "Property not found"},
            status=404
        )
        
        
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        # 1. check old password
        if not user.check_password(old_password):
            return Response(
                {"error": "Old password is incorrect"},
                status=400
            )

        # 2. set new password properly
        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Password updated successfully"}
        )
        
        
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):

    user = request.user
    profile, created = UserProfile.objects.get_or_create(
        user=user
    )
    user.username = request.data.get(
        "username",
        user.username
    )

    user.first_name = request.data.get(
        "first_name",
        user.first_name
    )

    user.email = request.data.get(
        "email",
        user.email
    )

    profile.phone = request.data.get(
        "phone",
        profile.phone
    )

    if "profile_image" in request.FILES:
        profile.profile_image = request.FILES[
            "profile_image"
        ]

    user.save()
    profile.save()
    return Response({
        "message": "Profile updated"
    })


@api_view(["POST"])
def schedule_visit(request):

    serializer = VisitRequestSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_property_visits(request):

    visits = VisitRequest.objects.filter(
        property__user=request.user
    ).order_by("-created_at")
    

    serializer = VisitRequestSerializer(
        visits,
        many=True
    )
    
    total_visits = visits.count()

    return Response({
    "total_visits": total_visits,
    "visits": VisitRequestSerializer(
        visits,
        many=True
    ).data
})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_visit_status(
    request,
    visit_id
):

    visit = VisitRequest.objects.get(
        id=visit_id
    )

    status = request.data.get(
        "status"
    )

    visit.status = status
    visit.save()

    return Response({
        "message":
        "Status updated"
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_contact_leads(request):

    leads = ContactLead.objects.filter(
        property__user=request.user
    ).order_by("-created_at")

    serializer = ContactLeadSerializer(
        leads,
        many=True
    )

    return Response(serializer.data)

    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def visit_requests(request):

    visits = VisitRequest.objects.all().order_by("-created_at")

    serializer = VisitRequestSerializer(
        visits,
        many=True
    )

    return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from my_app.models import PropertyOffer
from .serializers import (
    PropertyOfferSerializer
)

@api_view(["POST"])
def submit_offer(request):

    serializer = (
        PropertyOfferSerializer(
            data=request.data
        )
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
    
    
    
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_for_rent(request, property_id):

    property_obj = get_object_or_404(PropertyListing, id=property_id)

    already_applied = RentalApplication.objects.filter(
        property=property_obj,
        tenant=request.user
    ).exists()

    if already_applied:
        return Response({"message": "Already applied"}, status=400)

    RentalApplication.objects.create(
        property=property_obj,
        tenant=request.user,
        full_name=request.data.get("full_name"),
        email=request.data.get("email"),
        phone=request.data.get("phone"),
        occupation=request.data.get("occupation"),
        monthly_income=request.data.get("monthly_income"),
        occupants=request.data.get("occupants"),
        move_in_date=request.data.get("move_in_date"),
        message=request.data.get("message"),
    )

    return Response({"message": "Application submitted"})



@api_view(["GET"])
def property_details(request, id):
    property = PropertyListing.objects.get(id=id)

    serializer = PropertyDetailSerializer(property)
    
    return Response(serializer.data) 


@api_view(["POST"])
def create_contact_lead(request):

    serializer = ContactLeadSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )
    
    
