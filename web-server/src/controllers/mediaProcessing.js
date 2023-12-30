const request = require('request');
const potholeService = require('../services/potholeService');
const imageService = require('../services/imageService');

class MediaProcessingController{

    async imageProcessing(req, res){
        imageService.checkSimilarImages(req.file);
        const options = {
            url: 'http://127.0.0.1:8000/', // Замените на фактический URL Python API
            method: 'POST',
            formData: {
                image: {
                    value: req.file.buffer, // Используйте буфер файла
                    options: {
                        filename: req.file.originalname,
                        contentType: req.file.mimetype,
                    },
                },
            },
        };

        request(options, (error, response, body) => {
            if (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            } else {
                const fetchData = JSON.parse(body);
                potholeService.addPotholes(fetchData.potholesData);
                return res.status(200).json(fetchData.imageUrl);
            }
        });
    }
}

module.exports = new MediaProcessingController();