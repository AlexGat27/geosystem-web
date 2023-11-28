from flask import Flask, request, jsonify, send_file
from src.MediaProcessingCtrl import imageProcessing
import os
from io import BytesIO

app = Flask(__name__)
port = 8000#int(os.environ.get('PORT', 8000))

@app.post('/')
def process_media():
    if 'image' not in request.files:
        return jsonify({'error': 'No file Part'})
    file = request.files['image']
    result = imageProcessing(file)
    savefile = open('save.jpg', 'wb')
    savefile.write(result)
    savefile.close()
    return send_file(BytesIO(result), mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True, port=port)