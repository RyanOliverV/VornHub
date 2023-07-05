from rest_framework import serializers


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
