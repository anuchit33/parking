from rest_framework import generics
from api.serializers import CarlistSerializer
from api.models import CarList
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response




class CreateView(generics.ListCreateAPIView):
    
    def get_queryset(self):

        queryset = CarList.objects.all()

        rfid = self.request.GET.get('rfid',None)
        if rfid is not None:
            queryset = queryset.filter(rfid=rfid)
        return queryset
    
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
    
    
    serializer_class = CarlistSerializer

    def get_queryset(self):
        queryset = CarList.objects.all()
        CarList.objects.all().delete()
        return []

class AutoCreateView(APIView):
    
    def get(self, request, size):
        queryset = CarList.objects.all()
        CarList.objects.all().delete()

        for i in range(0,int(size)):
            CarList.objects.create(
                rfid= i+1,
                number= 1000+i
            )
        return Response({})

class GetCountView(APIView):
    
    def get(self,request):
        count = CarList.objects.all().filter(status=1).count()

        return Response({'count': count})