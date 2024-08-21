const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const authMiddleware = (req, res, next) => {
    const jwtHeader = req.headers["authorisation"];
    const token = jwtHeader && jwtHeader.split(' ')[1];
    if (token == null || token === undefined) return res.sendStatus(401).json({message: "Пользователь не авторизован"});
    next();
}

const fizMiddleware = (req, res, next) => {
    const jwtHeader = req.headers["authorisation"];
    const token = jwtHeader && jwtHeader.split(' ')[1];
    let d = jwt.verify(token, keys.jwt);
    console.log(d)
    if (!d.isfiz){
        return res.status(400).json({message: "Пользователь является юридическим лицом"});
    } 
    next();
}

const enterpriseMiddleware = (req, res, next) => {
    const jwtHeader = req.headers["authorisation"];
    const token = jwtHeader && jwtHeader.split(' ')[1];
    let d = jwt.verify(token, keys.jwt);
    if (d.isFiz){
        return res.status(400).json({message: "Пользователь является физическим лицом"});
    } 
    next();
}

module.exports = {
    authMiddleware,
    fizMiddleware,
    enterpriseMiddleware
}