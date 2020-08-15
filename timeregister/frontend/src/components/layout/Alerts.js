import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { resetMessages } from '../../actions/messages'



export default function Alerts() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const infoMessage = useSelector(state => state.info.msg)
    const infoStatus = useSelector(state => state.info.status)
    const [messageState, setMessageState] = useState("")
    const [shouldResetMessage, setShouldResetMessage] = useState(false)


    useEffect(() => {
        if (infoMessage === "generic get message") {
            setShouldResetMessage(true)
        } else {
            if (messageState === "" && !shouldResetMessage && infoMessage !== "") {
                setMessageState(infoMessage)
            } else {
                setShouldResetMessage(false)
            }
        }
    }, [infoMessage])

    useEffect(() => {
        if (shouldResetMessage) {
            setMessageState("")
            dispatch(resetMessages())
        }
    }, [shouldResetMessage])


    useEffect(() => {
        if (messageState) {
            if (infoStatus >= 500) alert.error("Erro interno do servidor")
            if (infoStatus >= 400 && infoStatus < 500) alert.error(messageState)
            if (infoStatus >= 200 && infoStatus < 400 && messageState) alert.success(messageState)
            setShouldResetMessage(true)
        }
    }, [messageState])


    return <Fragment />
}