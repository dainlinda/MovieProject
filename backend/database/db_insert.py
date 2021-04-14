import csv
from usedb import UseDB
db = UseDB()

# characters 데이터 삽입
with open('data/db data/characters.csv','r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        db.characters_insert(row[1])

# emotions 데이터 삽입
with open('data/db data/emotions.csv','r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        for each in db.characters_select():
            if row[1] == each[1]: # emotions.csv 파일 이름이 characters db 이름과 일치하면
                db.emotions_insert(row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],each[0])

# speech 데이터 삽입
with open('data/db data/speech.csv','r', encoding="utf-8") as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        db.speech_insert(row[1],row[2])

# spells 데이터 삽입
with open('data/db data/spells.csv','r') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        db.spells_insert(row[1],row[2],row[3])

# random_data 데이터 삽입
with open('data/db data/random_data.csv','r', encoding="utf-8") as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        db.random_data_insert(row[0],row[1])

db.db_free()