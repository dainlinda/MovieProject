from usedb import UseDB
import random
db = UseDB()

#밸겜
# result = db.balance_game_options_select()
# options = []
# for row in result:
#     options.append({'id': row[0], 'option': row[1], 'image': row[2]})

# print({'options': options})

#랜덤데이터
result = db.random_data_select()
character = result[random.randint(1,52)]
place = result[random.randint(53,92)]
food = result[random.randint(93,112)]
creature = result[random.randint(113,126)]
item = result[random.randint(127,186)]
jsonify(character = character, place = place, food = food, creature = creature, item = item)