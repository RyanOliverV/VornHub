import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class SeasonList(APIView):
    def get(self, request):
        # Retrieve the seasons for a particular league
        url = "https://api.sportmonks.com/v3/football/seasons/teams/6/?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&page=2"
        # Send a GET request to the specified URL
        response = requests.get(url)
        # Parse the response as JSON
        data = response.json()
        # Extract the season data from the JSON response
        seasons = data["data"]
        # Return the filtered seasons as a response
        return Response(seasons)