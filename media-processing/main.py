from flask import Flask, request, jsonify, abort
from src.MediaProcessingCtrl import imageProcessing
import base64
from src.CheckSimilarImagesCtrl import checkSimilarity
from io import BytesIO
import numpy as np

app = Flask(__name__)
port = 8000

@app.post('/imageProcessing')
def process_media():
    if 'image' not in request.files:
        return jsonify({'error': 'No file Part'})
    file = request.files['image']

    new_image_np = np.frombuffer(file.read(), np.uint8)
    old_image_paths = request.form.getlist('old_image_paths')
    checkSimilarityResult = checkSimilarity(new_image_np, old_image_paths)
    print(checkSimilarityResult)
    if not(checkSimilarityResult):
        return abort(410, 'Ошибка, такое изображение уже есть в базе данных')
    
    output_buffer, potholesData = imageProcessing(new_image_np)
    res_send = base64.b64encode(output_buffer).decode('utf-8')
    data2send = {
        'potholesData': potholesData,
        'imageUrl': res_send
    }
    return jsonify(data2send)
    
    

if __name__ == '__main__':
    app.run(debug=True, port=port)