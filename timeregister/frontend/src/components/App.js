// React things
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './layout/Navbar'
import Home from './layout/Home'
import NewRegister from './register/NewRegister'


function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/new-register" component={NewRegister} />
                </Switch>
            </div>
        </Router>
    )
}


ReactDOM.render(<App />, document.getElementById('app'))