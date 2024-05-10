from flask import Flask, request, jsonify
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

import google.generativeai as genai

for i, m in zip(range(5), genai.list_tuned_models()):
  print(m.name)

model = genai.GenerativeModel(model_name=f'tunedModels/gemini1tuned2-xxr5kvkgzqhb')


@api.route('/search', methods=['POST'])
def search():
    data = request.get_json()  # Get data from POST request
    query = data.get('query')  # Access the search query from the data
    # Perform search or handle the query here
    result = model.generate_content(query)

    return jsonify({'status': 'success', 'response': result.text})

