from django.test import TestCase

from coding_challenge.managers.managers import PoolManager


class Connections(TestCase):

    def test_pool(self):
        PoolManager.create_object(5)
        PoolManager.create_object(5)
