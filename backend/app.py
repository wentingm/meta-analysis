from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import os
from api_client import fetch_data
# from chatgpt_client import get_chatgpt_response
from utils import get_paper_content_from_db
from werkzeug.utils import secure_filename
from db_connection import get_db_connection
from pdf_utils import extract_pdf_metadata
from utils import get_paper_content_from_db  
from paper_processing import process_paper_and_store_responses
from document import Document 
import pandas as pd # Importing Document class if it includes response data handling
from dotenv import load_dotenv
import requests



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

# # Route to filter results from the processed data
# @app.route('/filters', methods=['POST', 'GET'])
# def filter_results():
#     # Retrieve the processed data from the incoming JSON file
#     processed_data = request.get_json()
#     if not processed_data:
#         return jsonify({"error": "No data provided"}), 400

#     OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    
#     # Initialize an empty list to store selected papers
#     selected_papers = []
    
#     # Iterate through each candidate paper's title
#     for paper in processed_data:
#         title = paper.get('title')  # Assuming 'title' is a key in your processed_data
#         population = paper.get('population')
#         intervention = paper.get('intervention')
#         comparison = paper.get('comparison')
#         outcome = paper.get('outcome')
#         # Load the paper content from the SQLite database using the title
#         paper_content = get_paper_content_from_db(title)
        
#         # If the paper content is found, process it
#         if paper_content:
#             if get_chatgpt_response(paper_content, OPENAI_API_KEY, population, intervention, comparison, outcome):
#                 # If the paper meets the criteria, add its title to the selected_papers list
#                 selected_papers.append(title)
    
#     # Return the filtered results as a JSON response
#     return jsonify(selected_papers)


@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    # Check if a file is part of the POST request
    
    if 'pdf' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['pdf']
    print(file)
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
                print("data base connected")

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
    

# @app.route('/generate-excel', methods=['POST'])
# def generate_excel():
#     print("Method started")
#     processed_data = request.get_json()
#     if not processed_data:
#         return jsonify({"error": "No data provided"}), 400

#     OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
#     responses = []
#     print(OPENAI_API_KEY)

#     for paper in processed_data:
#         title = paper.get('title')  # Assuming 'title' is a key in your processed_data
#         paper_content = get_paper_content_from_db(title)
#         #print(paper_content)

#         # Ensure paper_content is a string
#         if isinstance(paper_content, bytes):
#             paper_content = paper_content.decode('utf-8')  # Decode if it's in bytes
#             print("Inside If")
#         elif not isinstance(paper_content, str):
#             return jsonify({"error": f"Invalid paper content type for {title}. Expected string."}), 400

#         # Generate responses based on the paper content

#         paper_responses = process_paper_and_store_responses(paper_content, OPENAI_API_KEY)
#         responses.extend(paper_responses)  # assuming this returns a list of dictionaries
#         print("after responses")

#     # Create a DataFrame from the responses
#     df = pd.DataFrame(responses)

#     # Path where the Excel file will be saved
#     excel_path = '/Users/anoopreddykunta/Desktop/responses.xlsx'
#     # Write DataFrame to an Excel file
#     df.to_excel(excel_path, index=False)

#     # Check if file exists and return it
#     if os.path.exists(excel_path):
#         return send_file(excel_path, as_attachment=True, download_name='ResponsesReport.xlsx')
#     elif not os.path.exists(excel_path):
#         os.makedirs(excel_path)
  
    
# @app.route('/calculation', methods=['POST'])
# def calculate():
#     # Retrieve the processed data from the incoming JSON file
#     processed_data = request.get_json()
#     if not processed_data:
#         return jsonify({"error": "No data provided"}), 400

#     # Fetch the OpenAI API key from environment variables
#     OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    
#     # Initialize an empty list to store results for each paper
#     results = []
    
#     # Iterate through each candidate paper's title
#     for paper in processed_data:
#         title = paper.get('title')  # Assuming 'title' is a key in your processed_data
        
#         # Load the paper content from the database using the title
#         paper_content = get_paper_content_from_db(title)
#         print(type(paper_content))
        
#         # Ensure paper_content is a string
#         if isinstance(paper_content, bytes):
#             paper_content = paper_content.decode('utf-8')  # Decode if it's in bytes
#         elif not isinstance(paper_content, str):
#             return jsonify({"error": f"Invalid paper content type for {title}. Expected string."}), 400
        
#         # If the paper content is found, process it
#         if paper_content:
#             # Call the GPT function with the paper content and get the responses
#             responses = process_paper_and_store_responses(paper_content, OPENAI_API_KEY)
            
#             # Create a structured result dictionary for this paper
#             paper_result = {
#                 "title": title,
#                 "responses": responses
#             }
            
#             # Append the result to the results list
#             results.append(paper_result)

#     # Return the collected results as a JSON response
#     return jsonify({
#         "message": "Calculation completed",
#         "papers": results
#     })


from flask import Flask, jsonify, request
import requests
import urllib.parse

app = Flask(__name__)

@app.route('/getpapers', methods=['GET'])
def fetch_data():
    # Extract query parameters from the request
    population = request.args.get('population', default="", type=str)
    intervention = request.args.get('intervention', default="", type=str)
    comparison = request.args.get('comparison', default="", type=str)
    outcome = request.args.get('outcome', default="", type=str)
    
    # Construct and encode the search query
    query = f"{population}, {intervention}, {comparison}, {outcome}"
    encoded_query = urllib.parse.quote(query)

    # Specify which fields to retrieve from the API response
    fields = "url,title,year,authors,abstract,journal,openAccessPdf"

    # Build the API URL for Semantic Scholar bulk search
    base_url = "https://api.semanticscholar.org/graph/v1/paper/search/bulk"
    url = f"{base_url}?query={encoded_query}&fields={fields}"
    
    try:
        # Make initial request to retrieve data
        response = requests.get(url)
        response.raise_for_status()
        r = response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to retrieve data from Semantic Scholar", "details": str(e)}), 500

    # Initialize counters and storage for retrieved papers
    retrieved = 0
    all_papers = []
    
    # Loop to retrieve data in batches
    while True:
        # Check if 'data' key exists in the response
        if "data" in r:
            retrieved += len(r["data"])
            print(f"Retrieved {retrieved} papers...")
                
            # Append each paper to the all_papers list
            for paper in r["data"]:
                all_papers.append(paper)
        
        # Check for pagination token and stop if none exists
        token = r.get("token")
        if not token or retrieved >= 10000:
            break
        
        # Construct the next request URL with token for pagination
        next_url = f"{base_url}?query={encoded_query}&fields={fields}&token={token}"
        try:
            response = requests.get(next_url)
            response.raise_for_status()
            r = response.json()
        except requests.exceptions.RequestException as e:
            return jsonify({"error": "Failed to retrieve additional pages", "details": str(e)}), 500

    print(f"Done! Retrieved {retrieved} papers total")
    
    # Return all papers as a JSON response
    return jsonify(all_papers)

# To run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)



if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000 )