from rest_framework import serializers


# class TeamSerializer(serializers.Serializer):
#     team_id = serializers.IntegerField()
#     name = serializers.CharField(max_length=100)
    
class TeamSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='team.id', default=None)
    name = serializers.CharField(source='team.name', max_length=100, default=None)
    
class TeamDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='team.id', default=None)
    name = serializers.CharField(source='team.name', max_length=100, default=None)
    current_form = serializers.CharField(source='form', max_length=100, default=None)
    played_total = serializers.IntegerField(source='fixtures.played.total', default=None)
    wins = serializers.IntegerField(source='fixtures.wins.total', default=None)
    draws = serializers.IntegerField(source='fixtures.draws.total', default=None)
    losses = serializers.IntegerField(source='fixtures.loses.total', default=None)