from rest_framework import serializers
from datetime import datetime

class PredictionsSerializer(serializers.Serializer):
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    team1_prediction = serializers.SerializerMethodField()
    team2_prediction = serializers.SerializerMethodField()

    def get_team1(self, obj):
        return obj['team'] if obj['venue'] == 'Home' else obj['opponent']

    def get_team2(self, obj):
        return obj['opponent'] if obj['venue'] == 'Home' else obj['team']

    def get_date(self, obj):
        date_obj = datetime.strptime(obj['date'], "%Y-%m-%d")
        return date_obj.strftime("%d/%m/%Y")

    def get_team1_prediction(self, obj):
        prediction_label = obj['output']
        if (prediction_label == 'W' and obj['venue'] == 'Home') or (prediction_label == 'L' and obj['venue'] == 'Away'):
            return "W"
        elif (prediction_label == 'L' and obj['venue'] == 'Home') or (prediction_label == 'W' and obj['venue'] == 'Away'):
            return "L"
        else:
            return "D"

    def get_team2_prediction(self, obj):
        prediction_label = obj['output']
        if (prediction_label == 'W' and obj['venue'] == 'Away') or (prediction_label == 'L' and obj['venue'] == 'Home'):
            return "W"
        elif (prediction_label == 'L' and obj['venue'] == 'Away') or (prediction_label == 'W' and obj['venue'] == 'Home'):
            return "L"
        else:
            return "D"