import React, { useState, useEffect } from 'react'
const axios = require('axios').default;

function student(props) {
    const [students, setStudents] = useState([])

    useEffect(() => {
        let url = "http://localhost:3001/students"
        let regno = props?.regno
        if (regno) {
            url = `http://localhost:3001/students/${regno}/result`
        }
        axios.get(url)
            .then(res => {
                if (res?.data?.found) {
                    if (regno) {
                        console.log("****", res?.data?.student);
                        setStudents([res?.data?.student])
                    }
                    else {
                        console.log("----------", [res?.data?.students]);

                        setStudents(res?.data?.students)
                    }
                } else {
                    setStudents([])
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [props])




    return (
        <div className='i-my-1'>
            <div className='i-mx-2 i-my-2 i-fs-2'>ENROLLED STUDENTS</div>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-between i-mx-2 i-bdb-cc i-px-1'>
                    <div className='i-w-5'>Reg. No.</div>
                    <div className='i-w-5'>Name</div>
                    <div className='i-w-5'>Age</div>
                    <div className='i-w-5'>Mark1</div>
                    <div className='i-w-5'>Mark2</div>
                    <div className='i-w-5'>Mark3</div>

                </div>
                {
                    students.length
                        > 0
                        ? students.map((std, i) => (
                            <div className='d-flex flex-row justify-content-between i-mx-2 i-px-1 i-bdb-cc'>
                                <div className='i-w-5'>{std.id}</div>
                                <div className='i-w-5'>{std.name}</div>
                                <div className='i-w-5'>{std.age}</div>
                                <div className='i-w-5'>{std.mark1}</div>
                                <div className='i-w-5'>{std.mark2}</div>
                                <div className='i-w-5'>{std.mark3}</div>
                            </div>
                        ))
                        : <div className='d-flex flex-row justify-content-center'>
                            <div className='i-my-2 i-fs-2'>No result found</div>
                        </div>
                }
            </div>
        </div>
    )
}

export default student