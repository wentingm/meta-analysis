from flask_cors import CORS
from flask import Blueprint, request, render_template, redirect, url_for, session
import json
from api_client import fetch_data
from processor import process_data

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')
app.secret_key = '123456'

@app.route('/process_json', methods=['POST'])
def process_json():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract values from the JSON data
    population = data.get('population')
    intervention = data.get('intervention')
    comparison = data.get('comparison')
    outcome = data.get('outcome')
    
    # process and save the a json file in a folder
    raw_data = fetch_data(population, intervention, comparison, outcome)

    # Return a JSON response
    return jsonify(raw_data)


@app.route('/filters', methods=['POST'])
def filter_results():
    # Retrieve the processed data from the session
    processed_data_json = session.get('processed_data')
    if not processed_data_json:
        return redirect(url_for('main.display_results'))
    
    # Load the JSON string back into a Python object
    processed_data = json.loads(processed_data_json)
    
    # Initialize an empty list to store selected papers
    selected_papers = []
    
    # Iterate through each candidate paper's title
    for paper in processed_data:
        title = paper['title']  # Assuming 'title' is a key in your processed_data
        
        # Load the paper content from the database using the title
        if title in database_titlelist:
            paper_content = load_paper_content(title)
            
            # Process each candidate paper using the get_chatgpt_response function
            if get_chatgpt_response(paper_content):
                # If the paper meets the criteria, add its title to the selected_papers list
                selected_papers.append(title)
    
    # Render the filtered results in a template
    return render_template('filtered_results.html', selected_papers=selected_papers)


if __name__ == '__main__':
    app.run(debug=True)