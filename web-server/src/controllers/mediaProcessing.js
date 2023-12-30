const request = require('request');
const potholeService = require('../services/potholeService');
const imageService = require('../services/imageService');

class MediaProcessingController{

    async imageProcessing(req, res){
        const isSimilar = imageService.checkSimilarImages(req.file);
        if (isSimilar){return res.status(400).json({ message: 'Изображение уже присутствует в базе данных' }); }

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
                const imgPath = imageService.saveImage(req.file);
                potholeService.addPotholes(fetchData.potholesData, imgPath);
                return res.status(200).json(fetchData.imageUrl);
            }
        });
    }
}

module.exports = new MediaProcessingController();