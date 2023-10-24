const {UserModel, UsualUserModel, EnterpriseUserModel} = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");

class AuthController{

    async getUser(req, res){
        try {
            console.log(req.query.token);
            // var d = jwt.verify(req.query.token, config.jwt, function(error, decoded){
            //     if (error){console.log(error)}
            // });
            // const data = await UserModel.findOne({ where: { login: d.login } });
            // res.status(200).json(data);
        } catch (er) {
            res.status(400).json({
                message: req.query.token,
            });
        }
    }

    async registration(req, res){
        try {
            const d = req.body;

            const email_candidate = await UserModel.findOne({ where: { email: d.email } });
            if (email_candidate){return res.status(400).json({message: "Пользователь с такой почтой уже есть"})};
            const login_candidate = await UserModel.findOne({ where: { login: d.login } });
            if (login_candidate){return res.status(400).json({message: "Пользователь с таким логином уже есть"})};

            const hashPassword = bcrypt.hashSync(d.password, 10);

            let new_user = await UserModel.create({
                login: d.login,
                password: hashPassword,
                email: d.email,
                phone_number: d.phone,
                isfiz: (d.isFiz === true)
            })

            if (d.isFiz === true){
                await UsualUserModel.create({
                    userId: new_user.id,
                });
            }
            else{
                await EnterpriseUserModel.create({
                    userId: new_user.id,
                    company: d.company
                });
            }

            res.status(200).json({message: "Пользователь успешно зарегистрирован"});

        } catch (er) {
            console.log(er);
            res.status(400).json("Registartion error");
        }
    }

    async login(req, res){
        try {
            const d = req.body;
            const candidate = await UserModel.findOne({where: {login: d.login}});
            if (!candidate){ return res.status(400).json({message: "Пользователь с таким логином не найден"})};
            const validPassword = bcrypt.compareSync(d.password, candidate.password);
            if (!validPassword) {return res.status(400).json({message: `Неверный пароль ${candidate.password}`})};

            const token = jwt.sign({
                login: candidate.login,
                isfiz: candidate.isfiz
            }, config.jwt, {expiresIn: 60 * 60});
            return res.status(200).json({
                token: `${token}`
            });
        } catch (er) {
            console.log(er);
            res.status(400).json("Login error");
        }
    }
}

module.exports = new AuthController()