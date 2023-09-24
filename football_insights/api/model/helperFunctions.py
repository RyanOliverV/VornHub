import pandas as pd

replaceMappings = {"Manchester Utd" : "Manchester United",
"Nott'ham Forest" : "Nottingham Forest",
"Sheffield Utd" : "Sheffield United",
"West Brom" : "West Bromwich Albion",
"West Ham" : "West Ham United",
"Tottenham" : "Tottenham Hotspur",
"Newcastle Utd" : "Newcastle United",
"Wolves" : "Wolverhampton Wanderers",
"Brighton" : "Brighton and Hove Albion",
"Huddersfield" : "Huddersfield Town",
"Newcastle Utd" : "Newcastle United"}

def pipeline(data, rolling_avg_dict, ohEncoder, ordEncoder, train=True, date=True, window_size = 3):
    '''
    IMPORTANT - USE THE SAME PIPELINE FOR BOTH TRAINING AND TEST SET
    Data Preprocessing pipeline    
    inputs - 
        data - dataset
        rolling_avg_dict - a dictionary containing rolling average values and last values of captain and referee
        train - if for training or inference
        date - does dataset have date or not (useful for comparison b/w models with date and ones without)
        window_size - rolling window size (for training and setting the dict)
    '''
    #id date is True, make model with date as a feature
    if date:
        data["date"] = pd.to_datetime(data["date"])
        data["year"] = data["date"].dt.year
        data["month"] = data["date"].dt.month
        data["day"] = data["date"].dt.day
        data["dayOfWeek"] = data["date"].dt.dayofweek
    
    data["time"].fillna("00:00", inplace=True)
    data["time"] = data["time"].str.replace(":", "").astype(int)

    data["round"] = data["round"].str.replace("Matchweek ", "").astype(int)
    
    # #cleaning the formation column in case of absent values
    # data["formation"] = data["formation"].apply(lambda x: re.sub(r"[^1-9-]", "", x))

    #usign cols and new_cols using the pre-defined rolling function 
    if train:
        rolling_avg_dict = rollingAverage(False, data, train=True)
    else:
        data = rollingAverage(rolling_avg_dict, data, train=False)
    
    if train:
        # pass an empty ordinal encoder
        data[["venue", "captain", "referee", "formation"]] = ordEncoder.fit_transform(data[["venue", "captain", "referee", "formation"]]) 

    else:
        #encode using previous encoder when inferencing
        data[["venue", "captain", "referee", "formation"]] = ordEncoder.transform(data[["venue", "captain", "referee", "formation"]]) 
        
    #cleaning up the team and opponent data values
    data["team"] = data["team"].replace(replaceMappings)
    data["opponent"] = data["opponent"].replace(replaceMappings)    

    if train==True:
        #using the encoder to fit and transform our data
        teamEncodings = ohEncoder.fit_transform(data[["team", "opponent"]]).toarray()
    else:
        #using the encoder trained on our the train set to fit our validation/test data
        teamEncodings = ohEncoder.transform(data[["team", "opponent"]]).toarray()

    #feature names on which the encoder is trained/fitted
    feature_names = ohEncoder.get_feature_names_out()

    #using feature names from the train set
    teamNamesDF = pd.DataFrame(teamEncodings, columns = feature_names)
    
    #resetting index
    teamNamesDF.index = data.index
    data = pd.concat([data, teamNamesDF], axis=1).drop(["team", "opponent"], axis=1)

    for col in ["comp", "date", "match report", "notes", "gf", "ga", "sh", "sot", "dist", "fk", "pk", "pkatt", "poss", "result", "xg", "xga"]:
        try: 
            data.drop([col], axis=1, inplace = True)
        except:
            pass

    #if any null values, fill with 0
    data.fillna(0, inplace=True)
            
    if train:
        return data, rolling_avg_dict

    return data


def rollingAverage(rollingDict, data, train=True, window_size=3):
    '''
    Used to either set or impute rolling/last values for the given columns
    Inputs - 
            rollingDict - dictionary containing the values. Put it as False when Train is True
            data - training/inference dataset
            train - Bool (True or False). Set as False when rollingDict is a non-empty dict (while inferencing)
            window_size - window_size for rolling values
    Outputs - 
            When train==True, -> a dictionary containing the rolling/last values of columns (use to update the dataset)
            When train==False, -> original dataset returned with the above values imputed
    '''

    # assert that both values are oppposite
    assert bool(train)!=bool(rollingDict)
    
    cols = ["gf", "ga", "sh", "sot", "dist", "fk", "pk", "pkatt", "poss"]
    newcols = [f"rolling_{col}" for col in cols]
    
    # if train==True, use the cols to create a dict for the rolling values    
    if train:
        grouped = data.groupby('team')
        for col in zip(cols, newcols):
            data[col[1]] = grouped[col[0]].rolling(window=window_size, min_periods=1).mean().reset_index(drop=True)

        #using the last values of both captain and referee
        newcols.append("captain")
        newcols.append("referee")
        newcols.append("formation")
        
        return data.groupby('team')[newcols].last().to_dict()

    # else use the rollingDict's values to fill the null values
    for index, row in data.iterrows():
        team = row['team']
        for col in zip(cols, newcols):
            if team in rollingDict[col[1]]:
                data.at[index, col[1]] = rollingDict[col[1]][team]
                
                if type(row["captain"])!=str:
                    data.at[index, "captain"] = rollingDict["captain"][team]

                if type(row["referee"])!=str:
                    data.at[index, "referee"] = rollingDict["referee"][team]

                if type(row["formation"])!=str:
                    data.at[index, "formation"] = rollingDict["formation"][team]
    
    return data