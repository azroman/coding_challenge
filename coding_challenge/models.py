from django.db import models


class PoolObject(models.Model):
    number = models.IntegerField(unique=True)
    is_free = models.BooleanField(default=True)

    class Meta:
        ordering = ['id']
