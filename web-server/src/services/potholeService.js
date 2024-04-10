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
    async addPotholes(_userId, countPotholes, geolat, geolon, imagePathOrigin, imagePathProcessed){
        await PotholeModel.create({
            geometry: sequelize.literal(`ST_GeomFromText('POINT(${geolat} ${geolon})')`),
            countPotholes: countPotholes,
            picture_path: imagePathOrigin,
            processed_picture_path: imagePathProcessed,
            userId: _userId
        });
    }

    async createExportData(){
        const dataPotholes = await PotholeModel.findAll({
            attributes: ['countPotholes', 'picture_path', 'processed_picture_path', 'geometry', 'createdAt']
        });
        let csvContent = 'Pothole ID;Pothole Count;Longitude EPSG4326;Latitude EPSG4326;Origin picture path;Processed picture path;Created At\n';
        dataPotholes.forEach((item, index) => {
            let id = index;
            let countPotholes = item.countPotholes;
            let coordX = item.geometry.coordinates[0];
            let coordY = item.geometry.coordinates[1];
            let picturePath = item.picture_path;
            let processedPicturePath = item.processed_picture_path;
            let createdAt = item.createdAt.toLocaleString();
            csvContent += `${id};${countPotholes};${coordX};${coordY};${picturePath};${processedPicturePath};${createdAt}\n`;
        });
        return csvContent
    }
}

module.exports = new PotholeService();