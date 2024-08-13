import os

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    DATABASE_URI = os.getenv('DATABASE_URI')
    DEBUG = True