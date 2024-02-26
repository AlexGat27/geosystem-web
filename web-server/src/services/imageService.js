const sequelize = require('sequelize')
const {OriginalImagesPath, ProcessedImagesPath} = require("../config/dbEnv");
const {PotholeModel} = require("../models/pothole");
const fs = require("fs");

class ImageService{
    async getImagesByCoords(geolat, geolon){
        const image_paths = await PotholeModel.findAll({
            attributes: [
                "picture_path",
                sequelize.literal(`ST_X(geometry) as x`), 
                sequelize.literal(`ST_Y(geometry) as y`)
            ]
            // where: sequelize.literal(`ST_Distance_Sphere(point(coordinates), 
            // point(${currentLongitude}, ${currentLatitude})) < ${10} `)
        }).then(res => {
            res.forEach(obj => {
                console.log(obj);
            })
            res = [...new Set(res.map(obj => obj.dataValues.picture_path))];
            return res
        });
        return image_paths
    }
    saveImage(fileBuffer, isProcessed){
        const finalImagePath = isProcessed ? ProcessedImagesPath : OriginalImagesPath;
        const countImages = fs.readdirSync(finalImagePath).length;
        // const ext = fileOptions.mimetype.split('/')[1];
        const imageSavePath = `${finalImagePath}/${countImages}_imagePothole.jpg`;
        fs.writeFile(imageSavePath, fileBuffer, er => {
            if(er) {console.log(er);}
            else {console.log("Файл сохранился успешно!")};
        })
        return imageSavePath;
    }
}

module.exports = new ImageService();