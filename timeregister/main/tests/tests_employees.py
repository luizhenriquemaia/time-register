from django.contrib.auth.models import User
import json
import unittest
from datetime import date, time

from django.test import Client, TestCase

from main.models import Employee


def add_user(username, email):
    user_test = User.objects.create_user(
        username=username,
        email=email,
        password='1234567890'
    )
    return user_test

def login_user(username):
    client = Client()
    json_data = {
            'username': username,
            'password': '1234567890'
        }
    response = client.post(
        '/api/auth/token/', json_data, headers={"Content-Type": "application/json"})
    response_body_data = json.loads(response.content.decode("UTF-8"))
    return response_body_data['access']

def add_new_employee(user_test):
    employee_test = Employee(
        name="Employee Test",
        function="function test",
        description="employee name, function",
        active=True,
        owner=user_test
    )
    employee_test.save()
    return employee_test



class EmployeeTestsWithoutData(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user('user_test', 'usertest@test.com')
        self.token = login_user('user_test')
    
    def test_get_all_employees_with_no_employees(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get('/api/employee/', **header)
        self.assertEqual(response.status_code, 204) 


class EmployeeTestsWithData(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user('user_test', 'usertest@test.com')
        self.token = login_user('user_test')
        self.employee_test = add_new_employee(self.user_test)
    
    def test_get_all_employees(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get(
            '/api/employee/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')
        self.assertEqual(
            response_body_data['data'][0]['name'], 'Employee Test')
    
    def test_add_new_report(self):
        json_data = {
            'name': "Employee2 Test",
            'function': "function2 test",
            'description': "employee2 name, function2",
            'active': True
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/employee/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response_body_data['data']['name'], 'Employee2 Test')
    
    def test_add_new_report_whitout_data(self):
        json_data = {
            'function': "function2 test",
            'description': "employee2 name, function2",
            'active': True
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/employee/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'not enougth data to add a employee')
    
    def test_delete_employee(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.delete(
            f'/api/employee/{self.employee_test.id}/', **header)
        self.assertEqual(response.status_code, 204)
    
    def test_delete_not_existent_employee(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.delete(
            '/api/employee/999/', **header)
        self.assertEqual(response.status_code, 400)
