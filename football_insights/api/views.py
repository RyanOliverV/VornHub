import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TeamSerializer, TeamDetailSerializer, LeagueTableSerializer, FixturesSerializer, PlayerListSerializer, PlayerDetailsSerializer, TeamsComparisonSerializer, LatestFixturesSerializer
import datetime
from rest_framework.pagination import PageNumberPagination

# SoccerMonks API Token: LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu


class SeasonList(APIView):
    def get(self, request):
        # Retrieve the seasons for a particular league
        url = "https://api.sportmonks.com/v3/football/seasons/teams/6/?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&page=2"
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
        url = f"https://api.sportmonks.com/v3/football/teams/{id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=venue;country;statistics.details.type"
        response = requests.get(url)
        data = response.json()
        team = data["data"]
        
        # Filter statistics for the desired season_id (21207)
        season_id_to_filter = 21207
        filtered_statistics = [statistic for statistic in team["statistics"] if statistic["season_id"] == season_id_to_filter]

        # Update the team data with the filtered statistics
        team["statistics"] = filtered_statistics
        
        serializer = TeamDetailSerializer(team)

        return Response(serializer.data)


def get_all_players():
    url = "https://api.sportmonks.com/v3/football/teams/seasons/21207?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu"
    response = requests.get(url)
    data = response.json()
    teams = data["data"]

    all_players = []

    for team in teams:
        team_id = team["id"]
        squad_url = f"https://api.sportmonks.com/v3/football/squads/seasons/21207/teams/{team_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=player;details.type"
        squad_response = requests.get(squad_url)
        squad_data = squad_response.json()
        squad = squad_data["data"]

        # Append the players from the team's squad to the aggregated list
        all_players.extend(squad)
    return all_players


def get_players_by_position(all_players, position_id):
    players_by_position = [
        player for player in all_players if player["player"]["detailed_position_id"] in position_id]
    return players_by_position


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100


class PlayerList(APIView):
    pagination_class = CustomPagination

    def get(self, request):
        all_players = get_all_players()
        paginator = self.pagination_class()
        paginated_players = paginator.paginate_queryset(all_players, request)

        serializer = PlayerListSerializer(paginated_players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return paginator.get_paginated_response(serialized_players)


class GoalkeeperList(APIView):
    def get(self, request):
        position_id = [24]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class CentreBackList(APIView):
    def get(self, request):
        position_id = [148]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class FullBackList(APIView):
    def get(self, request):
        position_id = [154, 155]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class DefensiveMidfielderList(APIView):
    def get(self, request):
        position_id = [149]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class CentralMidfielderList(APIView):
    def get(self, request):
        position_id = [153]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class AttackingMidfielderList(APIView):
    def get(self, request):
        position_id = [150]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class WingerList(APIView):
    def get(self, request):
        position_id = [152, 156]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


class CentreForwardList(APIView):
    def get(self, request):
        position_id = [151]
        all_players = get_all_players()
        players = get_players_by_position(all_players, position_id)
        serializer = PlayerListSerializer(players, many=True)
        serialized_players = [
            player for player in serializer.data if player is not None]
        return Response(serialized_players)


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


class FixtureDetail(APIView):
    def get(self, request, id):
        url = f"https://api.sportmonks.com/v3/football/fixtures/{id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=participants"
        response = requests.get(url)
        data = response.json()
        fixture = data["data"]

        # serializer = FixturesSerializer(fixtures, many=True)

        return Response(fixture)


class TeamsComparison(APIView):
    def get(self, request, team1_id, team2_id):
        url = f"https://api.sportmonks.com/v3/football/fixtures/head-to-head/{team1_id}/{team2_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=scores;participants;statistics.type"
        response = requests.get(url)
        data = response.json()
        fixtures = data["data"]

        filtered_fixtures = [fixture for fixture in fixtures if isinstance(
            fixture.get("statistics"), list) and len(fixture["statistics"]) > 0]

        # Pass team1_id and team2_id as additional arguments to the serializer
        serializer = TeamsComparisonSerializer(
            fixtures,
            many=True,
            context={"team1_id": team1_id, "team2_id": team2_id},
        )

        # Get the serialized data
        serialized_data = serializer.data

        team1_value = serialized_data[0]["team1"]
        team2_value = serialized_data[0]["team2"]
        team1_country = serialized_data[0]["team1_country"]
        team2_country = serialized_data[0]["team2_country"]
        team1_logo = serialized_data[0]["team1_logo"]
        team2_logo = serialized_data[0]["team2_logo"]
        # Loop through the serialized data to calculate total goals for each team
        team1_goals_total = 0
        team2_goals_total = 0
        team1_cleansheets = 0
        team2_cleansheets = 0

        # Initialize win, draw, and loss counters for each team
        team1_wins = 0
        team1_draws = 0
        team1_losses = 0
        team2_wins = 0
        team2_draws = 0
        team2_losses = 0

        for fixture_data in serialized_data:
            team1_goals_total += fixture_data["team1_goals"]
            team2_goals_total += fixture_data["team2_goals"]
            team1_cleansheets += fixture_data["team1_clean_sheets"]
            team2_cleansheets += fixture_data["team2_clean_sheets"]

            # Analyze the result_info to determine the outcome of the match
            result_info = fixture_data["result_info"]
            if "won" in result_info:
                if fixture_data["team1_goals"] > fixture_data["team2_goals"]:
                    team1_wins += 1
                else:
                    team2_wins += 1
            elif "draw" in result_info:
                team1_draws += 1
                team2_draws += 1

        # Count the number of fixtures
        fixture_count = len(serialized_data)
        team1_losses = team2_wins
        team2_losses = team1_wins

        # Create a dictionary with the total goals for each team
        team_comparison = {
            "team1": team1_value,
            "team2": team2_value,
            "team1_country": team1_country,
            "team2_country": team2_country,
            "team1_logo": team1_logo,
            "team2_logo": team2_logo,
            "matches_played": fixture_count,
            "team1_wins": team1_wins,
            "team1_draws": team1_draws,
            "team1_losses": team1_losses,
            "team2_wins": team2_wins,
            "team2_draws": team2_draws,
            "team2_losses": team2_losses,
            "team1_goals_total": team1_goals_total,
            "team2_goals_total": team2_goals_total,
            "team1_cleansheets": team1_cleansheets,
            "team2_cleansheets": team2_cleansheets,
        }

        return Response(team_comparison)

class LatestFixtures(APIView):
    def get(self, request, team1_id, team2_id):
        url = f"https://api.sportmonks.com/v3/football/fixtures/head-to-head/{team1_id}/{team2_id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=scores;participants"
        response = requests.get(url)
        data = response.json()
        fixtures = data["data"]

        filtered_fixtures = [fixture for fixture in fixtures if isinstance(
            fixture.get("statistics"), list) and len(fixture["statistics"]) > 0]
        
         # Pass team1_id and team2_id as additional arguments to the serializer
        serializer = LatestFixturesSerializer(
            fixtures,
            many=True,
            context={"team1_id": team1_id, "team2_id": team2_id},
        )
        
        return Response(serializer.data)

class PlayerDetail(APIView):
    def get(self, request, id):
        url = f"https://api.sportmonks.com/v3/football/players/{id}?api_token=LP0bSTLjwbckzKjAF0H5R32iOf7ABTSOkyesIV5XcFg4FDVjBnY40mkg9uSu&include=teams;metadata;detailedPosition;statistics.details.type&filters=playerStatisticSeasons:21207"
        response = requests.get(url)
        data = response.json()
        player = data["data"]
        serializer = PlayerDetailsSerializer(player)

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
