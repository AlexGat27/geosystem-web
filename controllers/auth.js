const clientDB = require('../db')

class UserController{

    async register(req, res){
        const {email, pswd, isLeg} = req.body
        const newPerson = await clientDB.query(`INSERT INTO client (email, password, isLegacy) VALUES (${demail},${pswd},${isLeg});`)
        res.status(200).json(newPerson.rows[0])
    }

}

module.exports = new UserController()