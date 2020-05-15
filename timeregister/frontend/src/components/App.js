// React things
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './layout/Navbar'
import Home from './layout/Home'
import NewReport from './reports/NewReport'
import Report from './reports/Report'
import UnsentReport from './reports/UnsentReport'
import DetailsReport from './reports/DetailsReport'
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
                        <Route exact path="/new-report" component={NewReport} />
                        <Route exact path="/report" component={Report} />
                        <Route exact path="/details-report/:id" component={DetailsReport} />
                        <Route exact path="/unsent-report" component={UnsentReport} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}