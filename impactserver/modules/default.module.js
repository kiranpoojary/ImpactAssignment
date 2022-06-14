
const Pool = require('pg-pool')

module.exports =
    class Default {
        constructor() {
            this.pg = new Pool({
                host: "localhost",
                database: "impactdb",
                user: "postgres",
                password: "hire123",
                max: 2000,
                min: 4,
                idleTimeoutMillis: 1000,
                connectionTimeoutMillis: 50000
            })
        }

        async insertStudent(std) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = await this.pg.query("INSERT INTO students(id,name, age, mark1, mark2, mark3) VALUES($1,$2,$3,$4,$5,$6)", [std.id, std.name, std.age, std.mark1, std.mark2, std.mark3])
                    if (result.rowCount > 0)
                        resolve(true)
                    else
                        resolve(false)
                } catch (error) {
                    resolve(false)
                }
            })

        }

        async studentBulkInsert(students = []) {
            let result = { inserted: [], failed: [] }
            try {
                for (let index = 0; index < students.length; index++) {
                    const std = students[index]
                    const inserted = await this.insertStudent(std)
                    if (inserted) {
                        result.inserted.push(std.id)
                    } else {
                        result.failed.push(std.id)
                    }
                }
                let message = students.length == result.inserted.length
                    ? "Students details added successfuly"
                    : result.inserted.length > 0 ? "failed to add some of the student details" : "None of the student data added to database, check if already added";
                return ({ statusCode: 200, success: result.inserted.length > 0, result: result, message })
            } catch (error) {
                return ({ statusCode: 500, success: false, result: result, message: "Something went wrong, Try again" })
            }
        }


        async getStudentResult(id = null) {
            try {
                let result = null
                result = await this.pg.query("SELECT * FROM students WHERE id=$1", [id])
                if (result.rows.length > 0) {
                    return ({ statusCode: 200, found: true, student: result.rows[0] })
                } else {
                    return ({ statusCode: 200, found: false, message: "Invalid student ID" })
                }
            } catch (error) {
                return ({ statusCode: 500, found: false, message: "Something went wrong, Try again" })

            }
        }

        async getStudentsByResult(result) {
            try {
                let allStudents = await this.pg.query("SELECT * FROM students")
                if (allStudents?.rows?.length > 0) {

                    let stdResult = allStudents.rows.reduce((result, std) => {
                        if (((std.mark1 + std.mark2 + std.mark3) / 3) >= 35 && (std.mark1 >= 35 && std.mark2 >= 35 && std.mark3 >= 35)) {
                            result?.passed.push(std)
                        } else {
                            result?.failed.push(std)
                        }
                        return result
                    }, { passed: [], failed: [] })

                    return ({ statusCode: 200, found: (stdResult[result] || []).length > 0, students: stdResult[result] })

                } else {
                    return ({ statusCode: 200, found: false, message: `No students  found in your database` })
                }
            } catch (error) {
                console.log(error);
                return ({ statusCode: 500, found: false, message: "Something went wrong, Try again" })
            }
        }
    }


// let d = new Default()
// d.forLoop()
