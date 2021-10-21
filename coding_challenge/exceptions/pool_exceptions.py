class PoolObjectIsBusy(Exception):

    def __str__(self):
        return 'Pool object is busy'


class PoolObjectIsNotExists(Exception):

    def __str__(self):
        return 'Pool object is not exists'
