from flask import Flask, request, jsonify, send_file
from src.MediaProcessingCtrl import imageProcessing
import os

app = Flask(__name__)
port = 8000#int(os.environ.get('PORT', 8000))

@app.post('/')
def process_media():
    print(request.files)
    if 'image' not in request.files:
        return jsonify({'error': 'No file Part'})
    print("request.files")
    file = request.files['image']
    result = imageProcessing(file)
    return send_file(result, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True, port=port)