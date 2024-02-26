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
    async getUser(login){
        return await UserModel.findOne({
            attributes: [
                "login", "phone_number", "email",
            ],
            where: { login: login }
        });
    }
    async createUser(data){
        const candidate = await UserModel.findOne({ 
            where: { email:{[Op.or]: [data.email, data.login]}} 
        });
        if (candidate){return false};

        const hashPassword = bcrypt.hashSync(data.password, 10);

        let new_user = await UserModel.create({
            login: data.login,
            password: hashPassword,
            email: data.email,
            phone_number: data.phone,
            isfiz: (data.isFiz === true)
        })

        if (data.isFiz === true){
            await UsualUserModel.create({
                userId: new_user.id,
            });
        }
        else{
            await EnterpriseUserModel.create({
                userId: new_user.id,
                company: data.company
            });
        }
        return true;
    }
    async deleteUser(login){
        const user = await UserModel.destroy({ where: { login: login } });
        return user;
    }
    async setUsualUserPothole(userId, count){
        await UsualUserModel.increment('count_potholes', {by: count, where: { id: userId}})
        .then(() => {console.log("Succesfuly increment count of potholes")})
        .catch(er => {console.log(er)});
    }
}

module.exports = new UserService();