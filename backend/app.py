from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from api_client import fetch_data
from chatgpt_client import get_chatgpt_response
from utils import get_paper_content_from_db
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy
from config import Config
from werkzeug.utils import secure_filename
from db_connection import get_db_connection
from pdf_utils import extract_pdf_metadata


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

    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    
    # Initialize an empty list to store selected papers
    selected_papers = []
    
    # Iterate through each candidate paper's title
    for paper in processed_data:
        title = paper.get('title')  # Assuming 'title' is a key in your processed_data
        population = paper.get('population')
        intervention = paper.get('intervention')
        comparison = paper.get('comparison')
        outcome = paper.get('outcome')
        # Load the paper content from the SQLite database using the title
        paper_content = get_paper_content_from_db(title)
        
        # If the paper content is found, process it
        if paper_content:
            if get_chatgpt_response(paper_content, OPENAI_API_KEY, population, intervention, comparison, outcome):
                # If the paper meets the criteria, add its title to the selected_papers list
                selected_papers.append(title)
    
    # Return the filtered results as a JSON response
    return jsonify(selected_papers)


@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    # Check if a file is part of the POST request
    if 'pdf' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['pdf']

    # Ensure the file is a PDF
    if file.filename == '' or not file.filename.endswith('.pdf'):
        return jsonify({"error": "Invalid file type, must be a PDF"}), 400

    # Save the uploaded PDF file
    filename = secure_filename(file.filename)
    filepath = os.path.join('uploads', filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    file.save(filepath)

    # Extract metadata and content from the PDF
    text_content, metadata = extract_pdf_metadata(filepath)

    # Store the metadata and content in the database
    if metadata or text_content:
        conn = get_db_connection()
        if conn:
            try:
                cursor = conn.cursor()
                insert_query = """
                INSERT INTO paperAnalysis (paper_title, metadata, paperContent)
                VALUES (?, ?, ?)
                """
                cursor.execute(insert_query, (metadata.get('/Title', 'Untitled'), str(metadata), text_content))
                conn.commit()

                # Return the full metadata as part of the JSON response
                return jsonify({
                    "message": "Metadata and content extracted and stored successfully!",
                    "metadata": metadata,
                    "content_snippet": text_content[:]  # Return the full content
                }), 200
            except Exception as e:
                print("An error occurred while inserting data:", e)
                return jsonify({"error": "Failed to store metadata and content"}), 500
            finally:
                conn.close()
        else:
            return jsonify({"error": "Database connection failed"}), 500
    else:
        return jsonify({"error": "No metadata or content found in PDF"}), 400
    

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000 )