from flask import Flask, jsonify
from flask_cors import CORS
import random
import math

app = Flask(__name__)
CORS(app)

def generate_eeg_data():
    """Simulate 8-channel EEG data"""
    return [
        math.sin(random.uniform(0, 2 * math.pi)) * 50 + random.uniform(-10, 10)
        for _ in range(4)
    ]

def generate_vitals_data():
    """Simulate vitals data"""
    return {
        "vitals1": math.sin(random.uniform(0, 2 * math.pi)) * 10 + 80,
        "vitals2": math.cos(random.uniform(0, 2 * math.pi)) * 10 + 70,
    }

@app.route('/get_data', methods=['GET'])
    
def get_data():
    data = {
        "eegData": [generate_eeg_data()],
        "fnirsData": [generate_vitals_data()],
        "eegIndex": random.randint(0, 100),
        "fnirsIndex" : random.randint(0,100)
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
