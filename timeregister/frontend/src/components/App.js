// React things
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './layout/Navbar'
import Home from './layout/Home'
import Report from './reports/Report'
import TimeReport from './reports/TimeReport'
// Redux things
import { Provider } from 'react-redux'
import store from '../store'
import "babel-polyfill"


export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/report" component={Report} />
                        <Route exact path="/time-report/:idReport" component={TimeReport} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}