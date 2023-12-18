const {PotholeModel} = require("../models/pothole")
const {potholeSequelize} = require('../models/index')

class PotholeService{

    async getAllPotholes(){
        return await PotholeModel.findAll();
    }
    async deleteAllPotholes(){
        await PotholeModel.destroy();
    }
    async addPotholes(data){
        for(let i = 0; i < data.length; i++){
            await PotholeModel.create({
                geometry: potholeSequelize.literal(`ST_GeomFromText('POINT(${data[i].lat} ${data[i].lon})')`),
                adress: data[i].street,
                pothole_class: data[i].class
            });
        }
    }
}

module.exports = new PotholeService();