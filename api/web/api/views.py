from rest_framework import generics
from api.serializers import CarlistSerializer
from api.models import CarList


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = CarList.objects.all()
    serializer_class = CarlistSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new carlist."""
        serializer.save()