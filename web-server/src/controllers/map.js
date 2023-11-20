const {PotholeModel} = require("../models/pothole")

class GraphicalMapController{

    async getPotholes(req, res){
        try {
            const data = await PotholeModel.findAll();
            return res.status(200).json(data);
        }catch(er){
            res.status(400).json({
                message: er,
            })
        }
    }
}

module.exports = new GraphicalMapController();