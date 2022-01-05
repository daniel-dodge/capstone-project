const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {createNewUser, checkExistingUser} = require("./controller.js")
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
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/menus.js'))
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
app.post('/login', checkExistingUser)
app.post('/user', createNewUser)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})