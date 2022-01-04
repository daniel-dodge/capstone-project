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

        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}