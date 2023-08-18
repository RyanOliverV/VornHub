from rest_framework import serializers
from datetime import datetime


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
    logo = serializers.CharField(
        source='image_path', max_length=100, default=None)
    age = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    country = serializers.CharField(
        source='country.name', max_length=100, default=None)
    position = serializers.CharField(
        source='detailedposition.name', max_length=100, default=None)
    alternatePosition = serializers.CharField(
        source='position.name', max_length=100, default=None)
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

    def get_team(self, instance):
        teams = instance.get('teams', [])
        for team in teams:
            return team['team']['name']
                
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

class PlayerHighlights(serializers.Serializer):
    id = serializers.IntegerField(default=None)
    name = serializers.CharField(max_length=100, default=None)
    logo = serializers.CharField(max_length=100, default=None)