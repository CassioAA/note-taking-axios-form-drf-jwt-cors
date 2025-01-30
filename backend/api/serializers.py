from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = { 'password': {'write_only': True}, }

    # overridden...
    def create(self, validated_data):
        # ...for password hashing
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = { 'author': {'read_only': True}, }