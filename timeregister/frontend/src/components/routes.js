import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './auth/Login'
import Logout from './auth/Logout'
import Register from './auth/Register'
import Home from './layout/Home'
import Report from './reports/Report'
import TimeReport from './reports/TimeReport'
import Employee from './employees/Employee'
import { loadUser } from '../actions/auth'


const PrivateRoute = ({ component, ...options }) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(loadUser())
    }, [])

    return (
        <Route
            {...options}
            render={props => {
                if (auth.isLoading) {
                    return <h2>Loading...</h2>
                } else if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />
                } else {
                    return <Route {...options} component={component} />
                }
            }}
        />
    )

}


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/logout" component={Logout} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/report" component={Report} />
            <PrivateRoute exact path="/employee" component={Employee} />
            <PrivateRoute exact path="/time-report/:idReport" component={TimeReport} />
        </Switch>
    )
}