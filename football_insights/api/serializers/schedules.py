from rest_framework import serializers
from datetime import datetime

class FixturesSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    home_score = serializers.SerializerMethodField()
    away_score = serializers.SerializerMethodField()
    stadium = serializers.CharField(source='venue.name', default=None)
    team1_logo = serializers.SerializerMethodField()
    team2_logo = serializers.SerializerMethodField()

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

    def get_team_logo(self, participant):
        meta = participant.get("meta", {})
        location = meta.get("location")
        if location == "home":
            return participant.get("image_path")
        elif location == "away":
            return participant.get("image_path")
        return None

    def get_team1_logo(self, obj):
        participants = obj.get("participants", [])
        if len(participants) > 0:
            return self.get_team_logo(participants[0])
        return None

    def get_team2_logo(self, obj):
        participants = obj.get("participants", [])
        if len(participants) > 1:
            return self.get_team_logo(participants[1])
        return None

class LatestFixturesSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    home_team = serializers.SerializerMethodField()
    away_team = serializers.SerializerMethodField()
    home_team_logo = serializers.SerializerMethodField()
    away_team_logo = serializers.SerializerMethodField()
    home_score = serializers.SerializerMethodField()
    away_score = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    def get_home_team(self, obj):
        team_names = obj.get("name")
        if team_names:
            team_list = team_names.split(" vs ")
            return team_list[0]
        return None

    def get_away_team(self, obj):
        team_names = obj.get("name")
        if team_names:
            team_list = team_names.split(" vs ")
            return team_list[1]
        return None

    def get_team_logo(self, participant):
        meta = participant.get("meta", {})
        location = meta.get("location")
        if location == "home":
            return participant.get("image_path")
        elif location == "away":
            return participant.get("image_path")
        return None

    def get_home_team_logo(self, obj):
        participants = obj.get("participants", [])
        for participant in participants:
            if participant.get("meta", {}).get("location") == "home":
                return self.get_team_logo(participant)
        return None

    def get_away_team_logo(self, obj):
        participants = obj.get("participants", [])
        for participant in participants:
            if participant.get("meta", {}).get("location") == "away":
                return self.get_team_logo(participant)
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

    def get_date(self, obj):
        starting_at = obj.get("starting_at")
        if starting_at:
            date_str, time_str = starting_at.split(" ")
            datetime_obj = datetime.strptime(date_str, "%Y-%m-%d")
            uk_date_str = datetime_obj.strftime("%d/%m/%Y")
            return uk_date_str
        return None

class TeamsComparisonSerializer (serializers.Serializer):
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    team1_country = serializers.SerializerMethodField()
    team2_country = serializers.SerializerMethodField()
    team1_logo = serializers.SerializerMethodField()
    team2_logo = serializers.SerializerMethodField()
    team1_position = serializers.SerializerMethodField()
    team2_position = serializers.SerializerMethodField()
    team1_goals = serializers.SerializerMethodField()
    team2_goals = serializers.SerializerMethodField()
    result_info = serializers.CharField(default=None)
    team1_clean_sheets = serializers.SerializerMethodField()
    team2_clean_sheets = serializers.SerializerMethodField()
    home_team = serializers.SerializerMethodField()
    away_team = serializers.SerializerMethodField()
    home_score = serializers.SerializerMethodField()
    away_score = serializers.SerializerMethodField()
    team1_form = serializers.SerializerMethodField()
    team2_form = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    def get_team_name_by_id(self, fixture, participant_id):
        for participant in fixture.get("participants", []):
            if participant.get("id") == participant_id:
                return participant.get("name")
        return None

    def get_team1(self, obj):
        team1_id = int(self.context.get("team1_id"))
        return self.get_team_name_by_id(obj, team1_id)

    def get_team2(self, obj):
        team2_id = int(self.context.get("team2_id"))
        return self.get_team_name_by_id(obj, team2_id)

    def get_team_country_by_id(self, fixture, participant_id):
        for participant in fixture.get("participants", []):
            if participant.get("id") == participant_id:
                if participant.get("country_id") == 5:
                    return "Brazil"
                elif participant.get("country_id") == 462:
                    return "England"
        return None

    def get_team1_country(self, obj):
        team1_id = int(self.context.get("team1_id"))
        return self.get_team_country_by_id(obj, team1_id)

    def get_team2_country(self, obj):
        team2_id = int(self.context.get("team2_id"))
        return self.get_team_country_by_id(obj, team2_id)

    def get_team_logo_by_id(self, fixture, participant_id):
        for participant in fixture.get("participants", []):
            if participant.get("id") == participant_id:
                return participant.get("image_path")
        return None

    def get_team1_logo(self, obj):
        team1_id = int(self.context.get("team1_id"))
        return self.get_team_logo_by_id(obj, team1_id)

    def get_team2_logo(self, obj):
        team2_id = int(self.context.get("team2_id"))
        return self.get_team_logo_by_id(obj, team2_id)

    def get_team_position_by_id(self, fixture, participant_id):
        for participant in fixture.get("participants", []):
            if participant.get("id") == participant_id:
                return participant.get("meta", {}).get("position")
        return None

    def get_team1_position(self, obj):
        team1_id = int(self.context.get("team1_id"))
        return self.get_team_position_by_id(obj, team1_id)

    def get_team2_position(self, obj):
        team2_id = int(self.context.get("team2_id"))
        return self.get_team_position_by_id(obj, team2_id)

    def get_team1_goals(self, fixture):
        team1_id = int(self.context.get("team1_id"))
        goals = 0
        for score in fixture.get("scores", []):
            if score.get("participant_id") == team1_id and score.get("description") == "CURRENT":
                goals += int(score.get("score", {}).get("goals", 0))
        return goals

    def get_team2_goals(self, fixture):
        team2_id = int(self.context.get("team2_id"))
        goals = 0
        for score in fixture.get("scores", []):
            if score.get("participant_id") == team2_id and score.get("description") == "CURRENT":
                goals += int(score.get("score", {}).get("goals", 0))
        return goals

    def get_team1_clean_sheets(self, fixture):
        team1_id = int(self.context.get("team1_id"))
        clean_sheets = 0

        # Check if the team1_id exists in the participants list
        team1_participant = next((participant for participant in fixture.get(
            "participants", []) if participant.get("id") == team1_id), None)

        # Check if the team1 has no goals in the scores list
        team1_has_goals = any(score.get("score", {}).get("goals", 0) > 0 for score in fixture.get(
            "scores", []) if score.get("participant_id") == team1_id)

        if team1_participant and not team1_has_goals:
            clean_sheets = 1

        return clean_sheets

    def get_team2_clean_sheets(self, fixture):
        team2_id = int(self.context.get("team2_id"))
        clean_sheets = 0

        # Check if the team2_id exists in the participants list
        team2_participant = next((participant for participant in fixture.get(
            "participants", []) if participant.get("id") == team2_id), None)

        # Check if the team2 has no goals in the scores list
        team2_has_goals = any(score.get("score", {}).get("goals", 0) > 0 for score in fixture.get(
            "scores", []) if score.get("participant_id") == team2_id)

        if team2_participant and not team2_has_goals:
            clean_sheets = 1

        return clean_sheets

    def get_home_team(self, obj):
        team_names = obj.get("name")
        if team_names:
            team_list = team_names.split(" vs ")
            return team_list[0]
        return None

    def get_away_team(self, obj):
        team_names = obj.get("name")
        if team_names:
            team_list = team_names.split(" vs ")
            return team_list[1]
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

    def calculate_team_form(self, matches):  # Add self parameter
        form = []
        last_5_matches = matches[-5:]  # Get the last 5 matches
        for match in last_5_matches:
            result_info = match.get("result_info")
            if result_info:
                if "won" in result_info:
                    form.append("W")
                elif "draw" in result_info:
                    form.append("D")
                else:
                    form.append("L")
        return form

    def get_team1_form(self, obj):
        participant_id = int(self.context.get("team1_id"))
        for participant in obj.get("participants", []):
            if participant.get("id") == participant_id:
                latest_matches = participant.get("latest")
                return self.calculate_team_form(latest_matches)
    
    def get_team2_form(self, obj):
        participant_id = int(self.context.get("team2_id"))
        for participant in obj.get("participants", []):
            if participant.get("id") == participant_id:
                latest_matches = participant.get("latest")
                return self.calculate_team_form(latest_matches)
            
    def get_date(self, obj):
        starting_at = obj.get("starting_at")
        if starting_at:
            date_str, time_str = starting_at.split(" ")
            datetime_obj = datetime.strptime(date_str, "%Y-%m-%d")
            uk_date_str = datetime_obj.strftime("%d/%m/%Y")
            return uk_date_str
        return None