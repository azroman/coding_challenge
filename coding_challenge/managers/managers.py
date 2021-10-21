from django.db import transaction

from coding_challenge.exceptions.pool_exceptions import PoolObjectIsBusy, PoolObjectIsNotExists
from coding_challenge.models import PoolObject


class PoolManager:
    @staticmethod
    def __get_pool_object__(number):
        poll_objects = PoolObject.objects.filter(number=number)
        if len(poll_objects):
            pool_object = poll_objects[0]  # we sure that we have only one because 'number' is unique field
            return pool_object
        else:
            raise PoolObjectIsNotExists()

    @staticmethod
    def get_all_objects():
        return PoolObject.objects.all()

    @staticmethod
    @transaction.atomic
    def get_object(number):
        pool_object = PoolManager.__get_pool_object__(number)
        if pool_object.is_free:
            pool_object.is_free = False
            pool_object.save()
            return pool_object
        else:
            raise PoolObjectIsBusy()

    @staticmethod
    @transaction.atomic
    def free_object(number):
        pool_object = PoolManager.__get_pool_object__(number)
        if not pool_object.is_free:
            pool_object.is_free = True
            pool_object.save()
        return pool_object
        # otherwise I think we shouldn't do anything because object already is free - no error

    @staticmethod
    @transaction.atomic
    def create_object(number):
        PoolObject.objects.create(number=number).save()
