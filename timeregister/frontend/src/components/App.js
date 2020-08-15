import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import Navbar from './layout/Navbar'
import Routes from './routes'

import { Provider } from 'react-redux'
import store from '../store'
import "babel-polyfill"

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './layout/Alerts'



const alertOptions = {
    timeout: 3000,
    position: 'top center'
}


export default function App() {
    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Alerts />
                    <Navbar />
                    <Routes />
                </Router>
            </AlertProvider>
        </Provider>
    )
}