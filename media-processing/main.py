from flask import Flask, request, jsonify, send_file
from src.MediaProcessingCtrl import imageProcessing
import base64
from src.CheckSimilarImagesCtrl import checkSimilarity
from io import BytesIO

app = Flask(__name__)
port = 8000

@app.post('/imageProcessing')
def process_media():
    if 'image' not in request.files:
        return jsonify({'error': 'No file Part'})
    file = request.files['image']
    print(request.form)
    old_image_paths = request.form.get('old_image_paths')
    # print('old_image_paths: '+ old_image_paths)
    # checkSimilarityResult = checkSimilarity(file, request.imageUrl)
    # if not(checkSimilarityResult):
    #     return jsonify({'error': 'BD has a similar image'})
    
    output_buffer, potholesData = imageProcessing(file)
    res_send = base64.b64encode(output_buffer).decode('utf-8')
    data2send = {
        'potholesData': potholesData,
        'imageUrl': res_send
    }
    return jsonify(data2send)
    
    

if __name__ == '__main__':
    app.run(debug=True, port=port)