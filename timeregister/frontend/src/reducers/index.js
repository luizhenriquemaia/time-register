import { combineReducers } from 'redux'
import timeReport from './timeReport'
import employees from './employees'
import typeContracts from './typeContract'
import reports from './reports'
import errors from './errors'
import auth from './auth'


export default combineReducers({
    timeReport,
    auth,
    employees,
    typeContracts,
    reports,
    errors,
})