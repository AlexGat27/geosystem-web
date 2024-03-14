const {PotholeModel} = require("../models/pothole")
const {UserModel} = require("../models/user")
const {sequelize} = require('../models/index')
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

class PotholeService{

    async getAllPotholes(){
        return await PotholeModel.findAll({
            include: [{
                model: UserModel,
                attributes: ['login']
            }],
            attributes: ['countPotholes', 'picture_path', 'geometry']
        });
    }
    async deleteAllPotholes(){
        await PotholeModel.destroy();
    }
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