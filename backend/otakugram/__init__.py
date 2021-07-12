from flask import Flask
from flask_cors import CORS, cross_origin
from flask_login import LoginManager
import mongoengine as db
from urllib.parse import quote

app=Flask(__name__)
cors = CORS(app)

app.config['SECRET_KEY'] = 'kdfhkd64q35e76@t53gjjs'

password="De@d1n$1de+mo"
database_name="otakugram-db"
DB_URI=f"mongodb+srv://pran01:{quote(password)}@otakugram.lhtxd.mongodb.net/{database_name}?retryWrites=true&w=majority"
db.connect(host=DB_URI)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

from otakugram import routes