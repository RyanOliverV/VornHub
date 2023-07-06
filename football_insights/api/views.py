import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeamSerializer, TeamDetailSerializer, LeagueTableSerializer
from datetime import date

# SoccerMonks API Token: LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu


class SeasonList(APIView):
    def get(self, request):
        # Retrieve the seasons for a particular league
        url = "https://api.sportmonks.com/v3/football/seasons/teams/303/?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&page=2"
        # Send a GET request to the specified URL
        response = requests.get(url)
        # Parse the response as JSON
        data = response.json()
        # Extract the season data from the JSON response
        seasons = data["data"]
        # Return the filtered seasons as a response
        return Response(seasons)


class LeagueTable(APIView):
    def get(self, request, season_id):
        # Construct the URL to fetch the league table for a specific season
        url = f"https://api.sportmonks.com/v3/football/standings/seasons/{season_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=participant;details.type"
        # Send a GET request to the specified URL
        response = requests.get(url)
        # Parse the response as JSON
        data = response.json()
        # Extract the standings data from the JSON response
        standings = data["data"]
        # Serialize the standings data using the LeagueTableSerializer
        serializer = LeagueTableSerializer(standings, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)


class LiveLeagueTable(APIView):
    def get(self, request):
        # Construct the URL to fetch the live league table for the Serie A
        url = "https://api.sportmonks.com/v3/football/standings/live/leagues/648?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=participant;details.type"
        # Send a GET request to the specified URL
        response = requests.get(url)
        # Parse the response as JSON
        data = response.json()
        # Extract the standings data from the JSON response
        standings = data["data"]
        # Serialize the standings data using the LeagueTableSerializer
        serializer = LeagueTableSerializer(standings, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)


class TeamsList(APIView):
    def get(self, request):
        # Define the API endpoint URL to fetch teams data for a specific season
        url = "https://api.sportmonks.com/v3/football/teams/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu"
        # Send a GET request to the API endpoint
        response = requests.get(url)
        # Extract the JSON data from the response
        data = response.json()
        # Access the "data" key in the JSON response, which contains the teams information
        teams = data["data"]
        # Create a serializer instance to serialize the teams data
        serializer = TeamSerializer(teams, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)


class TeamDetail(APIView):
    def get(self, request, id):
        # Define the API endpoint URL to fetch detailed information about a specific team
        url = f"https://api.sportmonks.com/v3/football/teams/{id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=venue;country"
        # Send a GET request to the API endpoint
        response = requests.get(url)
        # Extract the JSON data from the response
        data = response.json()
        # Access the "data" key in the JSON response, which contains the team information
        team = data["data"]
        # Create a serializer instance to serialize the team data
        serializer = TeamDetailSerializer(team)
        # Return the serialized data as a response
        return Response(serializer.data)
