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

from flask_cors import CORS

app = Flask(__name__)
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
# 2-1. 캐릭터별 대사수 api
# 2-2. 시리즈별 주문빈도수 api

## 3. 해리 포터 캐릭터 분석 페이지
# 3-0. 캐릭터이름 아이디 이미지 api
# 3-1. 워드클라우드 api
# 3-2. 캐릭터별 마법주문 빈도 api
# 3-3. 캐릭터별 정서 api
class Emotions(Resource):
    @swag_from("swagger_config/emotions.yml")
    def get(self,characters_id=None):
        result = db.emotions_select(characters_id)

        return jsonify(characters_id = result[9], 
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
api.add_resource(Emotions, '/characters/<characters_id>/emotions')

## 4. 죽음을 먹는 자들 테스트 api => 프론트엔드에서 처리하기로 함

## 5. 해리 포터 밸런스 게임 페이지 api
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
        result = db.balance_game_responses_select(balance_game_options_id)
        left = result[1]
        right = result[2]
        total = left+right
        if total == 0:
            return jsonify(balance_game_options_id = balance_game_options_id, left = 0, right = 0)
        else:
            return jsonify(balance_game_options_id = balance_game_options_id, left = left/total*100, right = right/total*100)
    @swag_from("swagger_config/balance_game_options_post.yml")
    def post(self, balance_game_options_id=None):
        args = parser.parse_args()
        msg = ''
        result = db.balance_game_responses_select(balance_game_options_id)
        left = result[1]+int(args['left'])
        right = result[2]+int(args['right'])
        db.balance_game_responses_update(left,right,balance_game_options_id)
        msg = 'balance_game_options_id: {balance_game_options_id}, left: {left}, right: {right}'.format(balance_game_options_id = balance_game_options_id, left=left, right = right)
        return jsonify(msg = msg)
api.add_resource(BalanceGameResponses, '/games/balance/response/<balance_game_options_id>')



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, threaded=False)