from flask import Flask, request, jsonify
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/search', methods=['POST'])
def search():
    data = request.get_json()  # Get data from POST request
    query = data.get('query')  # Access the search query from the data
    # Perform search or handle the query here
    print("data : ", data)
    print("query ::: ", query)
    return jsonify({'status': 'success', 'response': query})

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello I'm a full stack developer that loves python and javascript"
    }

    return response_body

