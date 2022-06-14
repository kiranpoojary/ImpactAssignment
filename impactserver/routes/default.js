const app = require('express')
const router = app.Router()
const csv = require('csvtojson')

let Default = require('../modules/default.module')
let std = new Default()

router.get("/", (req, res) => {
    res.send("Default route")
})

router.post("/upload", async (req, res) => {
    let csvBuffer = req.files.files.data
    let csvStr = csvBuffer.toString("utf-8")
    let students = await csv({ noheader: false, output: "json" }).fromString(csvStr)
    let result = await std.studentBulkInsert(students)
    res.status(result.statusCode).json(result)

})

router.get("/students", async (req, res) => {
    let result = await std.getStudentsByResult(req?.query?.resultStatus)
    res.status(result.statusCode).json(result)
})

router.get("/students/:id/result", async (req, res) => {
    let result = await std.getStudentResult(req?.params?.id)
    res.status(result.statusCode).json(result)
})



module.exports = router