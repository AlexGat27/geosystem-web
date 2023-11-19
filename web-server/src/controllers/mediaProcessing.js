const axios = require("axios")

class MediaProcessingController{

    async imageProcessing(req, res){
        try {
            const result = await axios.post('http://localhost:8000/', req.body);
            return res.status(200).json(result);
        }catch(er){
            res.status(400).json({
                message: er,
            })
        }
    }
}

module.exports = new MediaProcessingController();