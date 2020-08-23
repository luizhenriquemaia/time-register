import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { CancelSVG, AddSVG } from '../assets/svgsComponents'
import { getEmployees } from '../../actions/employees'
import { getTypeContracts } from '../../actions/typeContract'
import { getReports, addReport, deleteReport } from '../../actions/reports'


const styleSelectReact = {
    option: (provided, {isFocused, isSelected}) => ({
        ...provided,
        color: isSelected ? 'black' : isFocused ? 'black' : '#F7F7F7',
        backgroundColor: isSelected ? '#F7F7F7' : isFocused ? '#C0E5ED' : '#6E8F96',
        padding: 20,
    }),
    menu: (provided) => ({ 
        ...provided, 
        backgroundColor: '#6E8F96',
        border: '6px solid transparent'
    })
    
}


export default function Report() {
    const dispatch = useDispatch()
    const history = useHistory()
    const reports = useSelector(state => state.reports.report)
    const employees = useSelector(state => state.employees.employee)
    const typeContracts = useSelector(state => state.typeContracts.typeContract)
    const [reportsState, setReportsState] = useState([{
        id: "",
        initialDate: "",
        finalDate: "",
        employee: "",
        typeContract: ""
    }])
    const [newReportState, setNewReportState] = useState({
        initialDate: "",
        finalDate: "",
        employee: -1,
        typeContract: -1
    })
    const [optionsSelectEmployees, setOptionsSelectEmployees] = useState([{
        value: -1, label: ""
    }])
    const [optionsSelectTypeContract, setOptionsSelectTypeContract] = useState([{
        value: -1, label: ""
    }])

    const getUniqueValues = (array, valueToCompare) => {
        const uniqueArray = array
            // store the comparison values in array
            .map(element => element[valueToCompare])
            // store the keys of the unique objects
            .map((element, index, final) => final.indexOf(element) === index && index)
            // eliminate the dead keys & store unique objects
            .filter(element => array[element])
            .map(element => array[element])
        return uniqueArray
    }

    /* set the options states for the selects */
    useEffect(() => {
        if (employees != undefined && employees.length !== 0) {
            let listOptionsToState = []
            employees.map(employee => {
                listOptionsToState.push({
                    value: employee.id, label: employee.name
                })
            })
            setOptionsSelectEmployees(getUniqueValues(listOptionsToState, "value"))
        }
    }, [employees])

    useEffect(() => {
        if (typeContracts != undefined && typeContracts.length !== 0) {
            let listOptionsToState = []
            typeContracts.map(typeContract => {
                listOptionsToState.push({
                    value: typeContract.id, label: typeContract.description
                })
            })
            setOptionsSelectTypeContract(getUniqueValues(listOptionsToState, "value"))
        }
    }, [typeContracts])

    useEffect(() => {
        if (reports !== undefined && reports.length !== 0) setReportsState(reports)
    }, [reports])

    useEffect(() => {
        dispatch(getReports())
        dispatch(getEmployees())
        dispatch(getTypeContracts())
    }, [])
    
    const handleDelete = (idReport) => dispatch(deleteReport(idReport))

    const handleClick = (idReport) => history.push(`time-report/${idReport}`)

    const handleChange = e => {
        const { name, value } = e.target
        setNewReportState({
            ...newReportState,
            [name]: value
        })
    }

    const handleSelectChange = (valueOfObject, objectWhoCalls) => {
        if (objectWhoCalls.action === "select-option") {
            setNewReportState({
                ...newReportState,
                [objectWhoCalls.name]: valueOfObject.value
            })
        } else if (objectWhoCalls.action === "clear") {
            setNewReportState({
                ...newReportState,
                [objectWhoCalls.name]: ""
            })
        }
    }

    const handleAddReport = e => {
        const { initialDate, finalDate, } = newReportState
        const employee_id = newReportState["employee"]
        const typeContract_id = newReportState["typeContract"]
        if (initialDate === "" || finalDate === "") {
            console.log("invalid date")
        } else {
            if (employee_id === -1 || employee_id === "") {
                console.log("invalid employee")
            } else {
                if (typeContract_id === -1 || typeContract_id === "") {
                    console.log("invalid type of contract")    
                } else {
                    const newReport = { employee_id, typeContract_id, initialDate, finalDate }
                    dispatch(addReport(newReport))
                }
            }
        }
    }
    

    return (
        <div className="content reports-page">
            <h1 className="title-page">Reports</h1>
            <table className="table-reports">
                <thead>
                    <tr>
                        <th>Initial Date</th>
                        <th>Final Date</th>
                        <th>Employee</th>
                        <th>Type of Contract</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reportsState.map(report => (
                        report.id !== "" ? 
                                <tr key={report.id} >
                                    <td onClick={() => handleClick(report.id)} >{report.initialDate}</td>
                                    <td>{report.finalDate}</td>
                                    <td>{report.employee.name}</td>
                                    <td>{report.typeContract.description}</td>
                                    <td>
                                        <button className="icon-button" onClick={() => handleDelete(report.id)}>
                                            <CancelSVG />
                                        </button>
                                    </td>
                                </tr>
                            : 
                                <tr key={report.id} ></tr>
                    ))}
                    <tr>
                        <td>
                            <input type="date" name="initialDate" onChange={handleChange}/>
                        </td>
                        <td>
                            <input type="date" name="finalDate" onChange={handleChange} />
                        </td>
                        <td>
                            <Select 
                                styles={styleSelectReact}
                                options={optionsSelectEmployees}
                                isSearchable={true}
                                isClearable={true}
                                id="employees" name="employee"
                                onChange={handleSelectChange}
                            />
                        </td>
                        <td>
                            <Select
                                styles={styleSelectReact}
                                options={optionsSelectTypeContract}
                                isSearchable={true}
                                isClearable={true}
                                id="typeContract" name="typeContract"
                                onChange={handleSelectChange}
                            />
                        </td>
                        <td>
                            <button className="icon-button" onClick={() => handleAddReport()}>
                                <AddSVG />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}