const potholeService = require('../services/potholeService');
const imageService = require('../services/imageService');
const userService = require('../services/userService')
class MediaProcessingController{

    async imageProcessing(req, res){
        const old_image_list = await imageService.getImagesByCoords(req.body.geolat, req.body.geolon);
        const old_image_paths = old_image_list.join('::')
        const formData = new FormData();
        const file = new File([req.file.buffer], 'image.jpg', { type: 'image/jpeg' });
        formData.append('image', file);
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
            const userData = userService.getJwtData(req.headers["authorisation"]);
            imageService.saveImage(Buffer.from(fetchData.imageUrl, 'base64'),true);
            potholeService.addPotholes(userData.id, fetchData.countPotholes, req.body.geolat, req.body.geolon, imgPath);
            userService.setUsualUserPothole(userData.id, fetchData.countPotholes);
            return res.status(200).json(fetchData.imageUrl);
        }).catch(er => {
            return res.status(er.status).json(er.message);
        })
    }

    _getUserID(token){

    }
}

module.exports = new MediaProcessingController();