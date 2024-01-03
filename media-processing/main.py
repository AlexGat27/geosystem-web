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
        return jsonify({'error': 'Изображения нет в параметрах запроса'})
    file = request.files['image']

    new_image_np = np.frombuffer(file.read(), np.uint8)
    old_image_paths = request.form.getlist('old_image_paths')

    data2send = {
        'status': 0,
        'message': None,
        'potholesData': None,
        'imageUrl': None
    }
    
    output_buffer, potholesData = imageProcessing(new_image_np)
    if not(potholesData):
        data2send['status'] = 411
        data2send['message'] = 'Ошибка, ям не найдено'
        return jsonify(data2send)
    res_send = base64.b64encode(output_buffer).decode('utf-8')

    checkSimilarityResult = checkSimilarity(new_image_np, old_image_paths)
    if checkSimilarityResult:
        data2send['status'] = 410
        data2send['message'] = 'Ошибка, такое изображение уже есть в базе данных'
        return jsonify(data2send)
    
    data2send['status'] = 200
    data2send['imageUrl'] = res_send
    data2send['potholesData'] = potholesData
    return jsonify(data2send)
    
    

if __name__ == '__main__':
    app.run(debug=True, port=port)