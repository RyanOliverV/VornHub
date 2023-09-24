import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.teams import TeamSerializer, TeamDetailSerializer, SquadListSerializer

class TeamsList(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/teams/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL"
        response = requests.get(url)
        data = response.json()
        teams = data["data"]
        serializer = TeamSerializer(teams, many=True)

        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request, id):
        url = f"https://api.sportmonks.com/v3/football/teams/{id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=venue;country;coaches.coach;statistics.details.type;latest"
        response = requests.get(url)
        data = response.json()
        team = data["data"]
        
        # Filter statistics for the desired season_id (21207)
        season_id_to_filter = 21646
        filtered_statistics = [statistic for statistic in team["statistics"] if statistic["season_id"] == season_id_to_filter]

        # Update the team data with the filtered statistics
        team["statistics"] = filtered_statistics
        
        serializer = TeamDetailSerializer(team)

        return Response(serializer.data)

class SquadList(APIView):
    def get(self, request, id):
        url = f"https://api.sportmonks.com/v3/football/squads/seasons/21646/teams/{id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;details.type"
        response = requests.get(url)
        data = response.json()
        
        squad = data["data"]
        
        serializer = SquadListSerializer(squad, many=True)
        
        return Response(serializer.data)