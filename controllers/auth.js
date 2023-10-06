const db = require("../models/index")

class AuthController{

    async getUsualUsers(req, res){
        const result = await db.UsualUser.findAll();
        res.json(result);
    }

    async registerUsualUser(req, res){
        let d = req.body;
        const result = await db.UsualUser.create({
            email: d.email,
            password: d.password,
            isfiz: true
        })
        res.json({"message": "Succesfuly"});
    }

    async getEnterpriseUsers(req, res){
        const result = await db.EnterpriseUser.findAll({
            where: {isfiz: false}
        })
        res.json(result);
    }

    async registerEnterpriseUser(req, res){
        let d = req.body;
        const result = await db.EnterpriseUser.create({
            email: d.email,
            password: d.password,
            isfiz: false
        })
        res.json({"message": "Succesfuly"});
    }
}

module.exports = new AuthController()