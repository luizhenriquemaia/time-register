import { combineReducers } from 'redux'
import timeRegister from './timeRegister'
import employees from './employees'
import typeContracts from './typeContract'
import errors from './errors'


export default combineReducers({
    timeRegister,
    employees,
    typeContracts,
    errors,
})