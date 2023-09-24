import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.players import PlayerListSerializer, PlayerDetailsSerializer, PlayerHighlights
from rest_framework.pagination import PageNumberPagination


def get_all_players():
    url = "https://api.sportmonks.com/v3/football/teams/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL"
    response = requests.get(url)
    data = response.json()
    teams = data["data"]

    all_players = []

    for team in teams:
        team_id = team["id"]
        squad_url = f"https://api.sportmonks.com/v3/football/squads/seasons/21646/teams/{team_id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;details.type"
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


class PlayerDetail(APIView):
    def get(self, request, id):
        url = f"https://api.sportmonks.com/v3/football/players/{id}?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=teams.team;country;metadata;detailedPosition;position;statistics.details.type&filters=playerStatisticSeasons:21646"
        response = requests.get(url)
        data = response.json()
        player = data["data"]
        serializer = PlayerDetailsSerializer(player)

        return Response(serializer.data)


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

# class PlayerHighlights(APIView):
#     def get(self, request):
#         url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:1601"
#         response = requests.get(url)
#         data = response.json()
#         players = data["data"]
        

#         # serializer = PlayerDetailsSerializer(top_scorer)

#         return Response(data)
    
class MostGoals(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:208"
        response = requests.get(url)
        data = response.json()
        players = data["data"]
        
        top_scorer = players[0]
        
        serializer = PlayerHighlights(top_scorer)
        
        return Response(serializer.data)

class MostAssists(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:209"
        response = requests.get(url)
        data = response.json()
        players = data["data"]

        top_scorer = players[0]
        
        serializer = PlayerHighlights(top_scorer)
        
        return Response(serializer.data)

class MostPens(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:1600"
        response = requests.get(url)
        data = response.json()
        players = data["data"]
        
        top_scorer = players[0]
        
        serializer = PlayerHighlights(top_scorer)
        
        return Response(serializer.data)

class MostPensMissed(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:1601"
        response = requests.get(url)
        data = response.json()
        players = data["data"]
        
        top_scorer = players[0]
        
        serializer = PlayerHighlights(top_scorer)
        
        return Response(serializer.data)
    
class MostYellowCards(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:84"
        response = requests.get(url)
        data = response.json()
        players = data["data"]
        
        top_scorer = players[0]
        
        serializer = PlayerHighlights(top_scorer)
        
        return Response(serializer.data)

class MostRedCards(APIView):
    def get(self, request):
        url = "https://api.sportmonks.com/v3/football/topscorers/seasons/21646?api_token=SfgFq9wDOHoDn9T5XiLZsSf2Id2rJ7lTgafxIoxOfDbwczPBrHTaQxtcmYUL&include=player;type&filters=seasonTopscorerTypes:83"
        response = requests.get(url)
        data = response.json()
        players = data["data"]
        
        top_scorer = players[0]
        
        serializer = PlayerHighlights(top_scorer)
        
        return Response(serializer.data)