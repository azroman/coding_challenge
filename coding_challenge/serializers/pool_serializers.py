from rest_framework import serializers

from coding_challenge.models import PoolObject


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoolObject
        fields = ['id', 'number', 'is_free']
