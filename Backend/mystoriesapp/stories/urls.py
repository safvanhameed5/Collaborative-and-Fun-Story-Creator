from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StoryViewSet, login_user, register_user, add_contribution

router = DefaultRouter()
router.register(r'stories', StoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_user, name='login'),
    path('register/', register_user, name='register'),
    path('stories/<int:story_id>/contribute/', add_contribution, name='add_contribution'),
]
