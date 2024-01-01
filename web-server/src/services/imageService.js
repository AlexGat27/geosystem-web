const {imagePotholesPath} = require("../config/dbEnv");
const {PotholeModel} = require("../models/pothole");
const fs = require("fs");

class ImageService{
    async getImagesByCoords(){
        const image_paths = await PotholeModel.findAll({
            attributes: ["picture_path"],
        }).then(res => {
            res = [...new Set(res.map(obj => obj.dataValues.picture_path))];
            return res
        });
        return image_paths
    }
    saveImage(fileOptions){
        const countImages = fs.readdirSync(imagePotholesPath).length;
        const ext = fileOptions.mimetype.split('/')[1];
        const bodyFile = fileOptions.buffer;
        const imageSavePath = imagePotholesPath + `/${countImages}_imagePothole.${ext}`;
        fs.writeFile(imageSavePath, bodyFile, er => {
            if(er) {console.log(er);}
            else {console.log("Файл сохранился успешно!")};
        })
        return imageSavePath;
    }
}

module.exports = new ImageService();