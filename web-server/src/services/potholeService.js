const {PotholeModel} = require("../models/pothole")
const {potholeSequelize} = require('../models/index')
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

class PotholeService{

    async getAllPotholes(){
        return await PotholeModel.findAll();
    }
    async deleteAllPotholes(){
        await PotholeModel.destroy();
    }
    async addPotholes(_userId, countPotholes, geolat, geolon, imagePath){
        await PotholeModel.create({
            geometry: potholeSequelize.literal(`ST_GeomFromText('POINT(${geolat} ${geolon})')`),
            countPotholes: countPotholes,
            picture_path: imagePath,
            userId: _userId
        });
    }
}

module.exports = new PotholeService();