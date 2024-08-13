import requests
import json

# save a papers.json file as return.

def fetch_data(population, intervention, comparison, outcome):
    # Construct the search query using the provided parameters
    query = f"{population} & {intervention} & {comparison} & {outcome}"
    
    # Specify which fields to retrieve from the API response
    fields = "url,title,year,authors,abstract,journal"

    # Build the full API URL for the Semantic Scholar bulk search
    url = f"http://api.semanticscholar.org/graph/v1/paper/search/bulk?query={query}&fields={fields}"
    
    # Make a GET request to the API and parse the JSON response into a dictionary
    r = requests.get(url).json()

    # Print the estimated number of documents that will be retrieved
    print(f"Will retrieve an estimated {r['total']} documents")
    
    # Initialize a counter to keep track of the number of papers retrieved
    retrieved = 0
    
    # List to hold all retrieved papers
    all_papers = []

    # Open a file named 'papers.json' in append mode to store retrieved papers
    with open("papers.json", "a") as file:
        while True:  # Start an infinite loop to fetch data in batches
            # Check if 'data' key exists in the response
            if "data" in r:
                # Increment the retrieved count by the number of papers in the current response
                retrieved += len(r["data"])
                print(f"Retrieved {retrieved} papers...")
                
                # Append each paper to the all_papers list and write to the file
                for paper in r["data"]:
                    all_papers.append(paper)
                    # Convert the paper dictionary to a JSON string and write it to the file
                    print(json.dumps(paper), file=file)
            
            # Check if a 'token' is present in the response for pagination
            if "token" not in r:
                break  # Exit the loop if there are no more results to fetch
            
            # Make a subsequent request using the token for pagination to get the next batch of results
            r = requests.get(f"{url}&token={r['token']}").json()

    # Print the total number of papers retrieved after the loop completes
    print(f"Done! Retrieved {retrieved} papers total")
    
    # Return the collected data as a JSON response
    return json.dumps(all_papers)
