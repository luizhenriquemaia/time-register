import { combineReducers } from 'redux'
import timeRegister from './timeRegister'
import employees from './employees'
import errors from './errors'


export default combineReducers({
    timeRegister,
    employees,
    errors,
})