import random
from flask import Flask, request, jsonify

# Flasgger
from flasgger import Swagger
from flasgger.utils import swag_from
from flask_restful import reqparse, Api, Resource
from flasgger import LazyString, LazyJSONEncoder

# DB
from usedb import UseDB
db = UseDB()

#flask_cors 사용
from flask_cors import CORS, cross_origin

app = Flask(__name__)

#flask_cors 사용
CORS(app)

# Flasgger
app.config["SWAGGER"] = {"title": "Swagger-UI", "uiversion": 2}

swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec_1",
            "route": "/apispec_1.json",
            "rule_filter": lambda rule: True,  # all in
            "model_filter": lambda tag: True,  # all in
        }
    ],
    "static_url_path": "/flasgger_static",
    # "static_folder": "static",  # must be set by user
    "swagger_ui": True,
    "specs_route": "/swagger/",
}

template = dict(
    swaggerUiPrefix=LazyString(lambda: request.environ.get("HTTP_X_SCRIPT_NAME", ""))
)

app.json_encoder = LazyJSONEncoder
api = Api(app)
swagger = Swagger(app, config=swagger_config, template=template)

#------------------------------------------------------------------------
## 1. 메인 페이지 랜덤편지 & 6. 랜덤 소설 페이지 
# api 사용되는 랜덤 데이터 함수
def random_data():
    result = db.random_data_select()
    character1 = result[random.randint(0,51)][2].strip()
    character2 = result[random.randint(0,51)][2].strip()
    place = result[random.randint(52,91)][2].strip()
    food = result[random.randint(92,111)][2].strip()
    creature = result[random.randint(112,125)][2].strip()
    spell = result[random.randint(126,161)][2].strip()
    item = result[random.randint(162,185)][2].strip()
    return character1, character2, place, food, creature, spell, item
# 랜덤 편지 api
class RandomLetters(Resource):
    @swag_from("swagger_config/random_letters.yml")
    def get(self):
        character1, character2, place, food, creature, spell, item = random_data()
        result = db.random_data_format_select()[0][1]
        letter = result.format(character1 = character1, character2 = character2, place = place, food = food, creature = creature, spell = spell, item = item)
        return jsonify(letter = letter)
api.add_resource(RandomLetters, '/random/letters')
# 랜덤 소설 api
class RandomNovels(Resource):
    @swag_from("swagger_config/random_novels.yml")
    def get(self):
        character1, character2, place, food, creature, spell, item = random_data()
        rand_num = random.randint(1,6)
        result = db.random_data_format_select()[rand_num][1]
        novel = result.format(character1 = character1, character2 = character2, place = place, food = food, creature = creature, spell=spell, item = item)
        return jsonify(novel = novel)
api.add_resource(RandomNovels, '/random/novels')


## 2. 해리 포터 시리즈 분석 페이지
# api 사용되는 캐릭터 이름 뽑아오기 함수
def character_name(id):
    character_name = db.characters_name_select(id)[0]
    return character_name
# 2-1. 시리즈 캐릭터별 대사수 api
class Series_speech(Resource):
    @swag_from("swagger_config/series_speech.yml")
    def get(self):
        top20 = []
        top4 = []
        for row in db.series_speech_select(20):
            top20.append({'characters_id': row[0],'character_name': character_name(row[0]),'speech_count': row[1]})
        for row in db.series_speech_select(4):
            top4.append({'characters_id': row[0],'character_name': character_name(row[0])})
        return jsonify(top20 = top20, top4 = top4)
api.add_resource(Series_speech, '/series/speech')
# 시리즈 별 영화 제목 딕셔너리
series_dict = {
    1: "해리 포터와 마법사의 돌",
    2: "해리 포터와 비밀의 방",
    3: "해리 포터와 아즈카반의 죄수",
    4: "해리 포터와 불의 잔",
    5: "해리 포터와 불사조 기사단",
    6: "해리 포터와 혼혈 왕자",
    7: "해리 포터와 죽음의 성물"
}
# 2-2. 전체 시리즈 및 시리즈별 주문빈도수 api
class Series_spell(Resource):
    @swag_from("swagger_config/series_spell.yml")
    def get(self):

        all_series = {}
        # ----
        series = []
        each_series = {}
        spell = {}
        for all in db.spells_all_series_select():
            all_series[all[0]] = all[1]
        for i in range(1,8):
            each_series["title"] = series_dict[i], 
            for row in db.spells_series_select(i):
                spell[row[1]] = row[2]
            each_series["spell"] = spell
            series.append(each_series)
            spell = {}
            each_series = {}
        return jsonify(all_series = all_series, series = series)
