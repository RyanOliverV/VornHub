from django.shortcuts import render
from rest_framework import generics, status

import requests

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeamSerializer, TeamDetailSerializer, AllTeamsDetailSerializer

#SoccerMonks API Token: LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu
        
class TeamsList(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/teams/seasons/21646?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu"

        response = requests.get(url)
        data = response.json()
        teams = data["data"]

        serializer = TeamSerializer(teams, many=True)

        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request, id):
        url = f"https://api.sportmonks.com/v3/football/teams/{id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=venue;country"

        response = requests.get(url)
        data = response.json()
        team = data["data"]
        
        serializer = TeamDetailSerializer(team)
        
        return Response(serializer.data)
        
        # season = "2022/2023"  # Specify the desired season
        
        # filtered_team = [t for t in team if t["season"] == season]
        
        # if filtered_team:
        #     serializer = TeamDetailSerializer(filtered_team[0])
        #     return Response(serializer.data)
        # else:
        #     return Response({"error": f"No data available for season {season}"}, status=status.HTTP_404_NOT_FOUND)
        
# class AllTeamsDetail(APIView):
#     def get(self, request):
#         url = "https://api.football-data-api.com/league-teams?key=example&season_id=2012&include=stats"

#         response = requests.get(url)
#         data = response.json()
#         team = data["data"]
        
#         selected_team = "Chelsea FC"  # Specify the desired season
        
#         filtered_team = [t for t in team if t["name"] == selected_team]
        
#         if filtered_team:
#             serializer = AllTeamsDetailSerializer(filtered_team[0])
#             return Response(serializer.data)
#         else:
#             return Response({"error": f"No data available for season {selected_team}"}, status=status.HTTP_404_NOT_FOUND)