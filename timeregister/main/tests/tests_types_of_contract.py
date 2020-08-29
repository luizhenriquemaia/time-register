from django.contrib.auth.models import User
import json
import unittest
from datetime import date, time

from rest_framework.test import APIClient, APITestCase

from main.models import TypeContract


def add_user(username, email):
    user_test = User.objects.create_user(
        username=username,
        email=email,
        password='1234567890'
    )
    return user_test

def login_user(username):
    client = APIClient()
    json_data = {
            'username': username,
            'password': '1234567890'
        }
    response = client.post(
        '/api/auth/token/', json_data, headers={"Content-Type": "application/json"})
    response_body_data = json.loads(response.content.decode("UTF-8"))
    return response_body_data['access']

def add_new_type_contract(user_test):
    type_of_contract_test = TypeContract(
        description="type test",
        hoursSunday=0,
        hoursMonday=9,
        hoursTuesday=9,
        hoursWednesday=9,
        hoursThursday=9,
        hoursFriday=8,
        hoursSaturday=4,
        owner=user_test
    )
    type_of_contract_test.save()
    return type_of_contract_test


class TypeContractTestsWithoutData(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_test = add_user('user_test_type_contract', 'user_test_type_contract@test.com')
        self.token = login_user('user_test_type_contract')
    
    def test_get_all_type_contract_with_no_data(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get('/api/type-contract/', **header)
        self.assertEqual(response.status_code, 204) 


class TypeContractTestsWithData(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_test = add_user('user_test_type_contract', 'user_test_type_contract@test.com')
        self.token = login_user('user_test_type_contract')
        self.type_contract_test = add_new_type_contract(self.user_test)
    
    def test_get_all_type_contract(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get('/api/type-contract/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')
        self.assertEqual(
            response_body_data['data'][0]['description'], 'type test')
    
    def test_add_new_type_contract(self):
        json_data = {
            'description': "type2 test",
            'hoursSunday': "0.00",
            'hoursMonday': "8.00",
            'hoursTuesday': "8.00",
            'hoursWednesday': "8.00",
            'hoursThursday': "8.00",
            'hoursFriday': "8.00",
            'hoursSaturday': "4.00",
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/type-contract/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response_body_data['data']['description'], 'type2 test')
    
    def test_add_new_type_contract_whitout_data(self):
        json_data = {
            'description': "type2 test"
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/type-contract/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'error adding type of contract')
