from rest_framework import serializers


# class TeamSerializer(serializers.Serializer):
#     team_id = serializers.IntegerField()
#     name = serializers.CharField(max_length=100)
class LeagueSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='season.id', default=None)
    name = serializers.CharField(max_length=100, default=None)
    country = serializers.CharField(max_length=100, default=None)
    year = serializers.IntegerField(source='season.year', default=None)  
    
class TeamSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    logo = serializers.CharField(source='image', max_length=100, default=None)
    
class TeamDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    founded = serializers.CharField(max_length=100, default=None)
    country = serializers.CharField(max_length=100, default=None)
    stadium_name = serializers.CharField(max_length=100, default=None)
    attendance = serializers.IntegerField(source='stats.average_attendance_overall', default=None)

class AllTeamsDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    founded = serializers.CharField(max_length=100, default=None)
    country = serializers.CharField(max_length=100, default=None)
    attendance = serializers.IntegerField(source='stats.average_attendance_overall', default=None)