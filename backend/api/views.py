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