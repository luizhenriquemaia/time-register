import React from 'react'
// import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Home from './layout/Home'
import Report from './reports/Report'
import TimeReport from './reports/TimeReport'


// const PrivateRoute = ({ component, ...options }) => {
//     const auth = useSelector(state => state.auth)
//     return (
//         <Route
//             {...options}
//             render={props => {
//                 if (auth.isLoading) {
//                     return <h2>Loading...</h2>
//                 } else if (!auth.isAuthenticated) {
//                     return <Redirect to="/login" />
//                 } else {
//                     return <Route {...options} component={component} />
//                 }
//             }}
//         />
//     )

// }


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/time-report/:idReport" component={TimeReport} />
        </Switch>
    )
}