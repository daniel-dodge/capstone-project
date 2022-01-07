const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {createNewUser, checkExistingUser, getDbGames, loadGame, getGameData, addNumbers, changeRecord} = require("./controller.js")
// const {SERVER_PORT} = process.env

app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'))
})
app.get('/createlevel', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/createlevel.html'))
  })
  app.get('/browselevels', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/browselevels.html'))
  })
  app.get('/mygames', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mygames.html'))
  })
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/menus.js'))
})
app.get('/create', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/createlevel.js'))
  })
app.get('/jssignup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.js'))
})
app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/styles.css'))
  })
app.get('/jslogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.js'))
})
app.get('/playgame', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/playgame.html'))
})
app.get('/jsgame', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/gamelogic.js'))
})
app.get('/browsegame', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/browse.js'))
})
app.post('/login', checkExistingUser)
app.post('/user', createNewUser)
app.get('/browse', getDbGames)
app.post('/gamedata', getGameData)
app.post('/game', loadGame)
app.put('/total', addNumbers)
app.put('/game', changeRecord)
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})