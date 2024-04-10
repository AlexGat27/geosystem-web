const potholeService = require("../services/potholeService")
const fs = require('fs')

class GraphicalMapController{

    async getPotholes(req, res){
        try {
            const data = await potholeService.getAllPotholes();
            return res.status(200).json(data);
        }catch(er){
            res.status(400).json({
                message: er,
            })
        }
    }
    async deleteAllPotholes(req, res){
        try {
            await potholeService.deleteAllPotholes();
            return res.status(200).json(data);
        }catch(er){
            res.status(400).json({
                message: er,
            })
        }
    }

    async createExportFile(req, res){
        try {
            const exportData = await potholeService.createExportData();
            return res.status(200).json(exportData);
        }catch(er){
            res.status(400).json({
                message: er,
            })
        }
    }
}

module.exports = new GraphicalMapController();