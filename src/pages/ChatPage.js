import {useEffect, useRef, useState} from "react";

const ChatPage = ({name, roomID, isJoin, isCreate, onRoomChange}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messageRef = useRef()
    const [btnDisabled, setBtnDisabled] = useState(true)

    //Scroll bottom into view
    useEffect(() => {
        messageRef.current.scrollIntoView({behavior: 'smooth'})
    })
    //SET SEND BTN TO DISABLED WHEN NO MESSAGE
    useEffect(() => {
        if (message.length > 0){
            setBtnDisabled(false)
        }else if (message.length === 0) {
            setBtnDisabled(true)
        }
    }, [message])

    // SEND ON ENTER
    function handleKey(e) {
        if (e.key === 'Enter') {
            sendMessage(message);
        }
    }
    // SEND ON CLICK SEND BUTTON
    function handleClick() {
        sendMessage(message)
    }
    //HANDLE SOCKET SEND OP
    function sendMessage(msg) {
        // socket.emit('sendMessage', msg)
        if (msg == null || msg.length === 0) {
            return
        }
        setMessages(messages => [...messages, msg]);
        setMessage('')
    }

    return (
        <div>
            <div className='window centred' style={{width: '365px', height: '550px'}}>
                <div className="title-bar">
                    <div className="title-bar-text">Chat95 - Chat Room - ID: {roomID}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Close"/>
                    </div>
                </div>
                <div className="window-body flex-container">
                    <div className='textbox' style={{width: '340px', height: '400px', fontSize: '14px'}}>
                        {/*Put in messages here*/}
                        <ul style={{listStyleType: 'none', marginLeft: '5px', marginTop: '0px', padding: '0'}}>
                            {messages.map((msg, i) => (
                                <li key={i}><p style={{marginBottom: '5px', marginTop: '8px'}}> <span style={{fontWeight: 'bold'}}>USER - </span><span style={{fontWeight: 'normal'}}>{msg}</span></p></li>
                            ))}
                        </ul>
                        <div ref={messageRef}/>
                    </div>
                    <div className='bottom-container'>
                        <textarea
                            className='textarea'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => handleKey(e)}
                            cols='40'
                            rows='4'
                            style={{paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', webkitFontSmoothing: 'antialiased', fontSize: '14px'}}
                        />
                        <button
                            disabled={btnDisabled}
                            onClick={handleClick}
                            style={{webkitFontSmoothing: 'antialiased', paddingTop: '33px', paddingBottom: '33px', marginLeft: '5px', fontSize: '14px'}}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <div className='window centred' style={{marginTop: '560px', width: '365px', height: '125px'}}>
                <div className='window-body'>
                    <p style={{fontSize: '14px'}}>Room ID: </p>
                    <p style={{fontSize: '14px'}}>Users In Room:</p>
                </div>
            </div>
        </div>
    )
}

export default ChatPage