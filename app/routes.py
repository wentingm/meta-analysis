from flask import Blueprint, request, render_template, redirect, url_for, jsonify
from app.api_client import fetch_data
from app.processor import process_data

main = Blueprint('main', __name__)

# Page 1: Form for retrieving four keywords from the user
@main.route('/', methods=['GET', 'POST'])
def get_keywords():
    if request.method == 'POST':
        # Extract keywords from the form
        population = request.form.get('population')
        intervention = request.form.get('intervention')
        comparison = request.form.get('comparison')
        outcome = request.form.get('outcome')
        
        # Redirect to the results page with the keywords as query parameters
        return redirect(url_for('main.display_results', kw1=population, kw2=intervention, kw3=comparison, kw4=outcome))
    
    # Render the form template
    return render_template('get_keywords.html')

# Page 2: Display the results from the API
@main.route('/results', methods=['GET'])
def display_results():
    # Retrieve the keywords from the query parameters
    population = request.args.get('kw1')
    intervention = request.args.get('kw2')
    comparison = request.args.get('kw3')
    outcome = request.args.get('kw4')
    
    # Fetch data using the API client (e.g., call an external API or ChatGPT)
    raw_data = fetch_data(population, intervention, comparison, outcome)
    
    # Process the retrieved data (if necessary)
    processed_data = process_data(raw_data)
    
    # Render the results in a template
    return render_template('display_results.html', data=processed_data)