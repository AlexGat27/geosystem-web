from flask import Flask, request, jsonify
from src.MediaProcessingCtrl import imageProcessing
import os

app = Flask(__name__)
port = int(os.environ.get('PORT', 8000))

@app.route('/', methods=['POST'])
def process_media():
    data = request.json
    print(data)
    result = imageProcessing(data['imageUrl'])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=port)