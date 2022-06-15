import React, { useState, useEffect } from 'react'
const axios = require('axios').default;

function addstudent() {


    const [students, setStudents] = useState({ enrolled: [], failed: [] })
    const [file, setFile] = useState(null)

    function onFormSubmit() {
        if (file) {
            const url = 'http://localhost:3001/upload';
            const formData = new FormData();
            formData.append('files', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url, formData, config)
                .then((response) => {
                    if (response?.data?.success) {
                        setStudents({ enrolled: response?.data?.result?.inserted || [], failed: response?.data?.result?.failed || [] })
                    } else {
                        setStudents({ enrolled: response?.data?.result?.inserted || [], failed: response?.data?.result?.failed || [] })
                    }
                    console.log(response.data);
                })
        } else {

        }
    }

    return (
        <div>
            <div className='i-my-1'>
                <div className='d-flex flex-row justify-content-between'>
                    <div className='i-mx-2 i-my-2 i-fs-2'>ENROLL STUDENT</div>
                </div>
                <div className='d-flex flex-column'>
                    <div className='i-mx-2 '>Upload csv file</div>
                    <div className='d-flex flex-row'>
                        <div className='i-mx-2 '>
                            <input type={"file"} onChange={(e) => { setFile(e.target.files[0]) }} />
                        </div>
                        <div><button onClick={() => { onFormSubmit() }}>Upload</button></div>
                    </div>
                </div>
                <div className='d-flex flex-column i-my-2 i-mx-2 i-my-2 i-bdb-cc'>
                    <div className='i-mx-2  i-fs-1 i-my-1'>Successfull Student Enrollment</div>
                    <div className='d-flex flex-row justify-content-between i-mx-2 i-bdb-cc i-px-1'>
                        <div className='i-w-5'>Reg. No.</div>
                        <div className='i-w-5'>Name</div>
                        <div className='i-w-5'>Age</div>
                        <div className='i-w-5'>Mark1</div>
                        <div className='i-w-5'>Mark2</div>
                        <div className='i-w-5'>Mark3</div>
                    </div>
                    {
                        students?.enrolled.length
                            > 0
                            ? students?.enrolled.map((std, i) => (
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
                                <div className='i-my-2 i-fs-1'>No result found</div>
                            </div>
                    }
                </div>

                <div className='d-flex flex-column i-my-2 i-mx-2 i-my-2 i-bdb-cc'>
                    <div className='i-mx-2  i-fs-1 i-my-1'>Failed Student Enrollment</div>
                    <div className='d-flex flex-row justify-content-between i-mx-2 i-bdb-cc i-px-1'>
                        <div className='i-w-5'>Reg. No.</div>
                        <div className='i-w-5'>Name</div>
                        <div className='i-w-5'>Age</div>
                        <div className='i-w-5'>Mark1</div>
                        <div className='i-w-5'>Mark2</div>
                        <div className='i-w-5'>Mark3</div>
                    </div>
                    {
                        students?.failed.length
                            > 0
                            ? students?.failed.map((std, i) => (
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
                                <div className='i-my-2 i-fs-1'>No result found</div>
                            </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default addstudent