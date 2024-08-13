from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile('../config.py')
CORS(app)
# Import and register the routes
from app.routes import main as main_blueprint
app.register_blueprint(main_blueprint)

# Other setup code...

# Import your API client and processor modules
from app import api_client, chatgpt_client