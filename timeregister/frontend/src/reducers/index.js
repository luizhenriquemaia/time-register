import { combineReducers } from 'redux'
import timeReport from './timeReport'
import employees from './employees'
import typeContracts from './typeContract'
import reports from './reports'
import errors from './errors'


export default combineReducers({
    timeReport,
    employees,
    typeContracts,
    reports,
    errors,
})