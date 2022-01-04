require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    createNewUser: (req,res) => {
        let {
            username,
            password
        } = req.body
        sequelize.query(`
        INSERT INTO users (user_username, user_password)
        VALUES ('${username}','${password}')`)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    checkExistingUser : (req,res) =>{
        let {username} = req.body
        sequelize.query(`
        SELECT * FROM users
        WHERE user_username = '${username}';`)
        .then(res2 => {
            console.log(res2.data)
            res.status(200).send(res2[0])})
        .catch(err => {console.log(err)
        console.log("kldjafkdsnvslk")})
    }
}