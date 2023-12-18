const potholeService = require("../services/potholeService")

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
}

module.exports = new GraphicalMapController();