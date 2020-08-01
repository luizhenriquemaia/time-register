// React things
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// Components
import Navbar from './layout/Navbar'
import Routes from './routes'
// Redux things
import { Provider } from 'react-redux'
import store from '../store'
import "babel-polyfill"


export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes />
            </Router>
        </Provider>
    )
}