const {imagePotholesPath} = require("../config/dbEnv");
const fs = require("fs");

class ImageService{
    checkSimilarImages(fileOptions){

        return false;
    }
    saveImage(fileOptions){
        const countImages = fs.readdirSync(imagePotholesPath).length;
        const ext = fileOptions.mimetype.split('/')[1];
        const bodyFile = fileOptions.buffer;
        const imageSavePath = imagePotholesPath + `/${countImages}_imagePothole.${ext}`;
        fs.writeFile(imageSavePath, bodyFile, er => {
            if(er) {console.log(er);}
            else {console.log("Файл сохранился успешно!")};
        })
        return imageSavePath;
    }
}

module.exports = new ImageService();