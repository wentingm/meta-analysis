import os

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    DEBUG = True
    TENANT_NAME = os.environ.get("TENANT_NAME")
    CLIENT_ID = os.environ.get("CLIENT_ID")
    CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
    B2C_POLICY_NAME = os.environ.get("B2C_POLICY_NAME")
    REDIRECT_URI = os.environ.get("REDIRECT_URI", "http://localhost:5000/getAToken")
    AUTHORITY_HOST_URI = f'https://{TENANT_NAME}.b2clogin.com'
    AUTHORITY = f'{AUTHORITY_HOST_URI}/{TENANT_NAME}.onmicrosoft.com/{B2C_POLICY_NAME}'

    # Flask session key
    FLASK_SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'your-flask-secret-key')