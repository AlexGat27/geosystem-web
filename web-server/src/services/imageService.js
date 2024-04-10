const sequelize = require('sequelize') //Объект подключения базы данных
const {OriginalImagesPath, ProcessedImagesPath} = require("../config/dbEnv"); //Пути сохраненных фотографий
const {PotholeModel} = require("../models/pothole"); //Модель ям
const fs = require("fs"); //Модуль работы с файлами

//Класс-сервис для выполнения бизнесс логики с изображениями
class ImageService{
    
    //Получение путей изображений в определенном радиусе по координатам
    async getImagesByCoords(geolat, geolon){
        console.log(geolat, geolon)
        const image_paths = await PotholeModel.findAll({
            attributes: [
                "picture_path",
            ],
            where: sequelize.literal(`ABS(ST_Y("geometry") - ${geolon}) < 0.01 AND ABS(ST_X("geometry") - ${geolat}) < 0.01`)
        }).then(res => {
            res.forEach(obj => {
                console.log(obj.picture_path);
            })
            res = [...new Set(res.map(obj => obj.dataValues.picture_path))];
            return res
        }).catch(er => {
            console.log(er);
            return false;
        });
        return image_paths
    }
    //Сохранение изображений
    saveImage(fileBuffer, isProcessed){
        const finalImagePath = isProcessed ? ProcessedImagesPath : OriginalImagesPath;
        const countImages = fs.readdirSync(finalImagePath).length;
        const imageSavePath = `${finalImagePath}/${countImages}_imagePothole.jpg`;
        fs.writeFile(imageSavePath, fileBuffer, er => {console.log(er);})
        return imageSavePath;
    }
}

module.exports = new ImageService();