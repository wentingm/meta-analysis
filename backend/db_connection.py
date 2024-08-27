

import os
import pyodbc
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Function to establish a database connection
def get_db_connection():
    try:
        # Fetch connection details from environment variables
        server = os.getenv('AZURE_SQL_SERVER')
        database = os.getenv('AZURE_SQL_DATABASE')
        username = os.getenv('AZURE_SQL_USERNAME')
        password = os.getenv('AZURE_SQL_PASSWORD')

        # Define the connection string
        connection_string = (
            'DRIVER={ODBC Driver 18 for SQL Server};'
            f'SERVER={server};'
            f'DATABASE={database};'
            f'UID={username};'
            f'PWD={password};'
            'Encrypt=yes;'
            'TrustServerCertificate=no;'
            'Connection Timeout=30;'
        )

        # Establish connection
        conn = pyodbc.connect(connection_string)
        print("Connection successful!")
        return conn

    except pyodbc.Error as e:
        print("Error in connection:", e)
        return None
