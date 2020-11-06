import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom"

import Message from "../Message/Message"
import './Messages.css'

const Messages = ({ messages, name }) => {
    return (
        <>
            {!messages ? <div>Loading...</div> : (
                <ScrollToBottom className="messages messages-container">
                    {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
                </ScrollToBottom>
            )}
            <div id="bottom"></div>
        </>
    )
}

export default Messages