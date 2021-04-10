from usedb import UseDB
db = UseDB()

result = db.balance_game_options_select()
options = []
for row in result:
    options.append({'id': row[0], 'option': row[1], 'image': row[2]})

print({'options': options})