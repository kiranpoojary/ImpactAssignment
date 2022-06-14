const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')

let fileupload = require('express-fileupload')
const Default = require('./routes/default')

app.use(cors())
app.use(bodyparser.json())
app.use(fileupload())
app.use(logger)

function logger(req, res, next) {
    console.log(req.originalUrl);
    next()
}

app.use("/", Default)

app.listen(3001, (err) => {
    if (!err) {
        console.log("Server running in port 3001");
    } else {
        console.log("Server failed");
    }
})