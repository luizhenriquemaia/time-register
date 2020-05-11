// React things
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './layout/Navbar'
import Home from './layout/Home'
import NewRegister from './register/NewRegister'
import UnsentReport from './register/UnsentReport'
// Redux things
import { Provider } from 'react-redux'
import store from '../store'


export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/new-register" component={NewRegister} />
                        <Route exact path="/unsent-report" component={UnsentReport} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}