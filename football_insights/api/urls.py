from django.urls import path
from . import views

urlpatterns = [
    path('teams/', views.TeamsList.as_view(), name='teams-api'),
    path('teamstats/<int:id>/', views.TeamDetail.as_view(), name='team-detail-api'),
    path('seasons/', views.SeasonList.as_view(), name='seasons-api'),
    path('standings/', views.LeagueTable.as_view(), name='standings-api'),
    path('live-standings/', views.LiveLeagueTable.as_view(),
         name='live-standings-api'),
    path('standings/<int:season_id>/', views.LeagueTable.as_view(),
         name='standings-api-with-season'),
]
