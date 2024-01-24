const potholeService = require('../services/potholeService');
const imageService = require('../services/imageService');
class MediaProcessingController{

    async imageProcessing(req, res){
        const old_image_list = await imageService.getImagesByCoords();
        const old_image_paths = old_image_list.join('::')

        const formData = new FormData()
        formData.append('image', new Blob([req.file.buffer], {type: req.file.type}));
        formData.append('old_image_paths', old_image_paths);
        fetch('http://127.0.0.1:6001/imageProcessing', {
            method:'POST', body:formData
        }).then(response => {
            if (response.ok){return response.json()}
            else{
                return response.text().then(errorText => {throw { status: response.status, message: errorText }})
            }
        }).then(fetchData => {
            const imgPath = imageService.saveImage(req.file.buffer, false);
            imageService.saveImage(Buffer.from(fetchData.imageUrl, 'base64'),true);
            potholeService.addPotholes(fetchData.potholesData, imgPath);
            return res.status(200).json(fetchData.imageUrl);
        }).catch(er => {
            res.status(er.status).json(er.message)
        })
    }
}

module.exports = new MediaProcessingController();