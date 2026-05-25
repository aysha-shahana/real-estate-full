from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from my_app.models import PropertyListing
from .serializers import PropertyListingSerializer


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
