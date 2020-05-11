import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTimeRegisters } from '../../actions/timeRegister'


function UnsentReport() {
    // used to referer to dispatch method from redux
    const dispatch = useDispatch()
    // useEffect is similar to component did mount and component did update
    useEffect(() => {
        dispatch(getTimeRegisters())
    }, [])

    const timeRegisters = useSelector(state => state.timeRegister)
    console.log(timeRegisters)

    return (
        <div className="content">
            <h1 className="title-page">Unsent Reports</h1>
            <h4 className="dates-right">09/05/2020 - 31/05/2020</h4>
        </div>
    )
}

export default UnsentReport