const sequelize = require('sequelize')
const {OriginalImagesPath, ProcessedImagesPath} = require("../config/dbEnv");
const {PotholeModel} = require("../models/pothole");
const fs = require("fs");

class ImageService{
    async getImagesByCoords(geolat, geolon){
        console.log(geolat, geolon);
        const image_paths = await PotholeModel.findAll({
            attributes: [
                "picture_path",
                // [sequelize.fn('ST_X', sequelize.col('geometry')), 'longitude'],
                // [sequelize.fn('ST_Y', sequelize.col('geometry')), 'latitude']
            ],
            where: sequelize.literal(`ABS(ST_Y("geometry") - ${geolon}) < 0.01 AND ABS(ST_X("geometry") - ${geolat}) < 0.01`)
        }).then(res => {
            res.forEach(obj => {
                console.log(obj.picture_path);
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