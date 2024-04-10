const { Op } = require("sequelize"); //Объект для моделирования операций в SQL ORM
const jwt = require("jsonwebtoken"); //Модуль создания jwt-токенов
const keys = require("../config/keys") //Ключи
const { UserModel, UsualUserModel, EnterpriseUserModel } = require("../models/user"); //Импорт моделей пользователей
const bcrypt = require("bcryptjs") //Модуль для создания хеша для паролей

//Класс-сервис для выполнения бизнесс логики с моделями пользователей
class UserService{

    //Получение данных из jwt-токена
    getJwtData(jwtHeader){
        const token = jwtHeader && jwtHeader.split(' ')[1];
        const data = jwt.verify(token, keys.jwt);
        return data;
    }
    //Получение данных физического лица
    async getUsualUser(login){
        return await UserModel.findOne({
            include: [{
                model: UsualUserModel,
                attributes: ["count_potholes", "count_photos"],
            }],
            attributes: [
                "id", "login", "email", "isfiz"
            ],
            where: { login: login }
        }).catch(er => console.log(er));
    }
    //Получение данных юридического лица
    async getEnterpriseUser(login){
        return await UserModel.findOne({
            include: [{
                model: EnterpriseUserModel,
                attributes: ["count_orders"],
            }],
            attributes: [
                "id", "login", "email", "isfiz"
            ],
            where: { login: login }
        });
    }
    //Проверка логина и пароля
    async checkCredentials(login, password){
        const candidate = await UserModel.findOne({
            attributes: ["id", "login", "passwordHash", "isfiz", "email"],
            where: { login: login }
        });
        if (bcrypt.compareSync(password, candidate.passwordHash)){return candidate;}
        else { return false; };
    }
    //Создание пользователя
    async createUser(data){
        const candidate = await UserModel.findOne({ 
            where: { [Op.or]:[
                { email: data.email },
                { login: data.login }
            ]}});
        if (candidate){return false};

        const hashPassword = bcrypt.hashSync(data.password, 10);

        let new_user = await UserModel.create({
            login: data.login,
            passwordHash: hashPassword,
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
    //Удаление пользователя
    async deleteUser(login){
        const user = await UserModel.destroy({ where: { login: login } });
        return user;
    }
    //Обновление у физического лица количества фото и обнаруженных ям
    async setUsualUserPothole(_userId, count){
        await UsualUserModel.increment({
            count_photos: 1,
            count_potholes: count,
        }, {where: { userId: _userId}})
        .then(() => {console.log("Succesfuly increment count of potholes")})
        .catch(er => {console.log(er)});
    }
}

module.exports = new UserService();