const express = require('express')
const app = express()
const cors = require('cors')
// const {SERVER_PORT} = process.env

app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/menus.js'))
  })
app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.css'))
  })
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})