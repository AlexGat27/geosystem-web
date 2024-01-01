const request = require('request');
const potholeService = require('../services/potholeService');
const imageService = require('../services/imageService');
class MediaProcessingController{

    // async checkSimilarity(coords){
    //     old_image_paths = await imageService.getImagesByCoords();
    //     const options = {
    //         url: 'http://127.0.0.1:8000/checkImages', // Замените на фактический URL Python API
    //         method: 'POST',
    //         formData: {
    //             new_image: {
    //                 value: req.file.buffer, // Используйте буфер файла
    //                 options: {
    //                     filename: req.file.originalname,
    //                     contentType: req.file.mimetype,
    //                 },
    //             },
    //             old_image_path: old_image_paths
    //         },
    //     };

    //     request(options, (error, response, body) => {
    //         if (error) {
    //             return res.status(500).json({ message: 'Internal Server Error' });
    //         } else {
    //             return res.status(200).json(response);
    //         }
    //     });
    // }

    async imageProcessing(req, res){
        const old_image_paths = await imageService.getImagesByCoords();
        console.log(old_image_paths);
        // if (isHaveSimImages){ return res.status(400).json({message: "Изображения в базе уже имеются..."}); }

        const options = {
            url: 'http://127.0.0.1:8000/imageProcessing', // Замените на фактический URL Python API
            method: 'POST',
            formData: {
                image: {
                    value: req.file.buffer, // Используйте буфер файла
                    options: {
                        filename: req.file.originalname,
                        contentType: req.file.mimetype,
                    },
                },
                old_image_paths: old_image_paths
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