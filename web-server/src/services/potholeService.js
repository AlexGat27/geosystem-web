const {PotholeModel} = require("../models/pothole")

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
                geometry: `Point(${data[i].lat} ${data[i].lon})`,
                adress: data[i].street,
                pothole_class: data[i].class
            });
        }
    }
}

module.exports = new PotholeService();