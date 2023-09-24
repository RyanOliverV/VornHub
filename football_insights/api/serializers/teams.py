from rest_framework import serializers
from datetime import datetime

class TeamSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    logo = serializers.CharField(
        source='image_path', max_length=100, default=None)

class TeamInfoSerializer(serializers.Serializer):
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    team1_country = serializers.SerializerMethodField()
    team2_country = serializers.SerializerMethodField()
    team1_logo = serializers.SerializerMethodField()
    team2_logo = serializers.SerializerMethodField()

class TeamDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    logo = serializers.CharField(
        source='image_path', max_length=100, default=None)
    founded = serializers.CharField(max_length=100, default=None)
    country = serializers.CharField(
        source='country.name', max_length=100, default=None)
    stadium_name = serializers.CharField(
        source='venue.name', max_length=100, default=None)
    capacity = serializers.IntegerField(source='venue.capacity', default=None)
    manager = serializers.SerializerMethodField()
    matches_played = serializers.SerializerMethodField()
    wins = serializers.SerializerMethodField()
    draws = serializers.SerializerMethodField()
    losses = serializers.SerializerMethodField()
    goals = serializers.SerializerMethodField()
    failed_to_score = serializers.SerializerMethodField()
    goals_conceded = serializers.SerializerMethodField()
    cleansheets = serializers.SerializerMethodField()
    matches_played_home = serializers.SerializerMethodField()
    wins_home = serializers.SerializerMethodField()
    draws_home = serializers.SerializerMethodField()
    losses_home = serializers.SerializerMethodField()
    goals_home = serializers.SerializerMethodField()
    failed_to_score_home = serializers.SerializerMethodField()
    goals_conceded_home = serializers.SerializerMethodField()
    cleansheets_home = serializers.SerializerMethodField()
    matches_played_away = serializers.SerializerMethodField()
    wins_away = serializers.SerializerMethodField()
    draws_away = serializers.SerializerMethodField()
    losses_away = serializers.SerializerMethodField()
    goals_away = serializers.SerializerMethodField()
    failed_to_score_away = serializers.SerializerMethodField()
    goals_conceded_away = serializers.SerializerMethodField()
    cleansheets_away = serializers.SerializerMethodField()
    scored_per_game = serializers.SerializerMethodField()
    scored_over_0_5 = serializers.SerializerMethodField()
    scored_over_1_5 = serializers.SerializerMethodField()
    scored_over_2_5 = serializers.SerializerMethodField()
    scored_both_halves = serializers.SerializerMethodField()
    scored_first = serializers.SerializerMethodField()
    failed_to_score_percentage = serializers.SerializerMethodField()
    penalties_percentage = serializers.SerializerMethodField()
    conceded_per_game = serializers.SerializerMethodField()
    cleansheets_percentage = serializers.SerializerMethodField()
    tackles_per_game = serializers.SerializerMethodField()
    fouls_per_game = serializers.SerializerMethodField()
    conceded_before_HT = serializers.SerializerMethodField()
    conceded_after_HT = serializers.SerializerMethodField()
    first_to_concede = serializers.SerializerMethodField()
    yellow_per_game = serializers.SerializerMethodField()
    penalties = serializers.SerializerMethodField()
    shots = serializers.SerializerMethodField()
    possession = serializers.SerializerMethodField()
    corners = serializers.SerializerMethodField()
    dangerous_attacks = serializers.SerializerMethodField()
    tackles = serializers.SerializerMethodField()
    highest_rated = serializers.SerializerMethodField()
    fouls = serializers.SerializerMethodField()
    yellows = serializers.SerializerMethodField()
    reds = serializers.SerializerMethodField()
    form = serializers.SerializerMethodField()

    def get_manager(self, instance):
        coaches = instance.get('coaches', [])

        for coach in coaches:
            if coach.get("active"):
                coach_data = coach.get("coach")
                if coach_data:
                    return coach_data.get("name")

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

    def get_failed_to_score(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'failed-toscore':
                    return detail['value']['all']['count']

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

    def get_matches_played_home(self, instance):
        wins = self.get_wins_home(instance) or 0
        draws = self.get_draws_home(instance) or 0
        losses = self.get_losses_home(instance) or 0

        matches_played = wins + draws + losses
        return matches_played

    def get_wins_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-wins':
                    return detail['value']['home']['count']

    def get_draws_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-draws':
                    return detail['value']['home']['count']

    def get_losses_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-lost':
                    return detail['value']['home']['count']

    def get_goals_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals':
                    return detail['value']['home']['count']

    def get_failed_to_score_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'failed-toscore':
                    return detail['value']['home']['count']

    def get_goals_conceded_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals-conceded':
                    return detail['value']['home']['count']

    def get_cleansheets_home(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'cleansheets':
                    return detail['value']['home']['count']

    def get_matches_played_away(self, instance):
        wins = self.get_wins_away(instance) or 0
        draws = self.get_draws_away(instance) or 0
        losses = self.get_losses_away(instance) or 0

        matches_played = wins + draws + losses
        return matches_played

    def get_wins_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-wins':
                    return detail['value']['away']['count']

    def get_draws_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-draws':
                    return detail['value']['away']['count']

    def get_losses_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'team-lost':
                    return detail['value']['away']['count']

    def get_goals_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals':
                    return detail['value']['away']['count']

    def get_failed_to_score_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'failed-toscore':
                    return detail['value']['away']['count']

    def get_goals_conceded_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals-conceded':
                    return detail['value']['away']['count']

    def get_cleansheets_away(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'cleansheets':
                    return detail['value']['away']['count']

    def get_scored_per_game(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals':
                    return detail['value']['all']['average']

    def get_scored_over_0_5(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'number-of-goals':
                    return detail['value']['over_0_5']['team']['percentage']

    def get_scored_over_1_5(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'number-of-goals':
                    return detail['value']['over_1_5']['team']['percentage']

    def get_scored_over_2_5(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'number-of-goals':
                    return detail['value']['over_2_5']['team']['percentage']

    def get_scored_both_halves(self, instance):
        statistics = instance.get('statistics', [])
        first_half_total = 0
        second_half_total = 0
        first_half_scored = 0
        second_half_scored = 0

        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'scoring-minutes':
                    value = detail['value']
                    for interval, interval_data in value.items():
                        interval_end = int(interval.split('-')[1])
                        if interval_end <= 45:
                            first_half_total += interval_data['count']
                            first_half_scored += interval_data['percentage'] * \
                                interval_data['count'] / 100
                        else:
                            second_half_total += interval_data['count']
                            second_half_scored += interval_data['percentage'] * \
                                interval_data['count'] / 100

        total_scored = first_half_scored + second_half_scored
        total_possible = first_half_total + second_half_total

        if total_possible > 0:
            overall_percentage = (total_scored / total_possible) * 100
        else:
            overall_percentage = 0

        return overall_percentage

    def get_scored_first(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals':
                    return detail['value']['all']['first']

    def get_failed_to_score_percentage(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'failed-toscore':
                    return detail['value']['all']['percentage']

    def get_penalties_percentage(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'penalties':
                    return detail['value']['conversion_rate']

    def get_conceded_per_game(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals-conceded':
                    return detail['value']['all']['average']

    def get_cleansheets_percentage(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'cleansheets':
                    return detail['value']['all']['percentage']

    def get_tackles_per_game(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'tackles':
                    return detail['value']['average']

    def get_fouls_per_game(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'fouls':
                    return detail['value']['average']

    def get_conceded_before_HT(self, instance):
        statistics = instance.get('statistics', [])
        conceded_before_ht_percentage = 0

        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'conceded-scoring-minutes':
                    value = detail['value']
                    for interval, interval_data in value.items():
                        interval_end = int(interval.split('-')[1])
                        if interval_end <= 45:
                            conceded_before_ht_percentage += interval_data['percentage']

        return conceded_before_ht_percentage

    def get_conceded_after_HT(self, instance):
        statistics = instance.get('statistics', [])
        conceded_after_ht_percentage = 0

        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'conceded-scoring-minutes':
                    value = detail['value']
                    for interval, interval_data in value.items():
                        interval_end = int(interval.split('-')[1])
                        if interval_end > 45:
                            conceded_after_ht_percentage += interval_data['percentage']

        return conceded_after_ht_percentage

    def get_first_to_concede(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'goals-conceded':
                    return detail['value']['all']['first']

    def get_yellow_per_game(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'yellowcards':
                    return detail['value']['average']

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

    def get_tackles(self, instance):
        statistics = instance.get('statistics', [])
        for stat in statistics:
            for detail in stat.get('details', []):
                if detail['type']['code'] == 'tackles':
                    return detail['value']['average']

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

    def get_form(self, obj):
        # Assuming 'latest' contains the matches for the team
        latest_matches = obj.get("latest")
        return self.calculate_team_form(latest_matches)
    
class SquadListSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='player.id', default=None)
    name = serializers.CharField(
        source='player.display_name', max_length=100, default=None)
    age = serializers.SerializerMethodField()
    position = serializers.CharField(source='player.position_id', default=None)
    detailed_position = serializers.CharField(source='player.detailed_position_id', default=None)
    appearances = serializers.SerializerMethodField()
    minutes_played = serializers.SerializerMethodField()
    goals = serializers.SerializerMethodField()
    assists = serializers.SerializerMethodField()
    pass_success = serializers.SerializerMethodField()
    big_chances_created = serializers.SerializerMethodField()
    key_passes = serializers.SerializerMethodField()
    tackles = serializers.SerializerMethodField()
    interceptions = serializers.SerializerMethodField()
    clearances = serializers.SerializerMethodField()
    yellow_cards = serializers.SerializerMethodField()
    red_cards = serializers.SerializerMethodField()
    

    def get_age(self, obj):
        if 'player' in obj and 'date_of_birth' in obj['player'] and obj['player']['date_of_birth']:
            birth_date = datetime.strptime(obj['player']['date_of_birth'], '%Y-%m-%d')
            today = datetime.now()
            age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
            return age
        return None
    
    def get_appearances(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'appearances':
                return detail['value']['total']
        return None
    
    def get_minutes_played(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'minutes-played':
                return detail['value']['total']
        return None
    
    def get_goals(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'goals':
                return detail['value']['total']
        return None

    def get_assists(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'assists':
                return detail['value']['total']
        return None

    def get_pass_success(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'accurate-passes-percentage':
                return detail['value']['total']
        return None
    
    def get_big_chances_created(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'big-chances-created':
                return detail['value']['total']
        return None
    
    def get_key_passes(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'key-passes':
                return detail['value']['total']
        return None
    
    def get_tackles(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'tackles':
                return detail['value']['total']
        return None

    def get_interceptions(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'interceptions':
                return detail['value']['total']
        return None

    def get_clearances(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'clearances':
                return detail['value']['total']
        return None

    def get_yellow_cards(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'yellowcards':
                return detail['value']['total']
        return None

    def get_red_cards(self, instance):
        details = instance.get('details', [])
        for detail in details:
            if detail['type']['code'] == 'redcards':
                return detail['value']['total']
        return None