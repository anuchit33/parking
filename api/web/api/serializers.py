from rest_framework import serializers
from .models import CarList


class CarlistSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = CarList
        fields = ('id','rfid', 'number', 'check_in_date', 'check_out_date')
        read_only_fields = ('id','check_in_date', 'check_out_date')