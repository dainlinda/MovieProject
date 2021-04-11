import random
from flask import Flask, request, jsonify

# Flasgger
from flasgger import Swagger
from flasgger.utils import swag_from
from flask_restful import Api, Resource
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
# 밸런스 게임 문제 api
class BalanceGameOptions(Resource):
    @swag_from("swagger_config/balance_game_options.yml")
    def get(self):
        result = db.balance_game_options_select()
        options = []
        for row in result:
            options.append({'id': row[0], 'option': row[1], 'image': row[2]})
        return jsonify(options = options)

api.add_resource(BalanceGameOptions, '/games/balance/option')

# 랜덤 데이터 api
class RandomData(Resource):
    @swag_from("swagger_config/random_data.yml")
    def get(self):
        result = db.random_data_select()

        character = result[random.randint(1,52)][2].strip()
        place = result[random.randint(53,92)][2].strip()
        food = result[random.randint(93,112)][2].strip()
        creature = result[random.randint(113,126)][2].strip()
        item = result[random.randint(127,186)][2].strip()

        return jsonify(character = character, place = place, food = food, creature = creature, item = item)

api.add_resource(RandomData, '/letters/random/data')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, threaded=False)