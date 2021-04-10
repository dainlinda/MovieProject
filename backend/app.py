from flask import Flask 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

'''
# sqlAlchemy 관련 코드
# config.py 설정파일
app.config.from_object('config')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'flasknotewithsqlalchemy'
db = SQLAlchemy(app)
'''

# from app import views, models

@app.route('/') 
def hello(): 
    return 'Hello, World!'

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, threaded=False)