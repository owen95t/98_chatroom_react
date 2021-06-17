import {useEffect, useRef, useState} from "react";
import socket from '../socket/socket'

const ChatPage = ({name, roomID, isJoin, isCreate, onRoomChange}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messageRef = useRef()
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [me, setMe] = useState('')
    const [users, setUsers] = useState([])

    //MAIN USEEFFECT
    useEffect(() => {
        socket.connect()
        setMe(name)

        if (isJoin && !isCreate) {
            console.log('JOIN')
            socket.emit('join', {name, room: roomID})
        } else if (!isJoin && isCreate) {
            console.log('CREATE')
            socket.emit('create', name)
        }
    }, [])

    useEffect(() => {
        socket.on('roomID', room => {
            onRoomChange(room)
        })
        socket.on('message', ({user, message}) => {
            setMessages(messages => [...messages, {user, message}])
        })
        socket.on('event-message', response => {
            setMessages(messages => [...messages, {user: 'server', message: response}])
        })
        socket.on('user-list', response => {
            setUsers([])
            setUsers(response)
        })
    }, [])

    //Scroll bottom into view
    useEffect(() => {
        messageRef.current.scrollIntoView({behavior: 'smooth'})
    })

    //SET SEND BTN TO DISABLED WHEN NO MESSAGE
    useEffect(() => {
        if (message.trim().length > 0) {
            setBtnDisabled(false)
        } else if (message.trim().length === 0) {
            setBtnDisabled(true)
        }
    }, [message])

    useEffect(() => {
        return () => {
            //On destroy
            setMe('')
            setUsers([])
            setMessages([])
            setMessage('')
            socket.disconnect()
        };
    }, [])

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
        if (msg == null || msg.length === 0) {
            return
        }
        socket.emit('sendMessage', msg)
        setMessages(messages => [...messages, {user: me, message: msg}]);
        setMessage('')
        console.log(messages)
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
                        {/*CHECK IF MESSAGE FROM ME OR FROM OTHER.*/}
                        <ul style={{listStyleType: 'none', marginLeft: '5px', marginTop: '0px', padding: '0'}}>
                            {messages.map((msgObj, i) => (
                                <li key={i}>
                                    <p style={{marginBottom: '5px', marginTop: '8px'}}>
                                        <span style={{fontWeight: 'bold'}}>{msgObj.user} - </span>
                                        <span style={{fontWeight: 'normal'}}>{msgObj.message}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div ref={messageRef} />
                    </div>
                    <div className='bottom-container'>
                        <textarea
                            className='textarea'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => handleKey(e)}
                            cols='40'
                            rows='4'
                            style={{
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                paddingLeft: '8px',
                                webkitFontSmoothing: 'antialiased',
                                fontSize: '14px'
                            }}
                        />
                        <button
                            disabled={btnDisabled}
                            onClick={handleClick}
                            style={{
                                webkitFontSmoothing: 'antialiased',
                                paddingTop: '33px',
                                paddingBottom: '33px',
                                marginLeft: '5px',
                                fontSize: '14px'
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <div className='window centred' style={{marginTop: '560px', width: '365px', height: '175px'}}>
                <div className='window-body'>
                    <p style={{fontSize: '14px'}}>Room ID: {roomID}</p>
                    <p style={{fontSize: '14px'}}>Users In Room:</p>
                    <ul>
                    {users.map((name, i) => (
                        <li key={i} style={{fontSize: '14px'}}>{name}</li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChatPage