import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddSVG } from '../assets/svgsComponents'
 import { getTypeContracts, addTypeContract } from '../../actions/typeContract'
import { useAlert } from 'react-alert'


export default function Employee() {
    const dispatch = useDispatch()
    const alert = useAlert()  
    const statusResponse = useSelector(state => state.info.status)
    const typesOfContract = useSelector(state => state.typeContracts.typeContract)
    const [typesOfContractState, setTypesOfContractState] = useState([{
        id: "",
        description: "",
        hoursSunday: "",
        hoursMonday: "",
        hoursTuesday: "",
        hoursWednesday: "",
        hoursThursday: "",
        hoursFriday: "",
        hoursSaturday: ""
    }])
    const [newTypeOfContractState, setNewTypeOfContractState] = useState({
        description: "",
        hoursSunday: "",
        hoursMonday: "",
        hoursTuesday: "",
        hoursWednesday: "",
        hoursThursday: "",
        hoursFriday: "",
        hoursSaturday: ""
    })

    useEffect(() => {
        dispatch(getTypeContracts())
    }, [])

    useEffect(() => {
        if (typesOfContract != undefined && typesOfContract.length !== 0) {
            setTypesOfContractState(typesOfContract)
        } else {
            setTypesOfContractState([{
                id: "",
                description: "",
                hoursSunday: "",
                hoursMonday: "",
                hoursTuesday: "",
                hoursWednesday: "",
                hoursThursday: "",
                hoursFriday: "",
                hoursSaturday: ""
            }])
        }
    }, [typesOfContract])

    useEffect(() => {
        console.log(statusResponse === 201)
        if (statusResponse === 201) {
            setNewTypeOfContractState({
                description: "",
                hoursSunday: "",
                hoursMonday: "",
                hoursTuesday: "",
                hoursWednesday: "",
                hoursThursday: "",
                hoursFriday: "",
                hoursSaturday: ""
            })
        }
    }, [statusResponse])

    const handleChange = e => {
        const { name, value } = e.target
        setNewTypeOfContractState({
            ...newTypeOfContractState,
            [name]: value
        })
    }

    const handleAddNewTypeContract = e => {
        if (newTypeOfContractState.description !== "" && newTypeOfContractState.hoursSunday !== "" && newTypeOfContractState.hoursMonday !== "" && newTypeOfContractState.hoursTuesday !== "" && newTypeOfContractState.hoursWednesday !== "" && newTypeOfContractState.hoursThursday !== "" && newTypeOfContractState.hoursFriday !== "" && newTypeOfContractState.hoursSaturday !== "") {
            dispatch(addTypeContract(newTypeOfContractState))
        } else {
            alert.error("all fields are required")
        }
    }

    
    return (
        <div className="content reports-page">
            <h1 className="title-page">Types of Contract</h1>
            <table className="table-reports">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        typesOfContractState.map(typeOfContract => (
                            typeOfContract.id !== "" ?
                                <tr key={typeOfContract.id} >
                                    <td>{typeOfContract.description}</td>
                                    <td>{typeOfContract.hoursSunday}</td>
                                    <td>{typeOfContract.hoursMonday}</td>
                                    <td>{typeOfContract.hoursTuesday}</td>
                                    <td>{typeOfContract.hoursWednesday}</td>
                                    <td>{typeOfContract.hoursThursday}</td>
                                    <td>{typeOfContract.hoursFriday}</td>
                                    <td>{typeOfContract.hoursSaturday}</td>
                                </tr>
                                :
                                <tr key={typeOfContract.id} ></tr>
                        ))
                    }
                    <tr>
                        <td><input type="text" name="description" onChange={handleChange} value={newTypeOfContractState.description} /></td>
                        <td><input type="time" name="hoursSunday" onChange={handleChange} value={newTypeOfContractState.hoursSunday} /></td>
                        <td><input type="time" name="hoursMonday" onChange={handleChange} value={newTypeOfContractState.hoursMonday} /></td>
                        <td><input type="time" name="hoursTuesday" onChange={handleChange} value={newTypeOfContractState.hoursTuesday} /></td>
                        <td><input type="time" name="hoursWednesday" onChange={handleChange} value={newTypeOfContractState.hoursWednesday} /></td>
                        <td><input type="time" name="hoursThursday" onChange={handleChange} value={newTypeOfContractState.hoursThursday} /></td>
                        <td><input type="time" name="hoursFriday" onChange={handleChange} value={newTypeOfContractState.hoursFriday} /></td>
                        <td><input type="time" name="hoursSaturday" onChange={handleChange} value={newTypeOfContractState.hoursSaturday} /></td>
                        <td>
                            <button className="icon-button" onClick={() => handleAddNewTypeContract()}>
                                <AddSVG />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}