from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import os
import json
from langchain import LLMChain, PromptTemplate
from langchain.chat_models import ChatOpenAI
import gc
from dataclasses import dataclass

@dataclass
class Document:
    page_content: str
    metadata: dict

# for each file, split it and save into vectordatabase, return a judgement whether the file is a postive or negatvie pick
def get_chatgpt_response(docs, OPENAI_API_KEY, population, intervention, comparison, outcome):
    print("Starting a fresh conversation")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)

    # Ensure docs is handled as a string
    if isinstance(docs, str):
        document = Document(page_content=docs, metadata={})
        split_docs = text_splitter.split_documents([document])  # Pass wrapped document object in a list
    else:
        raise TypeError("The 'docs' parameter must be a string.")

    # print(split_docs)

    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY, model="text-embedding-3-small")
    vectorstore = Chroma.from_documents(split_docs, embeddings)

    # Define the system prompt
    system_prompt = """
    You are an autoregressive language model that accurately answers multiple-choice questions about scientific papers.

    You ALWAYS output your response as valid JSON, that adheres strictly to the following schema, Do not include any characters outside of the JSON object. Ensure your response is a valid JSON string.:


    "research": "string", // To help you THINK carefully about your response, summarize the question and the relevant available evidence in your own words, in one hundred words or fewer
    "assessment": "string", // Provide specific evidence for the choice of one option over the other, in forty words or fewer
    "response": "string", // Your answer: "Yes" or "No"
    "confidence": number // Scale: 1 (uncertain) to 5 (certain)



    """


    # Initialize the language model
    llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-4o-mini-2024-07-18")

    # Create the LLM chain with the system prompt
    llm_chain = LLMChain(
        llm=llm,
        prompt=PromptTemplate(
            input_variables=["question", "input_documents"],  # Update input variables
            template=system_prompt + "\n\n{input_documents}\n\n{question}"  # Include input documents in the prompt
        )
    )

    # Define your prompts
    prompt1 = "Does the article in the form of experiments, trials, or treatments?"
    prompt2 = "Is this a randomized controlled trials or cohort studies or case-control study"
    prompt3 = f"Does this study split participants into groups for comparison"
    prompt4 = f"Assessed treatment outcomes after participants interact with {intervention}"
    prompt5 = f"Compared {outcome} of {intervention} from the experiment group with outcomes from a non-treatment mode from the control/comparison group"
    prompt6 = "Reported sufficient data (larger than 30 sample) to calculate effect size."
    prompt7 = "Reported measurable outcomes that can be further analyzed."
    prompts = [prompt1, prompt2, prompt3, prompt4, prompt5, prompt6, prompt7]

    # Store answers in a list
    answers = []

    # Process each question
    for question in prompts:
        retrieval_docs = vectorstore.similarity_search(question, 10)  # Fetch relevant documents
        input_docs_text = "\n".join([doc.page_content for doc in retrieval_docs])  # Assuming each document has a 'content' attribute


        # # version without vector search
        # input_docs_text = docs

        response = llm_chain.run(question=question, input_documents=input_docs_text)  # Pass both question and documents
        response = response.strip()

        response_data = json.loads(response)
        if response_data["response"]== "No":
            del llm
            del llm_chain
            del vectorstore
            gc.collect()
            print("Conversation ended cleanly")
            return 0

    del llm
    del vectorstore
    del llm_chain
    gc.collect()
    print("Conversation ended cleanly")
    return 1


from langchain.document_loaders import PyMuPDFLoader
from langchain.document_loaders import UnstructuredFileLoader
# load the file into a list file
def file_load(filename, filetype):
   if filetype == "PDF":
      return PyMuPDFLoader(filename).load()
   else:
      return UnstructuredFileLoader(filename).load()



   
    