from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('livescores', index),
    path('fixtures', index),
    path('predictions', index),
    path('leaguetable', index),
    path('teams', index),
    path('teams/<int:id>', index),
    path('players', index),
]
