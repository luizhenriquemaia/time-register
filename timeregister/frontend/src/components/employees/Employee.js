import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CancelSVG, AddSVG } from '../assets/svgsComponents'
import { getEmployees, addEmployee, deleteEmployee } from '../../actions/employees'
import { useAlert } from 'react-alert'


export default function Employee() {
    const dispatch = useDispatch()
    const alert = useAlert()  
    const employees = useSelector(state => state.employees.employee)
    const employeeWasAdded = useSelector(state => state.employees.wasAdded)
    const [employeesState, setEmployeesState] = useState([{
        id: "",
        name: "",
        function: "",
        description: "",
        active: false
    }])
    const [newEmployeeState, setNewEmployeeState] = useState({
        name: "",
        function: "",
        description: "",
        active: false
    })    

    useEffect(() => {
        if (employees != undefined && employees.length !== 0) {
            setEmployeesState(employees)
        } else {
            setEmployeesState([{
                id: "",
                name: "",
                function: "",
                description: "",
                active: false
            }])
        }
    }, [employees])

    useEffect(() => {
        dispatch(getEmployees())
    }, [])

    const handleDelete = (idEmployee) => dispatch(deleteEmployee(idEmployee))

    const handleChange = e => {
        const { name, value } = e.target
        setNewEmployeeState({
            ...newEmployeeState,
            [name]: value
        })
    }

    const handleAddEmployee = e => {
        if (newEmployeeState.name !== "" && newEmployeeState.function !== "" && newEmployeeState.description !== "") {
            dispatch(addEmployee(newEmployeeState))
        } else {
            alert.error("all fields are required")
        }
    }


    return (
        <div className="content reports-page">
            <h1 className="title-page">Employees</h1>
            <table className="table-reports">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Function</th>
                        <th>Description</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employeeWasAdded ?
                        <tr>
                            <td>{employeesState.name}</td>
                            <td>{employeesState.function}</td>
                            <td>{employeesState.description}</td>
                            <td>{employeesState.active}</td>
                            <td>
                                <button className="icon-button" onClick={() => handleDelete(employeesState.id)}>
                                    <CancelSVG />
                                </button>
                            </td>
                        </tr> :
                        employeesState.map(employee => (
                            employee.id !== "" ?
                                <tr key={employee.id} >
                                    <td>{employee.name}</td>
                                    <td>{employee.function}</td>
                                    <td>{employee.description}</td>
                                    <td>{employee.active}</td>
                                    <td>
                                        <button className="icon-button" onClick={() => handleDelete(employee.id)}>
                                            <CancelSVG />
                                        </button>
                                    </td>
                                </tr>
                                :
                                <tr key={employee.id} ></tr>
                        ))
                    }
                    
                    <tr>
                        <td>
                            <input type="text" name="name" onChange={handleChange} />
                        </td>
                        <td>
                            <input type="text" name="function" onChange={handleChange} />
                        </td>
                        <td>
                            <input type="text" name="description" onChange={handleChange} />
                        </td>
                        <td>
                            <input type="checkbox" name="active" onChange={handleChange} />
                        </td>
                        <td>
                            <button className="icon-button" onClick={() => handleAddEmployee()}>
                                <AddSVG />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}