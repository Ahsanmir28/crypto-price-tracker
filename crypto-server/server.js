const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const mongodb_client = require('./clients/mongodb')

app.use(cors())
app.use(express.json())

app.use('/v1/coin-gecko', require('./utils/coin-gecko'))
app.use('/v1/user', require('./routes/user'))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})