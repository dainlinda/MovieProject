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
    def characters_insert(self, name, house, loyalty, blood_status):
        sql = ''' insert into characters(name, house, loyalty, blood_status)
              values(%s, %s, %s,%s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (name, house, loyalty, blood_status))
        self.con.commit()
    def characters_select(self):
        sql = ''' select * from characters;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result
    #speech
    def speech_insert(self, character,speech):
        sql = ''' insert into speech(`character`,`speech`)
              values(%s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (character,speech))
        self.con.commit()
    def speech_has_characters_insert(self,speech_id,characters_id):
        sql = ''' insert into speech_has_characters(speech_id,characters_id)
              values(%s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (speech_id,characters_id))
        self.con.commit()
    #emotions
    def emotions_insert(self, anger,anticipation,disgust,fear,joy,sadness,surprise,trust,characters_id):
        sql = ''' insert into emotions(anger,anticipation,disgust,fear,joy,sadness,surprise,trust,characters_id)
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
    def spells_has_characters_insert(self,spells_id,characters_id):
        sql = ''' insert into spells_has_characters(spells_id,characters_id)
              values(%s, %s);  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql, (spells_id,characters_id))
        self.con.commit()
    #balance_game_options
    def balance_game_options_select(self):
        sql = ''' select * from balance_game_options;  '''
        with self.con.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchall()
        self.con.commit()
        return result
    #random_data
    def random_data_select(self):
        sql = ''' select * from random_data;  '''
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


if __name__ == "__main__":
    db = UseDB()
    db.characters_insert('harry', 'griffindore','deatheater', 'muggle', 1, 'null')
    db.db_free()