import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import io from "socket.io-client"


import "./Chat.css"
import Input from "../Input/Input"
import InfoBar from "../InfoBar/InfoBar"
import Messages from "../Messages/Messages"
import TextContainer from "../TextContainer/TextContainer"

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState('')

    const ENDPOIND = 'http://localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOIND)
        setName(name)
        setRoom(room)
        socket.emit("join", { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        })
    }, [ENDPOIND, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(""))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat