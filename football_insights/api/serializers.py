from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination
from rest_framework.serializers import Serializer
from datetime import datetime


class CustomPagination(PageNumberPagination):
    page_size = 10  # Set the number of items per page
    page_size_query_param = 'page_size'  # Customize the page size query parameter
    max_page_size = 100  # Set the maximum allowed page size


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
    matches_played = serializers.SerializerMethodField()
    wins = serializers.SerializerMethodField()
    draws = serializers.SerializerMethodField()
    losses = serializers.SerializerMethodField()
    goals = serializers.SerializerMethodField()
    penalties = serializers.SerializerMethodField()
    shots = serializers.SerializerMethodField()
    possession = serializers.SerializerMethodField()
    corners = serializers.SerializerMethodField()
    dangerous_attacks = serializers.SerializerMethodField()
    failed_to_score = serializers.SerializerMethodField()
    tackles = serializers.SerializerMethodField()
    goals_conceded = serializers.SerializerMethodField()
    cleansheets = serializers.SerializerMethodField()
    highest_rated = serializers.SerializerMethodField()
    fouls = serializers.SerializerMethodField()
    yellows = serializers.SerializerMethodField()
    reds = serializers.SerializerMethodField()
    results = serializers.CharField(max_length=100, default="W D L W W")
    
    def get_matches_played(self, instance):
        wins = self.get_wins(instance) or 0
        draws = self.get_draws(instance) or 0
        losses = self.get_losses(instance) or 0

        matches_played = wins + draws + losses
        return matches_played
    
    def get_wins(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-wins':
                    return detail['value']['all']['count']

    def get_draws(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-draws':
                    return detail['value']['all']['count']

    def get_losses(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-lost':
                    return detail['value']['all']['count']

    def get_goals(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals':
                    return detail['value']['all']['count']

    def get_penalties(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'penalties':
                    return detail['value']['scored']

    def get_shots(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'shots':
                    return detail['value']['average']

    def get_possession(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'ball-possession':
                    return detail['value']['average']

    def get_corners(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'corners':
                    return detail['value']['count']

    def get_dangerous_attacks(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'dangerous-attacks':
                    return detail['value']['count']

    def get_failed_to_score(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'failed-toscore':
                    return detail['value']['all']['count']

    def get_tackles(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'tackles':
                    return detail['value']['average']

    def get_goals_conceded(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals-conceded':
                    return detail['value']['all']['count']

    def get_cleansheets(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'cleansheets':
                    return detail['value']['all']['count']

    def get_highest_rated(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'highest-rated-player':
                    return detail['value']['rating'] and detail['value']['player_name']

    def get_fouls(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'fouls':
                    return detail['value']['count']

    def get_yellows(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'yellowcards':
                    return detail['value']['count']

    def get_reds(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'redcards':
                    return detail['value']['count']


class PlayerListSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='player.id', default=None)
    name = serializers.CharField(
        source='player.name', max_length=100, default=None)
    rating = serializers.SerializerMethodField()

    def get_rating(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'rating':
                return detail['value']['average']
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get('rating') is None:
            return None
        return data


class PlayerDetailsSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    age = serializers.SerializerMethodField()
    team = serializers.CharField(
        source='team.name', max_length=100, default=None)
    position = serializers.CharField(
        source='detailedposition.name', max_length=100, default=None)
    appearances = serializers.SerializerMethodField()
    minutes = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    goals = serializers.SerializerMethodField()
    assists = serializers.SerializerMethodField()
    offsides = serializers.SerializerMethodField()
    totalShots = serializers.SerializerMethodField()
    shotsOnTarget = serializers.SerializerMethodField()
    shotsBlocked = serializers.SerializerMethodField()
    bigChancesMissed = serializers.SerializerMethodField()
    passes = serializers.SerializerMethodField()
    accuratePasses = serializers.SerializerMethodField()
    accuratePassesPercentage = serializers.SerializerMethodField()
    keyPasses = serializers.SerializerMethodField()
    bigChancesCreated = serializers.SerializerMethodField()
    totalCrosses = serializers.SerializerMethodField()
    accurateCrosses = serializers.SerializerMethodField()
    longBalls = serializers.SerializerMethodField()
    longBallsWon = serializers.SerializerMethodField()
    throughBalls = serializers.SerializerMethodField()
    throughBallsWon = serializers.SerializerMethodField()
    dribbleAttempts = serializers.SerializerMethodField()
    dribbledPast = serializers.SerializerMethodField()
    dispossessed = serializers.SerializerMethodField()
    foulsDrawn = serializers.SerializerMethodField()
    totalDuels = serializers.SerializerMethodField()
    duelsWon = serializers.SerializerMethodField()
    aerialsWon = serializers.SerializerMethodField()
    tackles = serializers.SerializerMethodField()
    interceptions = serializers.SerializerMethodField()
    blockedShots = serializers.SerializerMethodField()
    clearances = serializers.SerializerMethodField()
    goalsConceded = serializers.SerializerMethodField()
    fouls = serializers.SerializerMethodField()
    saves = serializers.SerializerMethodField()
    savesInsideBox = serializers.SerializerMethodField()
    errorsToGoal = serializers.SerializerMethodField()
    yellows = serializers.SerializerMethodField()
    reds = serializers.SerializerMethodField()

    def get_age(self, obj):
        if obj['date_of_birth']:
            birth_date = datetime.strptime(obj['date_of_birth'], '%Y-%m-%d')
            today = datetime.now()
            age = today.year - birth_date.year - \
                ((today.month, today.day) < (birth_date.month, birth_date.day))
            return age
        return None

    def get_appearances(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'appearances':
                    return detail['value']['total']

    def get_minutes(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'minutes-played':
                    return detail['value']['total']

    def get_rating(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'rating':
                    return detail['value']['average']

    def get_offsides(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'offsides':
                    return detail['value']['total']

    def get_totalShots(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'shots-total':
                    return detail['value']['total']
        return None

    def get_shotsOnTarget(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'shots-on-target':
                    return detail['value']['total']

    def get_shotsBlocked(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'shots-blocked':
                    return detail['value']['total']

    def get_bigChancesMissed(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'big-chances-missed':
                    return detail['value']['total']

    def get_goals(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'goals':
                    return detail['value']['total']
        return None

    def get_assists(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'assists':
                    return detail['value']['total']
        return None

    def get_passes(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'passes':
                    return detail['value']['total']

    def get_accuratePasses(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'accurate-passes':
                    return detail['value']['total']

    def get_accuratePassesPercentage(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'accurate-passes-percentage':
                    return detail['value']['total']

    def get_keyPasses(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'key-passes':
                    return detail['value']['total']

    def get_bigChancesCreated(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'big-chances-created':
                    return detail['value']['total']

    def get_totalCrosses(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'total-crosses':
                    return detail['value']['total']

    def get_accurateCrosses(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'accurate-crosses':
                    return detail['value']['total']

    def get_longBalls(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'long-balls':
                    return detail['value']['total']

    def get_longBallsWon(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'long-balls-won':
                    return detail['value']['total']

    def get_throughBalls(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'through-balls':
                    return detail['value']['total']

    def get_throughBallsWon(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'through-balls-won':
                    return detail['value']['total']

    def get_dribbleAttempts(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'dribble-attempts':
                    return detail['value']['total']

    def get_dribbledPast(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'dribbled-past':
                    return detail['value']['total']

    def get_dispossessed(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'dispossessed':
                    return detail['value']['total']

    def get_foulsDrawn(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'fouls-drawn':
                    return detail['value']['total']

    def get_totalDuels(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'total-duels':
                    return detail['value']['total']

    def get_duelsWon(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'duels-won':
                    return detail['value']['total']

    def get_aerialsWon(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'aeriels-won':
                    return detail['value']['total']

    def get_goalsConceded(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'goals-conceded':
                    return detail['value']['total']

    def get_tackles(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'tackles':
                    return detail['value']['total']

    def get_interceptions(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'interceptions':
                    return detail['value']['total']

    def get_blockedShots(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'blocked-shots':
                    return detail['value']['total']

    def get_clearances(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'clearances':
                    return detail['value']['total']

    def get_fouls(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'fouls':
                    return detail['value']['total']

    def get_saves(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'saves':
                    return detail['value']['total']

    def get_savesInsideBox(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'saves-insidebox':
                    return detail['value']['total']

    def get_errorsToGoal(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'error-lead-to-goal':
                    return detail['value']['total']

    def get_yellows(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'yellowcards':
                    return detail['value']['total']
        return None

    def get_reds(self, instance):
        statistics = instance.get('statistics', [])
        for stats in statistics:
            for detail in stats.get('details', []):
                if detail['type']['code'] == 'yellowred-cards':
                    return detail['value']['total']
        return None


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


class TeamInfoSerializer(serializers.Serializer):
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    team1_country = serializers.SerializerMethodField()
    team2_country = serializers.SerializerMethodField()
    team1_logo = serializers.SerializerMethodField()
    team2_logo = serializers.SerializerMethodField()


class TeamsComparisonSerializer (serializers.Serializer):
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    team1_country = serializers.SerializerMethodField()
    team2_country = serializers.SerializerMethodField()
    team1_logo = serializers.SerializerMethodField()
    team2_logo = serializers.SerializerMethodField()
    team1_goals = serializers.SerializerMethodField()
    team2_goals = serializers.SerializerMethodField()
    result_info = serializers.CharField(default=None)
    team1_clean_sheets = serializers.SerializerMethodField()
    team2_clean_sheets = serializers.SerializerMethodField()
    home_team = serializers.SerializerMethodField()
    away_team = serializers.SerializerMethodField()
    home_score = serializers.SerializerMethodField()
    away_score = serializers.SerializerMethodField()
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

    def get_date(self, obj):
        starting_at = obj.get("starting_at")
        if starting_at:
            date_str, time_str = starting_at.split(" ")
            datetime_obj = datetime.strptime(date_str, "%Y-%m-%d")
            uk_date_str = datetime_obj.strftime("%d/%m/%Y")
            return uk_date_str
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
