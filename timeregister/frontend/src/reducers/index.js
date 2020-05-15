import { combineReducers } from 'redux'
import timeRegister from './timeRegister'
import employees from './employees'
import typeContracts from './typeContract'
import reports from './reports'
import detailsReport from './detailsReport'
import errors from './errors'


export default combineReducers({
    timeRegister,
    employees,
    typeContracts,
    reports,
    detailsReport,
    errors,
})