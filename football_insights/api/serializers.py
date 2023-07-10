from rest_framework import serializers
from datetime import datetime


class TeamSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    logo = serializers.CharField(
        source='image_path', max_length=100, default=None)


class TeamDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    founded = serializers.CharField(max_length=100, default=None)
    country = serializers.CharField(
        source='country.name', max_length=100, default=None)
    stadium_name = serializers.CharField(
        source='venue.name', max_length=100, default=None)
    capacity = serializers.IntegerField(source='venue.capacity', default=None)


class LeagueTableSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='participant_id', default=None)
    position = serializers.IntegerField(default=None)
    team = serializers.CharField(
        source='participant.name', max_length=100, default=None)
    logo = serializers.CharField(
        source='participant.image_path', max_length=100, default=None)
    played_name = serializers.SerializerMethodField()
    played_value = serializers.SerializerMethodField()
    won_name = serializers.SerializerMethodField()
    won_value = serializers.SerializerMethodField()
    drawn_name = serializers.SerializerMethodField()
    drawn_value = serializers.SerializerMethodField()
    lost_name = serializers.SerializerMethodField()
    lost_value = serializers.SerializerMethodField()
    gf_name = serializers.SerializerMethodField()
    gf_value = serializers.SerializerMethodField()
    ga_name = serializers.SerializerMethodField()
    ga_value = serializers.SerializerMethodField()
    gd_name = "Goal Difference"
    gd_value = serializers.SerializerMethodField()
    points = serializers.IntegerField(default=None)

    def get_played_name(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 129:
                return detail['type']['name']
        return None

    def get_played_value(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 129:
                return detail['value']
        return None

    def get_won_name(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 130:
                return detail['type']['name']
        return None

    def get_won_value(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 130:
                return detail['value']
        return None

    def get_drawn_name(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 131:
                return detail['type']['name']
        return None

    def get_drawn_value(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 131:
                return detail['value']
        return None

    def get_lost_name(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 132:
                return detail['type']['name']
        return None

    def get_lost_value(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 132:
                return detail['value']
        return None

    def get_gf_name(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 133:
                return detail['type']['name']
        return None

    def get_gf_value(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 133:
                return detail['value']
        return None

    def get_ga_name(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 134:
                return detail['type']['name']
        return None

    def get_ga_value(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type_id'] == 134:
                return detail['value']
        return None

    def get_gd_value(self, instance):
        gf_value = self.get_gf_value(instance)
        ga_value = self.get_ga_value(instance)

        return gf_value - ga_value


class FixturesSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    home_score = serializers.SerializerMethodField()
    away_score = serializers.SerializerMethodField()
    stadium = serializers.CharField(source='venue.name', default=None)

    def get_team1(self, obj):
        team_names = obj.get("name")
        if team_names:
            team_list = team_names.split(" vs ")
            return team_list[0]
        return None

    def get_team2(self, obj):
        team_names = obj.get("name")
        if team_names:
            team_list = team_names.split(" vs ")
            return team_list[1]
        return None

    def get_date(self, obj):
        starting_at = obj.get("starting_at")
        if starting_at:
            date_str, time_str = starting_at.split(" ")
            datetime_obj = datetime.strptime(date_str, "%Y-%m-%d")
            uk_date_str = datetime_obj.strftime("%d/%m/%Y")
            return uk_date_str
        return None

    def get_time(self, obj):
        starting_at = obj.get("starting_at")
        if starting_at:
            date_str, time_str = starting_at.split(" ")
            time_obj = datetime.strptime(time_str, "%H:%M:%S")
            time_str = time_obj.strftime("%H:%M")
            return time_str
        return None

    def get_home_score(self, obj):
        scores = obj.get("scores", [])
        for score in scores:
            if score.get("description") == "CURRENT" and score.get("score", {}).get("participant") == "home":
                return score.get("score", {}).get("goals")
        return None

    def get_away_score(self, obj):
        scores = obj.get("scores", [])
        for score in scores:
            if score.get("description") == "CURRENT" and score.get("score", {}).get("participant") == "away":
                return score.get("score", {}).get("goals")
        return None
