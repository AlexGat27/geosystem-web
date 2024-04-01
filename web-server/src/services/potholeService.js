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
}

module.exports = new PotholeService();