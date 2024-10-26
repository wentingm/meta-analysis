
import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
import json
import gc


from document import Document  # Importing Document class from document.py

def process_paper_and_store_responses(paper_content, OPENAI_API_KEY):
    print("Starting response storage")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    if not isinstance(paper_content, str):
        raise TypeError("The 'paper_content' parameter must be a string.")

    document = Document(page_content=paper_content, metadata={})
    split_docs = text_splitter.split_documents([document])

    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY, model="text-embedding-3-small")
    vectorstore = Chroma.from_documents(split_docs, embeddings)

    system_prompt = """
    You are an autoregressive language model that accurately answers questions about scientific papers.
    You must respond in strict JSON format as follows:
    {{
        "response": "string",
        "confidence": number
    }}
    """

    llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-4-0613")
    llm_chain = LLMChain(llm=llm, prompt=PromptTemplate(input_variables=["question", "input_documents"], template=system_prompt + "\n\n{input_documents}\n\n{question}"))

    custom_prompts = [
        "What is the total number of participants in the study?",
        "What is the group mean of the pre-test?",
        "What is the standard deviation?",
        "What is the number of participants in the experiment group for pre-test?",
        "What is the experiment group mean of the post-test?"
    ]

    prompt_responses = []
    for question in custom_prompts:
        try:
            retrieval_docs = vectorstore.similarity_search(question, 10)
            input_docs_text = "\n".join([doc.page_content for doc in retrieval_docs])

            response = llm_chain.run(question=question, input_documents=input_docs_text).strip()
            response_data = json.loads(response)

            prompt_responses.append({
                "Question": question,
                "Response": response_data.get("response", "No response"),
                "Confidence": response_data.get("confidence", 0)
            })

        except Exception as e:
            print(f"An error occurred: {e}")
            prompt_responses.append({
                "Question": question,
                "Response": "Error processing question",
                "Confidence": 0
            })

    df = pd.DataFrame(prompt_responses)
    df.to_excel('responses.xlsx', index=False, engine='openpyxl')

    del llm, vectorstore, llm_chain
    gc.collect()
    print("Responses collected and stored in Excel")
    return prompt_responses

# Usage example



