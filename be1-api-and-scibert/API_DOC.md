# API Documentation

## Search for Papers using PICO
This API offers functionality for searching academic papers based on PICO elements (Population, Intervention, Comparison, Outcome) and for classifying papers as relevant or not based on their content. Additionally, the API can compute similarity scores between PICO-based queries and paper data, offering both single-paper and batch processing capabilities.

---

## Semantic Scholar

---

**Endpoint**: `/papers`  
**Method**: `GET`  
**Description**: This endpoint allows searching for papers based on the PICO framework (Population, Intervention, Comparison, Outcome), and optional filters like year and additional keywords.
**Request Parameters:**
- **pop** (str): The population in PICO (e.g., "K-12 students").  
- **inter** (str): The intervention in PICO (e.g., "Intelligent Tutoring Systems").  
- **comp** (str): The comparison in PICO (e.g., "Traditional Teaching Methods").  
- **outcome** (str): The outcome in PICO (e.g., "Improvement in post-test or exam results").  
- **year** (str, optional): The year range for filtering papers (e.g., "2015-2020").  
- **add_keywords** (str, optional): Additional keywords to refine the search (e.g., "adaptive learning, education technology").  

#### Example Request:
```
GET /papers?pop=K-12+students&inter=Intelligent+Tutoring+Systems&comp=Traditional+Teaching+Methods&outcome=Improvement+in+post-test+results&year=2015-2020&add_keywords=adaptive+learning
```

#### Example Response:

```json
{
  "papers": [
    {
      "title": "Effectiveness of Intelligent Tutoring Systems in K-12 Education",
      "abstract": "This paper explores the effectiveness of Intelligent Tutoring Systems in improving post-test results in K-12 students.",
      "year": "2019",
      "keywords": ["education", "technology", "tutoring"]
    },
    {
      "title": "Comparing Teaching Methods: Intelligent Tutoring Systems vs Traditional Approaches",
      "abstract": "This paper compares Intelligent Tutoring Systems and Traditional Teaching Methods in improving exam performance for K-12 students.",
      "year": "2018",
      "keywords": ["education", "technology", "comparison"]
    }
  ]
}
```

---

## Scibert

---

**Endpoint**: `/infer`  
**Method**: `POST`  
**Description**: This endpoint accepts a PICO sentence and paper data (abstract/full text) and returns a classification (Relevant/Not Relevant) and a similarity score.
**Request Parameters:**
- **pico_dict** (dict):
```
{
  pop (str): The population in PICO (e.g., "K-12 students"),  
  inter (str): The intervention in PICO (e.g., "Intelligent Tutoring Systems"),  
  comp (str): The comparison in PICO (e.g., "Traditional Teaching Methods"),  
  outcome (str): The outcome in PICO (e.g., "Improvement in post-test or exam results").  
}
```
- **paper_data** (str): The text or metadata of the paper to classify (either plain text or JSON).
- **THRESHOLD** (float, optional, default: 0.65): The similarity threshold for classifying papers as relevant or not.

#### Example Request Body:

```json
{
  "data": {
    "pop": "K-12 students",
    "inter": "Intelligent Tutoring Systems",
    "comp": "Traditional Teaching Methods",
    "outcome": "Improvement in post-test results",
  },
  "paper_data": "This paper investigates the impact of Intelligent Tutoring Systems on K-12 student performance in math and science.",
  "THRESHOLD": 0.75
}
```

#### Example Response:

```json
{
  "prediction": "Relevant",
  "confidence": 0.82,
  "similarity_score": 0.78
}
```

---

**Endpoint**: `/infer-batch`  
**Method**: `POST` 
**Description:** This endpoint accepts a list of papers and PICO information, and returns a list of classifications (Relevant/Not Relevant) and similarity scores for each paper.
**Request Parameters:**
- **pico_dict** (dict):
```
{
  pop (str): The population in PICO (e.g., "K-12 students"),  
  inter (str): The intervention in PICO (e.g., "Intelligent Tutoring Systems"),  
  comp (str): The comparison in PICO (e.g., "Traditional Teaching Methods"),  
  outcome (str): The outcome in PICO (e.g., "Improvement in post-test or exam results").  
}
```
- **data_list** (list): A list of paper data (abstracts or full text).
- **THRESHOLD** (float, optional, default: 0.65): The similarity threshold for classifying papers as relevant or not.

#### Example Request Body:

```json
{
  "data": {
    "pop": "K-12 students",
    "inter": "Intelligent Tutoring Systems",
    "comp": "Traditional Teaching Methods",
    "outcome": "Improvement in post-test results",
  },
  "data_list": [
    "This paper explores the impact of Intelligent Tutoring Systems on K-12 students.",
    "A study on the effectiveness of traditional teaching methods in primary education."
  ],
  "THRESHOLD": 0.7
}
```

#### Example Response:

```json
{
  "results": [
    {
      "prediction": "Relevant",
      "confidence": 0.85,
      "similarity_score": 0.80
    },
    {
      "prediction": "Not Relevant",
      "confidence": 0.60,
      "similarity_score": 0.45
    }
  ]
}
```