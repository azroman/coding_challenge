from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from coding_challenge.exceptions.pool_exceptions import PoolObjectIsBusy, PoolObjectIsNotExists
from coding_challenge.managers.managers import PoolManager
from coding_challenge.serializers.pool_serializers import PollSerializer


class PoolList(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = [JSONRenderer]

    # get all data from pool
    def get(self, request, format=None):
        serializer = PollSerializer(PoolManager.get_all_objects(), many=True)
        return Response(serializer.data)

    # create a new item im the pool
    def post(self, request, format=None):
        print(request.data)
        serializer = PollSerializer(data=request.data)
        if serializer.is_valid():
            PoolManager.create_object(serializer.data['number'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class PoolDetail(APIView):
    def get(self, request, number, format=None):
        try:
            serializer = PollSerializer(PoolManager.get_object(number))
            return Response(serializer.data)
        except (PoolObjectIsBusy, PoolObjectIsNotExists) as e:
            return Response(str(e), status=status.HTTP_409_CONFLICT)

    # make a free object
    def put(self, request, number, format=None):
        try:
            serializer = PollSerializer(PoolManager.free_object(number))
            return Response(serializer.data)
        except (PoolObjectIsBusy, PoolObjectIsNotExists) as e:
            return Response(str(e), status=status.HTTP_409_CONFLICT)
