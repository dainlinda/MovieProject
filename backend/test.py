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
# result = db.random_data_select()
# character = result[random.randint(1,52)]
# place = result[random.randint(53,92)]
# food = result[random.randint(93,112)]
# creature = result[random.randint(113,126)]
# item = result[random.randint(127,186)]
# jsonify(character = character, place = place, food = food, creature = creature, item = item)

#정서 분석
# result = db.random_data_format_select()
# rand_num = random.randint(1,6)
# print(result[rand_num][1])

result = db.balance_game_responses_select(1)
left = result[1]+0
right = result[2]+1
db.balance_game_responses_update(left,right,1)
msg = 'left: {left}, right: {right}'.format(left=left, right = right)
print(msg)