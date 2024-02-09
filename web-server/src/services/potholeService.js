const {PotholeModel} = require("../models/pothole")
const {potholeSequelize} = require('../models/index')

class PotholeService{

    async getAllPotholes(){
        return await PotholeModel.findAll();
    }
    async deleteAllPotholes(){
        await PotholeModel.destroy();
    }
    async addPotholes(countPotholes, coords, imagePath){
        await PotholeModel.create({
            geometry: potholeSequelize.literal(`ST_GeomFromText('POINT(${coords.geolat} ${coords.geolon})')`),
            countPotholes: countPotholes,
            pothole_class: 1,
            picture_path: imagePath
        });
    }
}

module.exports = new PotholeService();