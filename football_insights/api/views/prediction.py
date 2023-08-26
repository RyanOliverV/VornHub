import requests
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import pickle
from ..model.helperFunctions import pipeline
import os
from ..serializers.predictions import PredictionsSerializer


class PredictionAPI(APIView):
    def get(self, request):
        
        # Get the directory of the current script
        script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # Load the saved model and encoders using pickle
        model = os.path.join(script_dir, "model", "xgb_classifier_model.pkl")
        onehot = os.path.join(script_dir, "model", "one_hot_encoder.pkl")
        ordinal = os.path.join(script_dir, "model", "ordinal_encoder.pkl")
        nullValuesDict = os.path.join(script_dir, "model", "rollingDict.pkl")

        # Load the saved model using pickle
        with open(model, 'rb') as model_file:
            loaded_rf_model = pickle.load(model_file)

        # Load the saved OneHotEncoder using pickle
        with open(onehot, 'rb') as ohe_encoder_file:
            ohe_loaded_encoder = pickle.load(ohe_encoder_file)

        with open(ordinal, 'rb') as ord_encoder_file:
            ord_loaded_encoder = pickle.load(ord_encoder_file)

        # Read dictionary pkl file
        with open(nullValuesDict, 'rb') as fp:
            rollingDict = pickle.load(fp)

        data = pd.read_csv(os.path.join(script_dir, "model", "future_matches.csv"), index_col=0)

        replaceMappings = {"Manchester Utd" : "Manchester United",
"Nott'ham Forest" : "Nottingham Forest",
"Sheffield Utd" : "Sheffield United",
"West Brom" : "West Bromwich Albion",
"West Ham" : "West Ham United",
"Tottenham" : "Tottenham Hotspur",
"Newcastle Utd" : "Newcastle United",
"Wolves" : "Wolverhampton Wanderers",
"Brighton" : "Brighton & Hove Albion",
"Huddersfield" : "Huddersfield Town",
"Newcastle Utd" : "Newcastle United"}

        #cleaning up the team and opponent data values
        data["team"] = data["team"].replace(replaceMappings)
        data["opponent"] = data["opponent"].replace(replaceMappings) 

        # Sort the DataFrame by the 'date' column
        data.sort_values(by='date', inplace=True)

        # Reset the index to start from 0 and go up sequentially
        data.reset_index(drop=True, inplace=True)

        # Create a unique identifier for each fixture based on team names and match date
        data['fixture_identifier'] = data.apply(lambda row: '-'.join(sorted([str(row['team']), str(row['opponent'])])) + '-' + str(row['date']) if isinstance(row['team'], str) and isinstance(row['opponent'], str) and isinstance(row['date'], str) else '', axis=1)

        # Drop duplicates based on the fixture_identifier
        data = data.drop_duplicates(subset='fixture_identifier', keep='first')

        # Drop the temporary fixture_identifier column
        data.drop('fixture_identifier', axis=1, inplace=True)

        # Reset the index to start from 0 and go up sequentially
        data.reset_index(drop=True, inplace=True)
        
        # Keep a copy of the original fixture information
        original_data = data.copy()
        
        #keep the output as same dataframe
        data = pipeline(data, rollingDict, ohe_loaded_encoder, ord_loaded_encoder, train=False, date=True)
        
        # Make predictions using the loaded model
        data["output"] = loaded_rf_model.predict(data)
        
        # Map numerical predictions to labels
        output_label_mapping = {0: 'L', 1: 'D', 2: 'W'}
        
        venue_label_mapping = {0: 'Away', 1: 'Home'}
        
        data["output"] = data["output"].map(output_label_mapping)
        
        data["venue"] = data["venue"].map(venue_label_mapping)
        
        # Add the fixture information back to the predicted data
        data = pd.concat([original_data, data], axis=1)
        
        # Convert predictions to a dictionary
        predictions_dict = data[["team", "opponent", "date", "venue", "output"]].to_dict(orient='records')

        # Serialize the predictions dictionary
        serializer = PredictionsSerializer(predictions_dict, many=True)
        
        return Response(serializer.data)