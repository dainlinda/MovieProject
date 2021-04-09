import pandas as pd
import numpy as np
from IPython.display import display
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from nrclex import NRCLex
import nltk
nltk.download('punkt')

# 영화 대본 데이터 전처리 
def process_df(file_path):

    def explode(df, lst_cols, fill_value='', preserve_index=False):
        idx_cols = df.columns.difference(lst_cols)
        lens = df[lst_cols[0]].str.len()
        idx = np.repeat(df.index.values, lens)

        res = (pd.DataFrame({
                    col:np.repeat(df[col].values, lens)
                    for col in idx_cols},
                    index=idx)
                 .assign(**{col:np.concatenate(df.loc[lens>0, col].values)
                                for col in lst_cols}))

        if (lens == 0).any():
            res = (res.append(df.loc[lens==0, idx_cols], sort=False)
                      .fillna(fill_value))
            
        res = res.sort_index()
        
        if not preserve_index:        
            res = res.reset_index(drop=True)
        return res

    df = pd.read_csv(file_path)
    df['dialog_processed']=df['dialog'].apply(lambda s: sent_tokenize(str(s).lower()))
    return explode(df,['dialog_processed'])

main_path = "./backend/data/movies"
movies_df = [process_df(f"{main_path}/hp{i}.csv") for i in range(1,9)]

all_movies_df = pd.concat(movies_df,ignore_index=True)

change_value_dict = {'Collin Creevey':'Colin Creevey', 'Horace Horace Slughorn':'Horace Slughorn', 'Lavander Brown':'Lavender Brown', 'Lily potter':'Lily Potter', 'Pansy parkinson':'Pansy Parkinson', 'Voldemont':'Voldemort', 'Voldermort':'Voldemort'}

all_movies_df = all_movies_df.replace({'character':change_value_dict})
all_movies_df['dialog_processed'] = all_movies_df['dialog_processed'].str.replace(',', '')
all_movies_df = all_movies_df[all_movies_df.dialog_processed.apply(lambda x: len(str(x)) > 1)]

# speech dataframe (대사 데이터 프레임)
speech_df = all_movies_df[['character','dialog_processed']]
speech_df.rename(columns={'dialog_processed': 'speech'}, inplace=True)
speech_df.to_csv("speech.csv")

# 캐릭터 데이터 세트 전처리
characters_df = pd.read_csv('./backend/data/characters_revised.csv')

characters_in_characters_dataset = characters_df['Name']
characters_in_characters_dataset = np.array(characters_in_characters_dataset.tolist())

characters_in_movies_dataset = all_movies_df['character'].unique()

characters_not_in_movies_dataset = []
for x in np.setdiff1d(characters_in_characters_dataset,characters_in_movies_dataset):
    characters_not_in_movies_dataset.append(x)

characters_df = characters_df[~characters_df.Name.isin(characters_not_in_movies_dataset)]

# characters dataframe (캐릭터 데이터 프레임)
characters_df = characters_df[['Name','House','Loyalty','Blood status']]
characters_df.rename(columns={'Name': 'name', 'House': 'house', 'Loyalty': 'loyalty', 'Blood status': 'blood status'}, inplace=True)
characters_df.to_csv("characters.csv")

# 정서 분석
def sentiment_scores(movie_df,n):
    dialog_count = movie_df.groupby('character').count().reset_index().sort_values(['dialog_processed'], ascending=False)
    top_ch = dialog_count['character'][:n]
    sentiment_scores_list = []
    
    for ch in (top_ch):
        characters_dialog = list(movie_df[movie_df['character']==ch]['dialog_processed'])
        
        text_object = NRCLex(' '.join(characters_dialog))
        
        sentiment_scores = pd.DataFrame(list(text_object.raw_emotion_scores.items()))
    
    
        sentiment_scores['character'] = ch
        sentiment_scores = sentiment_scores.rename(columns={ 0: 'sentiment', 1: 'score'})
        sentiment_scores_pivoted1 = sentiment_scores.pivot(index='character', columns='sentiment', values='score')
        sentiment_scores_pivoted2 = sentiment_scores_pivoted1.copy()
        sentiment_scores_pivoted2.columns = sentiment_scores_pivoted2.columns.values
        sentiment_scores_pivoted2.reset_index(level=0, inplace=True)
        sentiment_scores = sentiment_scores_pivoted2.drop(['positive','negative'], axis=1)
        sentiment_scores_array = sentiment_scores.to_numpy()
        sentiment_scores_list.append(sentiment_scores_array)
        
    sentiment_df = pd.DataFrame(np.concatenate(sentiment_scores_list))
    sentiment_df = sentiment_df.rename(columns={0:'character',1:'anger',2:'anticipation',3:'disgust',4:'fear',5:'joy',6:'sadness',7:'surprise',8:'trust'})

    return sentiment_df
# emotions dataframe (정서 데이터 프레임)
emotions_df = sentiment_scores(all_movies_df,n=30)
emotions_df.to_csv("emotions.csv")