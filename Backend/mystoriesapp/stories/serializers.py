from .models import Story, Contribution
from rest_framework import serializers

class ContributionSerializer(serializers.ModelSerializer):

    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Contribution
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    # Include contributions in the serialized response
    contributions = ContributionSerializer(many=True, read_only=True)
    author_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Story
        fields = ['id', 'title', 'content', 'created_by', 'completed', 'created_on', 'contributions', 'author_username']