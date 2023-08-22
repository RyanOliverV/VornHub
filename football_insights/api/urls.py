from django.urls import path
from .views.index import SeasonList
from .views.teams import TeamsList, TeamDetail, SquadList
from .views.players import PlayerList, PlayerDetail, MostGoals, MostAssists, MostPens, MostPensMissed, MostRedCards, MostYellowCards, GoalkeeperList, CentreBackList, FullBackList, DefensiveMidfielderList, AttackingMidfielderList, CentralMidfielderList, CentreForwardList, WingerList
from .views.standings import LeagueTable, LiveLeagueTable
from .views.schedules import FixtureList, FixtureInfo, FixtureDetail, LatestFixtures, LiveScoresList, LiveScoresDetail, TeamsComparison
from .views.prediction import PredictionAPI

urlpatterns = [
    path('teams/', TeamsList.as_view(), name='teams-api'),
    path('teams/<int:id>/', TeamDetail.as_view(), name='team-detail-api'),
    path('squads/<int:id>/', SquadList.as_view(), name='squad-detail-api'),
    path('players/', PlayerList.as_view(), name='players-api'),
    path('players/<int:id>/', PlayerDetail.as_view(),
         name='player-detail-api'),
    path('most-goals/', MostGoals.as_view()),
    path('most-assists/', MostAssists.as_view()),
     path('most-pens/', MostPens.as_view()),
     path('most-pens-missed/', MostPensMissed.as_view()),
     path('most-red-cards/', MostRedCards.as_view()),
     path('most-yellow-cards/', MostYellowCards.as_view()),
    path('goalkeepers/', GoalkeeperList.as_view(), name='goalkeepers-api'),
    path('centrebacks/', CentreBackList.as_view(), name='defenders-api'),
    path('fullbacks/', FullBackList.as_view(), name='midfielders-api'),
    path('defensivemidfielders/',
         DefensiveMidfielderList.as_view(), name='forwards-api'),
    path('attackingmidfielders/',
         AttackingMidfielderList.as_view(), name='forwards-api'),
    path('centralmidfielders/',
         CentralMidfielderList.as_view(), name='forwards-api'),
    path('centreforwards/', CentreForwardList.as_view(), name='forwards-api'),
    path('wingers/', WingerList.as_view(), name='forwards-api'),
    path('seasons/', SeasonList.as_view(), name='seasons-api'),
    path('standings/', LeagueTable.as_view(), name='standings-api'),
    path('live-standings/', LiveLeagueTable.as_view(),
         name='live-standings-api'),
    path('standings/<int:season_id>/', LeagueTable.as_view(),
         name='standings-api-with-season'),
    path('fixtures/', FixtureList.as_view(), name='fixtures-api'),
    path('fixtures/<int:id>/', FixtureInfo.as_view()),
    path('fixture/<int:id>/', FixtureDetail.as_view()),
    path('fixtures/<int:team1_id>/<int:team2_id>/',
         TeamsComparison.as_view()),
    path('latest-fixtures/<int:team1_id>/<int:team2_id>/',
         LatestFixtures.as_view()),
    path('livescores-list/', LiveScoresList.as_view(), name='livescores-list-api'),
    path('livescores-detail/', LiveScoresDetail.as_view(), name='livescores-detail-api'),
    path('predictions/', PredictionAPI.as_view(), name='predictions'),

]
