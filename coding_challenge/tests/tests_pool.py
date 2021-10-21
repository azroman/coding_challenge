import django
from django.test import TestCase

from coding_challenge.exceptions.pool_exceptions import PoolObjectIsBusy, PoolObjectIsNotExists
from coding_challenge.managers.pool_manager import PoolManager


class PoolObjectsTestCase(TestCase):
    def test_already_exists(self):
        number = 5
        PoolManager.create_object(number)
        with self.assertRaises(django.db.utils.IntegrityError):
            PoolManager.create_object(number)

    def test_is_busy(self):
        number = 3
        PoolManager.create_object(number)
        PoolManager.get_object(number)
        with self.assertRaises(PoolObjectIsBusy):
            PoolManager.get_object(number)

    def test_create_get_object(self):
        number = 4
        PoolManager.create_object(number)
        obj = PoolManager.get_object(number)
        self.assertEqual(obj.number, number)

    def test_doenst_exists(self):
        number = 100500
        with self.assertRaises(PoolObjectIsNotExists):
            PoolManager.get_object(number)

    def test_make_free(self):
        number = 4
        PoolManager.create_object(number)

        obj = PoolManager.get_object(number)
        self.assertEqual(obj.number, number)

        obj = PoolManager.free_object(number)
        self.assertEqual(obj.number, number)

        obj = PoolManager.get_object(number)
        self.assertEqual(obj.number, number)

    def test_all_objects(self):
        PoolManager.create_object(1)
        PoolManager.create_object(10)
        PoolManager.create_object(7)
        PoolManager.create_object(4)

        self.assertEqual(len(PoolManager.get_all_objects()), 4)
        self.assertEqual(PoolManager.get_all_objects()[0].number, 1)
