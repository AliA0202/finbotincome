from rest_framework import generics
from blog.models import BlogPost, SavedPosts, BlogComments
from blog.serializers import PostSerializer, BlogPostSerializer, SavedPostsSerializer, CommonPostSerializer, CreateDeleteSavedPostsSerializer
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsActiveAndVIP
from rest_framework.views import APIView


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
            if instance.is_vip == True:
                response = CommonPostSerializer(instance)
                print(response)

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
    
class SavedPostsLitView(generics.ListAPIView):
    serializer_class = SavedPostsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return SavedPosts.objects.filter(user=user)
    
class CreateSavedPost(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request.data['user'] = request.user.id
        serializer = CreateDeleteSavedPostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
        

class DeleteSavedPost(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            saved_post = SavedPosts.objects.get(user=request.user, post=request.data.get('post'))
            saved_post.delete()
            return Response(status=204)
        except SavedPosts.DoesNotExist:
            return Response(status=404)