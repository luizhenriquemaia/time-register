import json
import unittest
from datetime import date, time

from django.contrib.auth.models import User
from django.test import Client, TestCase
from rest_framework.test import APIClient, APITestCase

from main.models import Employee, Report, Schedule, TimesReport, TypeContract


def add_user(username, email):
    user_test = User.objects.create_user(
        username=username,
        email=email,
        password='1234567890'
    )
    return user_test


class RegisterUserTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user(
            "user_test_register", "user_test_register@gmail.com")

    def test_register_user(self):
        json_data = {
            'username': 'user_test0',
            'email': 'user0@gmail.com.br',
            'password': '1234567890',
        }
        response = self.client.post('/api/auth/register/', json_data, headers = {"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response_body_data['message'], "registered user")
        self.assertTrue(response_body_data['data'])
    
    def test_register_with_existent_user(self):
        json_data = {
            'username': self.user_test.username,
            'email': 'user@gmail.com.br',
            'password': '1234567890',
        }
        response = self.client.post(
            '/api/auth/register/', json_data, headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], "this username is already taken")
    
    def test_register_with_existent_email(self):
        json_data = {
            'username': 'user_test2',
            'email': self.user_test.email,
            'password': '1234567890',
        }
        response = self.client.post(
            '/api/auth/register/', json_data, headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], "this email is already registred")


class LoginUserTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_test = add_user(
            "user_test_login", "user_test_login@gmail.com")

    def test_login_user(self):
        json_data = {
            'username': self.user_test.username,
            'password': '1234567890'
        }
        response = self.client.post(
            '/api/auth/token/', json_data, headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.token = response_body_data['access']
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response_body_data['access'])
    
    def test_verify_token(self):
        json_data = {
            'username': self.user_test.username,
            'password': '1234567890'
        }
        response = self.client.post(
            '/api/auth/token/', json_data, headers={"Content-Type": "application/json"}
        )
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.token = response_body_data['access']
        response = self.client.post(
            '/api/auth/token/verify/', {'token': self.token}, headers={"Content-Type": "application/json"}
        )
        self.assertEqual(response.status_code, 200)

