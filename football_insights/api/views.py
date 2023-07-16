import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TeamSerializer, TeamDetailSerializer, LeagueTableSerializer, FixturesSerializer, PlayerSerializer
import datetime

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
        url = f"https://api.sportmonks.com/v3/football/standings/seasons/{season_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=participant;details.type"
        response = requests.get(url)
        data = response.json()
        standings = data["data"]
        serializer = LeagueTableSerializer(standings, many=True)

        return Response(serializer.data)


class LiveLeagueTable(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/standings/live/leagues/648?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=participant;details.type"
        response = requests.get(url)
        data = response.json()
        standings = data["data"]
        serializer = LeagueTableSerializer(standings, many=True)

        return Response(serializer.data)


class TeamsList(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/teams/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu"
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


class PlayerList(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/teams/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu"
        response = requests.get(url)
        data = response.json()
        teams = data["data"]

        all_players = []

        for team in teams:
            team_id = team["id"]
            squad_url = f"https://api.sportmonks.com/v3/football/squads/seasons/21207/teams/{team_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&includes=player;team"
            squad_response = requests.get(squad_url)
            squad_data = squad_response.json()
            squad = squad_data["data"]

            # Append the players from the team's squad to the aggregated list
            all_players.extend(squad)

        serializer = PlayerSerializer(all_players, many=True)

        return Response(serializer.data)

# Pagination for the PlayerList
    # pagination_class = CustomPagination

    # def get(self, request):
    #     url = "https://api.sportmonks.com/v3/football/teams/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu"
    #     response = requests.get(url)
    #     data = response.json()
    #     teams = data["data"]

    #     all_players = []

    #     for team in teams:
    #         team_id = team["id"]
    #         squad_url = f"https://api.sportmonks.com/v3/football/squads/seasons/21207/teams/{team_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&includes=player;team"
    #         squad_response = requests.get(squad_url)
    #         squad_data = squad_response.json()
    #         squad = squad_data["data"]

    #         # Append the players from the team's squad to the aggregated list
    #         all_players.extend(squad)

    #     # Sort the all_players list alphabetically by player name
    #     all_players.sort(key=lambda player: player["player"]["name"])

    #     # Apply pagination to the sorted all_players list
    #     paginator = self.pagination_class()
    #     page = paginator.paginate_queryset(all_players, request)
    #     serializer = PlayerSerializer(page, many=True)


class FixtureList(APIView):
    def get(self, request):
        # Define the API endpoint URL to fetch detailed information about fixtures
        url = "https://api.sportmonks.com/v3/football/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=fixtures.scores;fixtures.venue;fixtures.participants"
        # Send a GET request to the API endpoint
        response = requests.get(url)
        data = response.json()
        fixtures = data["data"]["fixtures"]

        # Sort fixtures by starting_at in ascending order (earliest first)
        fixtures = sorted(fixtures, key=lambda x: x.get("starting_at"))

        serializer = FixturesSerializer(fixtures, many=True)

        return Response(serializer.data)


class LiveScores(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/livescores?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&filters=fixtureLeagues:636&include=league;scores;participants;venue"
        response = requests.get(url)
        data = response.json()

        try:
            livescores = data["data"]
            serializer = FixturesSerializer(livescores, many=True)
            return Response(serializer.data)
        except KeyError:
            # Fetch upcoming fixtures after the current date
            today = datetime.date.today().strftime("%Y-%m-%d")
            fixtures_url = "https://api.sportmonks.com/v3/football/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=fixtures.scores;fixtures.venue;fixtures.participants"
            fixtures_response = requests.get(fixtures_url)
            fixtures_data = fixtures_response.json()
            fixtures = fixtures_data["data"]["fixtures"]

            # Filter fixtures for the current day
            current_day_fixtures = [
                fixture for fixture in fixtures
                if fixture.get("starting_at") and fixture["starting_at"].startswith(today)
            ]

            if current_day_fixtures:
                serializer = FixturesSerializer(
                    current_day_fixtures, many=True)
                return Response(serializer.data)
            else:
                # Fetch upcoming fixtures after the current date
                upcoming_fixtures = [
                    fixture for fixture in fixtures
                    if fixture.get("starting_at") and fixture["starting_at"] > today
                ]

                # Sort upcoming fixtures by date
                sorted_upcoming_fixtures = sorted(
                    upcoming_fixtures, key=lambda f: f["starting_at"])

                if sorted_upcoming_fixtures:
                    # Retrieve only the next available fixture
                    next_fixtures = [sorted_upcoming_fixtures[0]]
                    serializer = FixturesSerializer(next_fixtures, many=True)
                    return Response(serializer.data)
                else:
                    return Response([])
