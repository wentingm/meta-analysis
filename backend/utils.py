from db_connection import get_db_connection

# get_paper_content_from_db()
def get_paper_content_from_db(title):
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Query to fetch the paper content based on title
            query = """
            SELECT paperContent
            FROM paperAnalysis
            WHERE paper_title = ?
            """
            cursor.execute(query, (title,))
            result = cursor.fetchone()

            if result:
                # Return the paper content directly
                return result[0]
            else:
                print("Paper not found")
                return None

        except Exception as e:
            print("An error occurred while fetching the paper content:", e)
            return None

        finally:
            conn.close()
    else:
        print("Database connection failed")
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