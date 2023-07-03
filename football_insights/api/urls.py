# from django.urls import path
# from . import views

# urlpatterns = [
#     path('teams/', views.TeamsList, name='teams-api'),
# ]

from django.urls import path
from . import views

urlpatterns = [
    path('teams/', views.TeamsList.as_view(), name='teams-api'),
    path('teamstats/', views.AllTeamsDetail.as_view(), name='team-detail-api'),
    path('teamstats/<int:id>/', views.TeamDetail.as_view(), name='team-detail-api'),
    path('leagues/', views.LeagueList.as_view(), name='leagues-api'),
]