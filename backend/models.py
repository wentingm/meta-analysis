from app import db

class YourModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Define other fields...