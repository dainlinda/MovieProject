import pandas as pd
import numpy as np
from IPython.display import display
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from wordcloud import WordCloud
from PIL import Image
from sklearn.feature_extraction.text import CountVectorizer

# 1. 대본 전처리

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

main_path = "./data/movies" # 경로 로컬에 따라 수정
movies_df = [process_df(f"{main_path}/hp{i}.csv") for i in range(1,9)]
all_movies_df = pd.concat(movies_df,ignore_index=True)

change_name_dict = {'Collin Creevey':'Colin Creevey', 'Horace Horace Slughorn':'Horace Slughorn', 'Lavander Brown':'Lavender Brown', 'Lily potter':'Lily Potter', 'Pansy parkinson':'Pansy Parkinson', 'Voldemont':'Voldemort', 'Voldermort':'Voldemort','Tom Riddle':'Voldemort'}
all_movies_df = all_movies_df.replace({'character':change_name__dict})

remove_punctuation_dict = {',':'','.':'','!':'','?':''}
all_movies_df = all_movies_df.replace({'dialog_processed': remove_punctuation_dict})

all_movies_df = all_movies_df[all_movies_df.dialog_processed.apply(lambda x: len(str(x)) > 1)]
dialog_df = all_movies_df[['character', 'dialog_processed']]

# 2. 워드 클라우드

gryffindor_characters = ['Harry Potter','Hermione Granger','Ron Weasley','Albus Dumbledore','Remus Lupin','Minerva McGonagall',
'Neville Longbottom','Sirius Black','Fred Weasley','George Weasley']
slytherin_characters = ['Severus Snape','Voldemort','Draco Malfoy','Bellatrix Lestrange','Dolores Umbridge']
ravenclaw_characters = ['Gilderoy Lockhart','Luna Lovegood']

def word_cloud(characters):
        corpus = [' '.join(dialog_df[(dialog_df.character==character)].dialog_processed.tolist())for character in characters]
        new_stopwords = stopwords.words("english")
        add_stopwords = ["sir", "mr","may","must", "i'm", "i'll", "let's", "would","could"]
        new_stopwords.extend(add_stopwords)
        cv=CountVectorizer(stop_words = new_stopwords)
        X = cv.fit_transform(corpus)
        X = X.toarray()
        bow = pd.DataFrame(X, columns = cv.get_feature_names())
        bow.index = characters
        for character in characters:
            text = bow.loc[character].sort_values(ascending=False)[:100]
            text_dict = text.to_dict()
            hat_mask = np.array(Image.open('wizard_hat5.png'))
            if character in gryffindor_characters:
                colormap="OrRd"
            elif character in slytherin_characters:
                colormap="YlGn"
            elif character in ravenclaw_characters:
                colormap="Blues"
            else:
                colormap=None
            wordcloud = WordCloud(width = 600, height = 600, mask=hat_mask, min_font_size=4, max_font_size=36, mode = "RGBA", background_color=None, colormap=colormap)
            wordcloud = wordcloud.generate_from_frequencies(text_dict)
            plt.figure(figsize=(10,10))
            plt.imshow(wordcloud, interpolation="bilinear")
            plt.tight_layout(pad=0)
            plt.axis("off")
            plt.show()
            name_list = character.split(' ')
            new_name =''
            for word in name_list:
                new_name += word
            wordcloud.to_file(new_name+"WordCloud.png")

word_cloud(gryffindor_characters)
word_cloud(slytherin_characters)
word_cloud(ravenclaw_characters)

