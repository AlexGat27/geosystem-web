const axios = require("axios")

class MediaProcessingController{

    async imageProcessing(req, res){
        console.log(req.body);
        try {
            console.log(req.body);
            const result = await axios.post('http://127.0.0.1:8000/', req.body);
            return res.status(200).json(result.data);
        }catch(er){
            res.status(400).json({
                message: er,
            })
        }
    }
}

module.exports = new MediaProcessingController();