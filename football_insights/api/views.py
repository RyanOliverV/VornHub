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
from .serializers import TeamSerializer, TeamDetailSerializer


class TeamsList(APIView):
    def get(self, request):
        url = "https://api-football-v1.p.rapidapi.com/v3/teams"
        querystring = {
            "league": "39",
            "season": "2022"
        }
        headers = {
            "X-RapidAPI-Key": "43943fffb8msh65487abdc268eebp1106ddjsne8c9ec7343ad",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        data = response.json()
        teams = data["response"]

        serializer = TeamSerializer(teams, many=True)

        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request, id):
        url = "https://api-football-v1.p.rapidapi.com/v3/teams/statistics"

        querystring = {
            "league": "39",
            "season": "2022",
            "team": id
        }

        headers = {
            "X-RapidAPI-Key": "43943fffb8msh65487abdc268eebp1106ddjsne8c9ec7343ad",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        data = response.json()
        team = data["response"]
        
        serializer = TeamDetailSerializer(team)
        
        return Response(serializer.data)