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
        console.log(username)
        sequelize.query(`
        SELECT * FROM users
        WHERE user_username = '${username}';`)
        .then(res2 => {
            console.log(res2.data)
            res.status(200).send(res2[0])})
        .catch(err => {console.log(err)
        console.log("kldjafkdsnvslk")})
    },
    getDbGames : (req,res) => {
        sequelize.query(`
        SELECT * FROM games
        WHERE game_completed = true
        ORDER BY game_id ASC;`)
        .then(dbRes => {
            // console.log(dbRes[0])
            res.status(200).send(dbRes[0])})
        .catch(err => console.log(err))
    }, loadGame : (req,res) => {
        let {gameid} = req.body
        // console.log(gameid)
        sequelize.query(`
        SELECT * FROM gamedata
        WHERE game_id = ${gameid};

        SELECT * from bigblockdata
        WHERE game_id = ${gameid};

        SELECT * FROM blockdata
        WHERE game_id=${gameid};

        SELECT * FROM enemydata
        WHERE game_id=${gameid};

        SELECT * FROM coindata
        WHERE game_id=${gameid}`)
        .then(dbRes => {
            // console.log(dbRes[0])
            res.status(200).send(dbRes[0])})
        .catch(err => console.log(err))
    },
    getGameData : (req,res) => {
        sequelize.query(`
        SELECT * FROM games
        WHERE game_id=${req.body.gameid}`)
        .then(dbRes => {
            res.status(200).send(dbRes[0])})
            .catch(err => {console.log(err)})
        
    },
    addNumbers : (req,res)=>{
        console.log(req.body.gameid)
        // console.log(req.body.deaths, req.body.completions)
        sequelize.query(`
        UPDATE games SET total_deaths = ${req.body.deaths},
        total_completions = ${req.body.completions}
        WHERE game_id=${req.body.gameid};`)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    changeRecord : (req,res)=>{
        // console.log(req.body.time, req.body.user)
        sequelize.query(`
        UPDATE games SET game_record = '${req.body.time}',
        record_user = '${req.body.user}'
        WHERE game_id=${req.body.gameid};`)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}