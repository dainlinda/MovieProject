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
# print(db.spells_all_series_select())
print(db.spells_series_select(1))

series_dict = {
	1: "해리 포터와 마법사의 돌",
	2: "해리 포터와 비밀의 방",
	3: "해리 포터와 아즈카반의 죄수",
	4: "해리 포터와 불의 잔",
	5: "해리 포터와 불사조 기사단",
	6: "해리 포터와 혼혈 왕자",
	7: "해리 포터와 죽음의 성물"
}

print(type(series_dict[1]))