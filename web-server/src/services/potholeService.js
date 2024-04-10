const {PotholeModel} = require("../models/pothole") //Модель ям
const {UserModel} = require("../models/user") //Модель пользователя
const {sequelize} = require('../models/index') //Объект подключения базы данных
const jwt = require("jsonwebtoken"); //Модуль создания jwt-токенов
const keys = require("../config/keys"); //Ключи

//Класс-сервис для выполнения бизнесс логики с моделями ям
class PotholeService{

    //Нахождение всех ям в базе данных
    async getAllPotholes(){
        return await PotholeModel.findAll({
            include: [{
                model: UserModel,
                attributes: ['login']
            }],
            attributes: ['countPotholes', 'picture_path', 'geometry']
        });
    }
    //Удаление всех ям из БД
    async deleteAllPotholes(){
        await PotholeModel.destroy();
    }
    //Добавление ям в БД
    async addPotholes(_userId, countPotholes, geolat, geolon, imagePath){
        await PotholeModel.create({
            geometry: sequelize.literal(`ST_GeomFromText('POINT(${geolat} ${geolon})')`),
            countPotholes: countPotholes,
            picture_path: imagePath,
            userId: _userId
        });
    }

    async createExportData(){
        const dataPotholes = await PotholeModel.findAll({
            attributes: ['countPotholes', 'picture_path', 'geometry']
        });
        let csvContent = 'Pothole ID,Pothole Count,Longitude EPSG4326,Latitude EPSG4326,Picture Path\n';
        dataPotholes.forEach((item, index) => {
            let id = index;
            let countPotholes = item.countPotholes;
            let coordX = item.geometry.coordinates[0];
            let coordY = item.geometry.coordinates[1];
            let picturePath = item.picture_path;
            csvContent += `${id},${countPotholes},${coordX},${coordY},${picturePath}\n`;
        });
        return csvContent
    }
}

module.exports = new PotholeService();