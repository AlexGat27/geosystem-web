const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys")
const { UserModel, UsualUserModel, EnterpriseUserModel } = require("../models/user");
const bcrypt = require("bcryptjs")

class UserService{

    getJwtData(jwtHeader){
        const token = jwtHeader && jwtHeader.split(' ')[1];
        const data = jwt.verify(token, keys.jwt);
        return data;
    }
    async getUsualUser(login){
        return await UserModel.findOne({
            include: [{
                model: UsualUserModel,
                attributes: ["count_potholes", "count_photos"],
            }],
            attributes: [
                "id", "login", "phone_number", "email", "isfiz"
            ],
            where: { login: login }
        });
    }
    async getEnterpriseUser(login){
        return await UserModel.findOne({
            include: [{
                model: EnterpriseUserModel,
                attributes: ["count_orders"],
            }],
            attributes: [
                "id", "login", "phone_number", "email", "isfiz"
            ],
            where: { login: login }
        });
    }
    async checkCredentials(login, password){
        const candidate = await UserModel.findOne({where: { login: login }});
        const hashPassword = bcrypt.hashSync(password, candidate.passwordSalt);
        console.log(candidate.password);
        console.log(hashPassword);
        if (candidate.passwordHash !== hashPassword){ return false; }
        else{ return true; }
    }
    async createUser(data){
        const candidate = await UserModel.findOne({ 
            where: { [Op.or]:{
                email: data.email,
                login: data.login 
            }} 
        });
        if (candidate){return false};

        const passwordSalt = bcrypt.genSalt(10);
        const hashPassword = bcrypt.hashSync(data.password, passwordSalt);

        let new_user = await UserModel.create({
            login: data.login,
            passwordHash: hashPassword,
            passwordSalt: passwordSalt,
            email: data.email,
            phone_number: data.phone,
            isfiz: (data.isFiz === true)
        }).then(console.log("Успешно добавлен пользователь"))

        if (data.isFiz === true){
            await UsualUserModel.create({
                userId: new_user.id,
            }).then(console.log("Успешно добавлен физик"));
        }
        else{
            await EnterpriseUserModel.create({
                userId: new_user.id,
                company: data.company
            }).then(console.log("Успешно добавлен юрик"));
        }
        return true;
    }
    async deleteUser(login){
        const user = await UserModel.destroy({ where: { login: login } });
        return user;
    }
    async setUsualUserPothole(userId, count){
        await UsualUserModel.increment({
            count_photos: 1,
            count_potholes: count,
        }, {where: { id: userId}})
        .then(() => {console.log("Succesfuly increment count of potholes")})
        .catch(er => {console.log(er)});
    }
}

module.exports = new UserService();