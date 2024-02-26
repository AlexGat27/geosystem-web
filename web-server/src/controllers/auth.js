const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

class AuthController{

    async getUser(req, res){
        try {
            const jwtHeader = req.headers["authorisation"];
            const d = userService.getJwtData(jwtHeader);
            const data = await userService.getUser(d.login);
            return res.status(200).json(data);
        } catch (er) {
            return res.status(400).json({
                message: er,
            });
        }
    }

    async registerUser(req, res){
        try {
            const d = req.body;
            const answer = userService.createUser(d);
            if (answer===false){return res.status(400).json({message: "Ошибка регистрации, введите другой email или логин"});}
            res.status(200).json({message: "Пользователь успешно зарегистрирован"});

        } catch (er) {
            console.log(er);
            res.status(400).json({message: "Неизвестная ошибка регистрации"});
        }
    }

    async login(req, res){
        try {
            const data = req.body;
            console.log(data);
            const candidate = await userService.getUser(data.login);
            console.log(candidate);
            if (!candidate){return res.status(404).json({message:"Неправильный логин или пароль"})};
            const token = jwt.sign({
                id: candidate.id,
                login: candidate.login,
                isfiz: candidate.isfiz
            }, keys.jwt, {expiresIn: 60 * 60 * 24});
            return res.status(200).json({
                token: `Bearer ${token}`
            });
        } catch (er) {
            console.log(er);
            res.status(400).json("Ошибка авторизации");
        }
    }

    async deleteUser(req, res){
        try {
            const jwtHeader = req.headers["authorisation"];
            const token = jwtHeader && jwtHeader.split(' ')[1];
            let data = jwt.verify(token, config.jwt);
            await userService.deleteUser(this.login=data.login);
            return res.status(200).json({message: `Пользователь c ником ${data.login} успешно удален`});
        } catch (er) {
            res.status(400).json({
                message: er,
            });
        }
    }
}

module.exports = new AuthController()