from django.shortcuts import render
from rest_framework import generics, status

import requests
# from django.http import JsonResponse
# from .serializers import TeamSerializer


# def TeamsList(request):
#     url = "https://api-football-v1.p.rapidapi.com/v3/teams"
#     querystring = {"league": "39",
#                    "season": "2022"}
#     headers = {
#         "X-RapidAPI-Key": "43943fffb8msh65487abdc268eebp1106ddjsne8c9ec7343ad",
#         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
#     }

#     response = requests.get(url, headers=headers, params=querystring)
#     data = response.json()
#     teams = data["response"]

#     serializer = TeamSerializer(teams, many=True)  # Serialize multiple teams

#     return JsonResponse(teams, safe=False)

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeamSerializer, TeamDetailSerializer, LeagueSerializer, AllTeamsDetailSerializer

class LeagueList(APIView):
    def get(self, request):
        url = "https://api.football-data-api.com/league-list?key=8cbdf37c3a0b6572ee9e5843ef3277932c2818d845bb61080e60cddcbadabeba"

        response = requests.get(url)
        data = response.json()
        leagues = data["data"]
        
        country = "England"  # Specify the desired country
        filtered_country = [c for c in leagues if c["country"] == country]
        
        return Response(leagues)
        # if filtered_country:
        #     serializer = LeagueSerializer(filtered_country, many=True)
        #     return Response(serializer.data)
        # else:
        #     return Response({"error": f"No data available for country {country}"}, status=status.HTTP_404_NOT_FOUND)
        
class TeamsList(APIView):
    def get(self, request):
        url = "https://api.football-data-api.com/league-teams?key=8cbdf37c3a0b6572ee9e5843ef3277932c2818d845bb61080e60cddcbadabeba&season_id=7704"

        response = requests.get(url)
        data = response.json()
        teams = data["data"]

        serializer = TeamSerializer(teams, many=True)

        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request, id):
        url = f"https://api.football-data-api.com/team?key=8cbdf37c3a0b6572ee9e5843ef3277932c2818d845bb61080e60cddcbadabeba&team_id={id}"

        response = requests.get(url)
        data = response.json()
        team = data["data"]
        
        season = "2022/2023"  # Specify the desired season
        
        filtered_team = [t for t in team if t["season"] == season]
        
        if filtered_team:
            serializer = TeamDetailSerializer(filtered_team[0])
            return Response(serializer.data)
        else:
            return Response({"error": f"No data available for season {season}"}, status=status.HTTP_404_NOT_FOUND)
        
class AllTeamsDetail(APIView):
    def get(self, request):
        url = "https://api.football-data-api.com/league-teams?key=8cbdf37c3a0b6572ee9e5843ef3277932c2818d845bb61080e60cddcbadabeba&season_id=2012&include=stats"

        response = requests.get(url)
        data = response.json()
        team = data["data"]
        
        selected_team = "Chelsea FC"  # Specify the desired season
        
        filtered_team = [t for t in team if t["name"] == selected_team]
        
        if filtered_team:
            serializer = AllTeamsDetailSerializer(filtered_team[0])
            return Response(serializer.data)
        else:
            return Response({"error": f"No data available for season {selected_team}"}, status=status.HTTP_404_NOT_FOUND)