import React, { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
const axios = require('axios').default;

function result() {
    const [result, setResult] = useState('passed')
    const [students, setStudents] = useState([])

    useEffect(() => {
        let url = "http://localhost:3001/students"

        axios.get(url, { params: { resultStatus: result } })
            .then(res => {
                if (res?.data?.found)
                    setStudents(res?.data?.students)
                else {
                    setStudents([])

                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [result])

    return (
        <div className='i-my-1'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='i-mx-2 i-my-2 i-fs-2'>STUDENT RESULT</div>
                <div className='i-mx-2 i-my-2 i-fs-2'>
                    <FormControl>
                        <RadioGroup
                            value={result}
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value={'passed'} onClick={() => { setResult('passed') }} control={<Radio />} label="Passed" />
                            <FormControlLabel value={'faied'} onClick={() => { setResult('failed') }} control={<Radio />} label="Failed" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
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

export default result