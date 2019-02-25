from django.test import TestCase
from api.models import CarList


class ModelTestCase(TestCase):
    """This class defines the test suite for the bucketlist model."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.car_number = "1111"
        self.car_rfid = '1'
        self.carlist = CarList(number=self.car_number,rfid=self.car_rfid)

    def test_model_can_create_a_bucketlist(self):
        """Test the bucketlist model can create a bucketlist."""
        old_count = CarList.objects.count()
        self.carlist.save()
        new_count = CarList.objects.count()
        self.assertNotEqual(old_count, new_count)