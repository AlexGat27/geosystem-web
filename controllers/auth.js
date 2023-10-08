const {UserModel, UsualUserModel, EnterpriseUserModel} = require("../models/user")
const bcrypt = require("bcryptjs");

class AuthController{

    async getUsers(req, res){
        try {
            const data = UserModel.find();
            res.status(200).json(data);
        } catch (er) {
            console.log(er);
            res.status(400).json({message: "getUsers error"});
        }
    }

    async registration(req, res){
        try {
            const d = req.body;

            const email_candidate = await UserModel.findOne({ where: { email: d.email } });
            if (email_candidate){return res.status(400).json({message: "Пользователь с такой почтой уже есть"})};
            const login_candidate = await UserModel.findOne({ where: { email: d.email } });
            if (login_candidate){return res.status(400).json({message: "Пользователь с таким логином уже есть"})};

            // const hashPassword = bcrypt.hashSync(d.passWord, 7);

            let new_user = await UserModel.create({
                login: d.login,
                password: d.password,
                email: d.email,
                phone_number: d.phone_number,
                isfiz: d.isfiz
            })

            if (d.isfiz){
                await UsualUserModel.create({userId: new_user.id});
            }
            else{
                await EnterpriseUserModel.create({userId: new_user.id});
            }

            res.status(200).json({message: "Пользователь успешно зарегистрирован"});

        } catch (er) {
            console.log(er);
            res.status(400).json("Registartion error");
        }
    }

    async login(req, res){
        try {
            const {login, passWord} = req.body;
            const candidate = UserModel.findOne({login});
            if (candidate){ return res.status(400).json({message: "Пользователь с таким логином не найден"})};
            const validPassword = bcrypt.compareSync(passWord, user.passWord);
            if (!validPassword) {return res.status(400).json({message: "Неверный пароль"})};

            res.status(200).json({login: login, passWord: passWord});
        } catch (er) {
            console.log(er);
            res.status(400).json("Login error");
        }
    }
}

module.exports = new AuthController()