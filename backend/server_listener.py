from flask import Flask, jsonify,request
from flask_restful import Api, Resource
from flask_cors import CORS
import json


app = Flask(__name__)
api = Api(app)
CORS(app)

receivedData=None

class DataResource(Resource):
    received_data = None

    def post(self):
        global receivedData
        json_data = request.get_json()
        receivedData = json_data
        return jsonify({"status": "success", "message": "Data received successfully"})

    def get(self):
        global receivedData
        if receivedData is not None:
            json_to_send = jsonify(receivedData).json
            return json_to_send
        else:
            return json.dumps({"status": "error", "message": "No data received yet"}), 404

api.add_resource(DataResource, '/data')

if __name__ == '__main__':
    app.run(debug=True, port=8000)
