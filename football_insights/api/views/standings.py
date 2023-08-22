import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.standings import LeagueTableSerializer

class LeagueTable(APIView):
    def get(self, request, season_id):
        url = f"https://api.sportmonks.com/v3/football/standings/seasons/{season_id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=participant;details.type"
        response = requests.get(url)
        data = response.json()
        standings = data["data"]
        serializer = LeagueTableSerializer(standings, many=True)

        return Response(serializer.data)


class LiveLeagueTable(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/standings/live/leagues/8?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=participant;details.type"
        response = requests.get(url)
        data = response.json()
        standings = data["data"]
        serializer = LeagueTableSerializer(standings, many=True)

        return Response(serializer.data)