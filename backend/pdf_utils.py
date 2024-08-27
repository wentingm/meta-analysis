

import PyPDF2

# Function to extract metadata and text content from a PDF file
def extract_pdf_metadata(pdf_file_path):
    text = ""
    with open(pdf_file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        # Check if the PDF is encrypted
        if pdf_reader.is_encrypted:
            # Attempt to decrypt the PDF with an empty password or a known password
            try:
                pdf_reader.decrypt('')
            except Exception as e:
                print(f"Failed to decrypt the PDF: {e}")
                return "", {}
        
        try:
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
        except Exception as e:
            print(f"An error occurred while reading the PDF: {e}")
            return "", {}
        
        metadata = pdf_reader.metadata
        return text, metadata if metadata else {}
