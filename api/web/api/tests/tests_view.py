# Add these imports at the top
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from unittest import TestCase

# Define this after the ModelTestCase
class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.carlist_data = {'number': '1111','rfid': 1}
        self.response = self.client.post(
            reverse('create'),
            self.carlist_data,
            format="json")

    def test_api_can_create_a_carlist(self):
        """Test the api has bucket creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_clear_a_carlist_for_robot_setup(self):

        # call api
        self.response = self.client.get(reverse('clear_all'),format="json")
        self.assertEqual(self.response.status_code, 200)

    def test_api_can_not_create_a_carlist_fail(self):
        # create carlist 1111 , rfid = 1
        self.response = self.client.post(
            reverse('create'),
            self.carlist_data,
            format="json")

        # create dulication rfid and status = 1
        # create carlist 1112 , rfid = 1
        self.response = self.client.post(
            reverse('create'),
            self.carlist_data,
            format="json")
        self.assertEqual(self.response.status_code, 400)