import csv
from usedb import UseDB
db = UseDB()

# # characters 데이터 삽입
# with open('data/db data/characters.csv','r') as file:
#     csvreader = csv.reader(file)
#     for row in csvreader:
#         db.characters_insert(row[1], row[2], row[3], row[4])

# # emotions 데이터 삽입
# with open('data/db data/emotions.csv','r') as file:
#     csvreader = csv.reader(file)
#     for row in csvreader:
#         for each in db.characters_select():
#             if row[1] == each[1]: # emotions.csv 파일 이름이 characters db 이름과 일치하면
#                 db.emotions_insert(row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],each[0])

# # speech 데이터 삽입
with open('data/db data/speech.csv','r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        db.speech_insert(row[1],row[2])

# spell 데이터 삽입
with open('sangmin/spells.csv','r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        db.spells_insert(row[1],row[2],row[3])

# # speech_has_characters 테이블 데이터 삽입 sql 문
# INSERT INTO speech_has_characters(speech_id, characters_id)
# SELECT speech.id as speech_id, characters.id as characters_id FROM `speech` INNER JOIN `characters` ON characters.name = speech.character
# ALTER TABLE `speech` DROP COLUMN `character`;

# # spells_has_characters 테이블 데이터 삽입 sql 문
# insert into spells_has_characters(spells_id, characters_id) select spells.id as spells_id, characters.id as characters_id from spells inner join characters on characters.name = spells.character;
# ALTER TABLE `spells` DROP COLUMN `character`;

db.db_free()