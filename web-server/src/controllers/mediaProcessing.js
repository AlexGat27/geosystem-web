const request = require('request');

class MediaProcessingController{

    async imageProcessing(req, res){
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
                return res.status(200).json(body);
            }
        });
    }
}

module.exports = new MediaProcessingController();