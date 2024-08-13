# from flask import Blueprint, request, render_template, redirect, url_for, session
# import json
# from app.api_client import fetch_data
# from app.processor import process_data
# from flask_cors import CORS

# main = Blueprint('main', __name__)

# app.secret_key = "123456"

# @main.route('/process_json', methods=['POST'])
# def process_json():
#     # Get the JSON data from the request
#     data = request.get_json()

#     # Extract values from the JSON data
#     population = data.get('population')
#     intervention = data.get('intervention')
#     comparison = data.get('comparison')
#     outcome = data.get('outcome')
    
#     # process and save the a json file in a folder
#     raw_data = fetch_data(population, intervention, comparison, outcome)

#     # Return a JSON response
#     return raw_data


# # # Page 1: Form for retrieving four keywords from the user
# # @main.route('/', methods=['GET', 'POST'])
# # def get_keywords():
# #     if request.method == 'POST':
# #         # Extract keywords from the form
# #         population = request.form.get('population')
# #         intervention = request.form.get('intervention')
# #         comparison = request.form.get('comparison')
# #         outcome = request.form.get('outcome')
        
# #         # Store the keywords in the session
# #         session['keywords'] = {
# #             'population': population,
# #             'intervention': intervention,
# #             'comparison': comparison,
# #             'outcome': outcome
# #         }
        
# #         # Redirect to the results page
# #         return redirect(url_for('main.display_results'))
    
# #     # Render the form template
# #     return render_template('get_keywords.html')

# # Page 2: Display the results from the API
# # @main.route('/results', methods=['GET'])
# # def display_results():
# #     # Retrieve the keywords from the session
# #     keywords = session.get('keywords')
# #     if not keywords:
# #         return redirect(url_for('main.get_keywords'))
    
# #     # Fetch data using the API client
# #     raw_data = fetch_data(
# #         keywords['population'],
# #         keywords['intervention'],
# #         keywords['comparison'],
# #         keywords['outcome']
# #     )
    
# #     # Process the retrieved data
# #     processed_data = process_data(raw_data)
    
# #     # Store the processed data in the session as a JSON string
# #     session['processed_data'] = json.dumps(processed_data)
    
# #     # Render the results in a template
# #     return render_template('display_results.html', data=processed_data)

# # Page 3: Filter the results from the API
# @main.route('/filters', methods=['GET'])
# def filter_results():
#     # Retrieve the processed data from the session
#     processed_data_json = session.get('processed_data')
#     if not processed_data_json:
#         return redirect(url_for('main.display_results'))
    
#     # Load the JSON string back into a Python object
#     processed_data = json.loads(processed_data_json)
    
#     # Initialize an empty list to store selected papers
#     selected_papers = []
    
#     # Iterate through each candidate paper's title
#     for paper in processed_data:
#         title = paper['title']  # Assuming 'title' is a key in your processed_data
        
#         # Load the paper content from the database using the title
#         if title in database_titlelist:
#             paper_content = load_paper_content(title)
            
#             # Process each candidate paper using the get_chatgpt_response function
#             if get_chatgpt_response(paper_content):
#                 # If the paper meets the criteria, add its title to the selected_papers list
#                 selected_papers.append(title)
    
#     # Render the filtered results in a template
#     return render_template('filtered_results.html', selected_papers=selected_papers)
