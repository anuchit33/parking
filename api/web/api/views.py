from rest_framework import generics
from api.serializers import CarlistSerializer
from api.models import CarList
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = CarList.objects.all()
    serializer_class = CarlistSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new carlist."""

        if CarList.objects.filter(status=1).count() > 49:
             raise serializers.ValidationError({'error': 'เต็มแล้ว' })

        queryset = CarList.objects.filter(rfid=serializer.validated_data['rfid'],status=1)
        if queryset.exists():
            raise serializers.ValidationError({'rfid': 'RFID %s ถูกใช้งานแล้ว' % (serializer.validated_data['rfid'])})

        serializer.save()

# for test
class ClearAllView(generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    
    serializer_class = CarlistSerializer

    def get_queryset(self):
        queryset = CarList.objects.all()
        CarList.objects.all().delete()
        return []

class AutoCreateView(APIView):
    """This class defines the create behavior of our rest api."""
    def get(self, request, size):
        queryset = CarList.objects.all()
        CarList.objects.all().delete()

        for i in range(0,int(size)):
            CarList.objects.create(
                rfid= i+1,
                number= 1000+i
            )
        return Response({})