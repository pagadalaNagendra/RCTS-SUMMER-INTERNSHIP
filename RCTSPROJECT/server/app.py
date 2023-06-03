from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import pandas as pd
import openpyxl



client = MongoClient('mongodb://localhost:27017')
db = client['Task']
collection = db['formdata']
collection2 = db['exceldata']


app = Flask(__name__)
CORS(app)

@app.route('/save-data', methods=['POST'])
def save_data():
    data = request.get_json()
    ans = {}
    for i in data:
        ans[i['name']]=i['value']
    # print(ans)
    collection.insert_one(ans)
    return jsonify({'message': 'Data saved successfully'})

@app.route('/get-data', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}))  # Exclude _id field
    formatted_data = []
    for entry in data:
        question_answer_pairs = []
        for question, answer in entry.items():
            question_answer_pairs.append({'question': question, 'answer': answer})
        formatted_data.extend(question_answer_pairs)
    return jsonify(formatted_data)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        # Read the file and convert to DataFrame
        if file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        elif file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            return 'Invalid file format!'

        # Insert data into MongoDB
        # client = MongoClient('mongodb://localhost:27017')
        # db = client['Task']
        # collection2 = db['exceldata']
        collection2.insert_many(df.to_dict('records'))

        return {'msg' : 'File uploaded successfully!'}
    else:
        return 'No file selected!',200


# @app.route('/api/exceldata', methods=['GET'])
# def get_all_exceldata():
#     try:
#         exceldata = list(collection.find())
#         for record in exceldata:
#             record['_id'] = str(record['_id'])  # Convert ObjectId to string
#         return jsonify(exceldata), 200
#     except Exception as e:
#         return jsonify(message=str(e)), 500

@app.route('/excel', methods=['GET'])
def get_all_exceldata():
    try:
        exceldata = list(collection2.find())
        for record in exceldata:
            record['_id'] = str(record['_id'])  # Convert ObjectId to string
        return jsonify(exceldata), 200
    except Exception as e:
        return jsonify(message=str(e)), 500






if __name__ == '__main__':
    app.run(debug=True)


