// React things
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './layout/Navbar'
import Home from './layout/Home'


function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    )
}


ReactDOM.render(<App />, document.getElementById('app'))