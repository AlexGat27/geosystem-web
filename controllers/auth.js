const db = require("../models/index")

class AuthController{

    async getUsers(req, res){
        const result = await db.User.findAll();
        res.json(result);
    }
    async getUsualUsers(req, res){
        const result = await db.UsualUser.findAll();
        res.json(result);
    }
    async getEnterpriseUsers(req, res){
        const result = await db.EnterpriseUser.findAll({
            where: {isfiz: false}
        })
        res.json(result);
    }

    async registerUser(req, res){
        let d = req.body;
        const result = await db.User.create({
            login: d.login,
            password: d.password,
            phone_number: d.phone_number,
            email: d.email,
            isfiz: d.isfiz
        })
        if (result.isfiz){addUsualUser();}
        else {addEnterpriseUser(d.EnterpriseProperties)}
    }

    async addUsualUser(){
        await db.UsualUser.create({
            count_photos: 0,
            bonus_balance: 0
        })
    }

    async addEnterpriseUser(d){
        await db.EnterpriseUser.create({
            company: d.company,
            sector: d.sector,
        })
        res.json({"message": "Succesfuly"});
    }
}

module.exports = new AuthController()