from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from my_app.models import PropertyListing
from .serializers import PropertyListingSerializer

from rest_framework.permissions import IsAuthenticated



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


@api_view(['POST'])
def add_property(request):

    serializer = PropertyListingSerializer(
        data=request.data
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