api.add_resource(Series_spell, '/series/spell')

## 3. 해리 포터 캐릭터 분석 페이지
# 3-1. 캐러셀 캐릭터 api (id, 이름, 이미지)
class Characters(Resource):
    @swag_from("swagger_config/characters.yml")
    def get(self):
        characters = []
        for row in db.series_speech_select(30):
            if db.spells_search_hasid(row[0]) != None and row[0] != 'Alastor Moody':
                characters.append({'id': row[0], 'name': character_name(row[0]), 'image': character_name(row[0]).replace(" ","") + '.png'}) 
        return jsonify(characters = characters)
api.add_resource(Characters, '/characters')

# 3-2번 페이지 정보 받아오는 api
class Characters_info(Resource):
    @swag_from("swagger_config/characters_info.yml")
    def get(self,characters_id=None):
        # 3-1. 워드클라우드 API
        # 3-2. 캐릭터별 마법주문 빈도 api
        result = db.spells_character_select(characters_id)
        spells = {}
        for row in result:
            spells[row[1]] = row[2]
        # 3-3. 캐릭터별 정서 api
        result = db.emotions_select(characters_id)

        return jsonify(id = characters_id, 
        name = character_name(characters_id),
        wordcloud = character_name(characters_id).replace(" ","") + 'Wordcloud.png',
        spells = spells,
        emotions={"anger":result[1], 
                   "fear": result[2], 
                    "anticipation": result[3],
                    "trust": result[4],
                    "surprise": result[5],
                    "sadness": result[6],
                    "joy": result[7],
                    "disgust": result[8]
                  },
        max_emotion = max(result[1:9]),
        min_emotion = min(result[1:9]))
api.add_resource(Characters_info, '/characters/<characters_id>/info')

## 4. 죽음을 먹는 자들 테스트 api => 프론트엔드에서 처리하기로 함
## 5. 해리 포터 밸런스 게임 페이지 api ->프론트엔드 이상없음
# 밸런스 게임 문제 api 
class BalanceGameOptions(Resource):
    @swag_from("swagger_config/balance_game_options.yml")
    def get(self):
        result = db.balance_game_options_select()
        options = []
        for row in result:
            options.append({'id': row[0], 'option1': row[1].split(' vs ')[0], 'option2': row[1].split(' vs ')[1] })
        return jsonify(options = options)
api.add_resource(BalanceGameOptions, '/games/balance/option')
# 밸런스 게임 응답 api 
parser = reqparse.RequestParser()
parser.add_argument('left')
parser.add_argument('right')
class BalanceGameResponses(Resource):
    @swag_from("swagger_config/balance_game_options_get.yml")
    def get(self, balance_game_options_id=None):
        try: # id가 sql문 안에 없으면(balance_game_options_id) sql insert해주기
            result = db.balance_game_responses_select(balance_game_options_id)
            left = result[1]
            right = result[2]
            total = left+right
            return jsonify(balance_game_options_id = balance_game_options_id, left = round(left/total*100), right = round(right/total*100))
        except:
            try:
                db.balance_game_responses_insert(0, 0, balance_game_options_id)      
                return jsonify(balance_game_options_id = balance_game_options_id, left = 0, right = 0)
            except:
                return('{i}번에 해당하는 밸런스 게임 문제가 없는 거 같아요! 다시 확인해주세요!'.format(i=balance_game_options_id))
    @swag_from("swagger_config/balance_game_options_post.yml")
    def post(self, balance_game_options_id=None):
        args = parser.parse_args()
        msg = ''
        try: # id가 sql문 안에 없으면(balance_game_options_id) sql insert해주기
            result = db.balance_game_responses_select(balance_game_options_id)
        except:
            db.balance_game_responses_insert(0, 0, balance_game_options_id)   
            result = db.balance_game_responses_select(balance_game_options_id)
        left = result[1]+int(args['left'])
        right = result[2]+int(args['right'])
        total = left+right
        db.balance_game_responses_update(left,right,balance_game_options_id)
        return jsonify(balance_game_options_id = balance_game_options_id, left = round(left/total*100), right = round(right/total*100))
api.add_resource(BalanceGameResponses, '/games/balance/response/<balance_game_options_id>')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, threaded=False)