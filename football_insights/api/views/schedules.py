import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.schedules import FixturesSerializer, TeamsComparisonSerializer, LatestFixturesSerializer
import datetime


class FixtureList(APIView):
    def get(self, request):
        # Define the API endpoint URL to fetch detailed information about fixtures
        url = "https://api.sportmonks.com/v3/football/seasons/21207?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=fixtures.scores;fixtures.venue;fixtures.participants"
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
        url = f"https://api.sportmonks.com/v3/football/fixtures/{id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=participants"
        response = requests.get(url)
        data = response.json()
        fixture = data["data"]

        # serializer = FixturesSerializer(fixtures, many=True)

        return Response(fixture)


class LiveScores(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/livescores?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&filters=fixtureLeagues:636&include=league;scores;participants;venue"
        response = requests.get(url)
        data = response.json()

        try:
            livescores = data["data"]
            serializer = FixturesSerializer(livescores, many=True)
            return Response(serializer.data)
        except KeyError:
            # Fetch upcoming fixtures after the current date
            today = datetime.date.today().strftime("%Y-%m-%d")
            fixtures_url = "https://api.sportmonks.com/v3/football/seasons/21207?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=fixtures.scores;fixtures.venue;fixtures.participants"
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


class TeamsComparison(APIView):
    def get(self, request, team1_id, team2_id):
        url = f"https://api.sportmonks.com/v3/football/fixtures/head-to-head/{team1_id}/{team2_id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=scores;participants.latest;statistics.type"
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
        team1_position = serialized_data[0]["team1_position"]
        team2_position = serialized_data[0]["team2_position"]
        team1_form = serialized_data[0]["team1_form"]
        team2_form = serialized_data[0]["team2_form"]
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
            "team1_position": team1_position,
            "team2_position": team2_position,
            "team1_form": team1_form,
            "team2_form": team2_form,
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
        url = f"https://api.sportmonks.com/v3/football/fixtures/head-to-head/{team1_id}/{team2_id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=scores;participants"
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
