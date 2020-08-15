import { combineReducers } from 'redux'
import timeReport from './timeReport'
import employees from './employees'
import typeContracts from './typeContract'
import reports from './reports'
import errors from './errors'
import auth from './auth'
import info from './info'
import messages from './messages'


export default combineReducers({
    timeReport,
    auth,
    employees,
    typeContracts,
    reports,
    errors,
    info,
    messages,
})