import sqlite3

def get_paper_content_from_db(title):
    # Connect to the SQLite database (replace 'database.db' with your database name)
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Execute the query to check if the title exists and retrieve the full text
    cursor.execute("SELECT full_text FROM papers WHERE title = ?", (title,))
    result = cursor.fetchone()
    
    # Close the database connection
    conn.close()
    
    # If the title exists, return the full text, otherwise return None
    if result:
        return result[0]  # Assuming full_text is in the first column
    else:
        return None
    
def check_paper_title_in_database(title):
    return 0

def extract_pdf_link(paper):
    link = paper.get('openAccessPdf', None)
    if link:
        pdf_weblink = link.get('url', None)
    else:
        pdf_weblink = None
    return pdf_weblink