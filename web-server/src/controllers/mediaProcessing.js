const request = require('request');
const potholeService = require('../services/potholeService');
const imageService = require('../services/imageService');
class MediaProcessingController{

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
            if (body === undefined){return res.status(408).json({ message: "Истекло время ожидания" });}
            const fetchData = JSON.parse(body);
            switch(fetchData.status){
                case 200:
                    const imgPath = imageService.saveImage(req.file);
                    potholeService.addPotholes(fetchData.potholesData, imgPath);
                    return res.status(200).json(fetchData.imageUrl);
                    break;
                case 452:
                    return res.status(452).json({ message: "Изображение в базе данных уже есть" });
                    break;
                case 404:
                    return res.status(404).json({ message: "Ямы не найдены" });
                    break;
                default:
                    return res.status(400).json({ message: "Неопознанная ошибка" });
            }
        });
    }
}

module.exports = new MediaProcessingController();