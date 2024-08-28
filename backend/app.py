from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from flask_cors import CORS
import json
from api_client import fetch_data
from chatgpt_client import get_chatgpt_response
from utils import get_paper_content_from_db
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)

# Initialize the SQLAlchemy database connection
# db = SQLAlchemy(app)
# from models import YourModel

# Route to process JSON data sent from the frontend
@app.route('/process_json', methods=['POST'])
def process_json():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract values from the JSON data
    population = data.get('population')
    intervention = data.get('intervention')
    comparison = data.get('comparison')
    outcome = data.get('outcome')
    
    # Process and save the data
    raw_data = fetch_data(population, intervention, comparison, outcome)

    # Return a JSON response
    return jsonify(raw_data)

# Route to filter results from the processed data
@app.route('/filters', methods=['POST'])
def filter_results():
    # Retrieve the processed data from the incoming JSON file
    processed_data = request.get_json()
    if not processed_data:
        return jsonify({"error": "No data provided"}), 400

    # Initialize an empty list to store selected papers
    selected_papers = []
    
    # Iterate through each candidate paper's title
    for paper in processed_data:
        title = paper.get('title')  # Assuming 'title' is a key in your processed_data
        
        # Load the paper content from the SQLite database using the title
        paper_content = get_paper_content_from_db(title)
        
        # If the paper content is found, process it
        if paper_content:
            if get_chatgpt_response(paper_content):
                # If the paper meets the criteria, add its title to the selected_papers list
                selected_papers.append(title)
    
    # Return the filtered results as a JSON response
    return jsonify(selected_papers)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000 )