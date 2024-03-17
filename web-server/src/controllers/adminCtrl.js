const userService = require("../services/userService");
const keys = require("../config/keys");
const {ADMIN_LOGIN, ADMIN_PASSWORD} = require("../config/keys");

class AdminController{

    async login(req, res){
        const data = req.body;
        console.log(data)
        console.log(ADMIN_LOGIN, ADMIN_PASSWORD)
        if (data.login == ADMIN_LOGIN && data.password == ADMIN_PASSWORD){
            return res.status(200).json({message: "Успешная авторизация"});
        }else{
            return res.status(404).json({message:"Неправильный логин или пароль"})
        }
    }
    async mediaProcessing(req, res){
        console.log(req.file);
        return res.status(200).json({message: "Успешная обработка фото"})
    }
}

module.exports = new AdminController()