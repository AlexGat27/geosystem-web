const db = require('../db')

class UserController{

    getUsers(req, res){
        const results = db.query(`SELECT * FROM client`);
        return res.json(results.rows);
    }

    register(req, res){
        const data = req.body

    }
}

module.exports = new UserController()