from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        User, # each note belongs to one user/author
        on_delete=models.CASCADE, # user/author deleted, all notes deleted
        related_name='notes', # instead of note_set default
    )

    def __str__(self):
        return self.title