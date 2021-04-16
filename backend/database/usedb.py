import pymysql

class UseDB:
    def __init__(self):
        self.db_init()

    def db_init(self):
        self.con = pymysql.connect(host="127.0.0.1", user='root',
                passwd='1234', db='harrydb', charset='utf8', port = 3306)
    
    def db_free(self):
        if self.con:
            self.con.close()

    #characters
    def characters_insert(self, name):
        sql = ''' insert into characters(name)
              values(%s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (name))
        self.con.commit()

    def characters_select(self):
        sql = ''' select * from characters;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result

    def characters_name_dorm_select(self, id):
        sql = ''' select name, dorm from characters where id = %s;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (id))
            result = cursor.fetchone()
        self.con.commit()
        return result

    #speech
    def speech_insert(self, character, speech):
        sql = ''' insert into speech(`character`, `speech`)
              values(%s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (character,speech))
        self.con.commit()

    def speech_has_characters_insert(self, speech_id, characters_id):
        sql = ''' insert into speech_has_characters(speech_id, characters_id)
              values(%s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (speech_id, characters_id))
        self.con.commit()

    #emotions
    def emotions_insert(self, anger, anticipation, disgust, fear, joy, sadness, surprise, trust, characters_id):
        sql = ''' insert into emotions(anger, anticipation, disgust, fear, joy, sadness, surprise, trust, characters_id)
              values(%s, %s,%s, %s,%s, %s,%s, %s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (anger,anticipation,disgust,fear,joy,sadness,surprise,trust,characters_id))
        self.con.commit()

    #spell
    def spells_insert(self, character,series,spell):
        sql = ''' insert into spells(`character`,`series`,`spell`)
              values(%s, %s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (character,series,spell))
        self.con.commit()

    def spells_has_characters_insert(self, spells_id, characters_id):
        sql = ''' insert into spells_has_characters(spells_id, characters_id)
              values(%s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (spells_id, characters_id))
        self.con.commit()

    def spells_search_hasid(self, characters_id):
        sql = ''' select * from spells_has_characters where characters_id = %s; '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (characters_id))
            result = cursor.fetchone()
        self.con.commit()
        return result

    def spells_all_series_select(self):
        sql = ''' select spell, count(spell) as freq from spells
                    group by spell
                    order by count(spell) desc
                    limit 20; '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result

    def spells_character_select(self, characters_id):
        sql = ''' select spells_has_characters.characters_id, spells.spell, count(*) as cnt 
                    from spells_has_characters 
                    inner join spells 
                    on spells.id = spells_has_characters.spells_id
                    where characters_id = %s
                    group by spells_has_characters.characters_id, spells.spell 
                    order by cnt desc limit 5; '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (characters_id))
            result = cursor.fetchall()
        self.con.commit()
        return result

    def spells_series_select(self, series):
        sql = ''' select series, spell, count(spell) as freq
                    from spells
                    where series = %s
                    group by series, spell
                    order by freq DESC limit 5; '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (series))
            result = cursor.fetchall()
        self.con.commit()
        return result

    #balance_game_options
    def balance_game_options_select(self):
        sql = ''' select * from balance_game_options;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result

    #balance_game_responses
    def balance_game_responses_select(self, balance_game_options_id):
        sql = ''' select * from balance_game_responses where balance_game_options_id = %s;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (balance_game_options_id))
            result = cursor.fetchone()
        self.con.commit()
        return result

    def balance_game_responses_update(self, left, right, balance_game_options_id):
        sql = ''' update `balance_game_responses` set `left` = %s, `right` = %s where `balance_game_options_id` = %s;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (left, right, balance_game_options_id))
        self.con.commit() 

    def balance_game_responses_insert(self, left, right, balance_game_options_id):
        sql = ''' insert into balance_game_responses(`left`, `right`, `balance_game_options_id`) values (%s, %s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (left, right, balance_game_options_id))
        self.con.commit()

    #random_data
    def random_data_select(self):
        sql = ''' select * from random_data;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result    

    #random_letters
    def random_data_format_select(self):
        sql = ''' select * from random_data_format;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result    

    #emotions
    def emotions_select(self, characters_id):
        sql = ''' select * from emotions where characters_id = %s;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (characters_id))
            result = cursor.fetchone()
        self.con.commit()
        return result   

    # 시리즈 캐릭터별 대사수
    def series_speech_select(self, n):
        sql = ''' SELECT speech_has_characters.characters_id, COUNT(speech.speech) 
                    FROM speech
                    INNER JOIN speech_has_characters
                    ON speech.id = speech_has_characters.speech_id
                    GROUP BY speech_has_characters.characters_id
                    ORDER BY COUNT(speech.speech) DESC
                    LIMIT %s;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (n))
            result = cursor.fetchall()
        self.con.commit()
        return result     