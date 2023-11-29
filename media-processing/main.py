from flask import Flask, request, jsonify, send_file
from src.MediaProcessingCtrl import imageProcessing
import base64
from io import BytesIO

app = Flask(__name__)
port = 8000#int(os.environ.get('PORT', 8000))

@app.post('/')
def process_media():
    if 'image' not in request.files:
        return jsonify({'error': 'No file Part'})
    file = request.files['image']
    result = imageProcessing(file)

    res_send = base64.b64encode(result).decode('utf-8')
    return jsonify({'imageUrl': res_send})

if __name__ == '__main__':
    app.run(debug=True, port=port)