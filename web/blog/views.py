from rest_framework import generics
from blog.models import BlogPost
from blog.serializers import PostSerializer, BlogPostSerializer
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsActiveAndVIP

# class MyModelViewSet(viewsets.ModelViewSet):
#     queryset = MyModel.objects.all()
#     serializer_class = MyModelSerializer
#     permission_classes = [IsAuthenticated, IsActiveAndVIP]

class PostView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        permission = IsActiveAndVIP()
        if(not permission.has_permission(request, PostView)):
            print("not vip")
            instance = self.get_object()
            if instance.is_free == False:
                response = BlogPostSerializer(instance)

        return Response(response.data)            


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.all().order_by('published_at')
    serializer_class = BlogPostSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title']

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        if (response.data):
            for item in response.data["results"]:
                item.pop('content', None)
        return Response(response.data)