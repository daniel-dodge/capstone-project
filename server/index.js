const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

app.use(express.json())


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})