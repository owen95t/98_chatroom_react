import '98.css'
import '../customFont.css'

import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet";

const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>Chat95 - Home</title>
            </Helmet>
            <div className='window centred' style={{width: '365px', height: '430px'}}>
            <div className="title-bar">
                <div className="title-bar-text">Chat95</div>
                <div className="title-bar-controls">
                    <button aria-label="Close"/>
                </div>
            </div>
            <div className="window-body box">
                <h3 className='box-margin' style={{fontFamily: 'W95FA'}}>Welcome to Chat95</h3>
                <hr/>
                <p className='box-margin' style={{fontSize: '13px'}}>
                    An instant messaging web app based on windows 95/98 GUI!
                    <br/>
                    <br/>
                    Here, you can either create a chat room, or join a chat room.
                    <br/>
                    <br/>
                    To create a room, choose create chat, put in a name, and you will be given a room ID. Give this ID to other people so that they can join your chat room.
                    <br/>
                    <br/>
                    When you are in the chat room, if you exit the page, you will exit the room. As long as there is one person in the room, the room is valid. If everybody exits a room, the room is destroyed.
                    <br/>
                    <br/>
                    I have no access to any chats. Once it's gone, it's gone.
                </p>
            </div>
            <div className='button-container'>
                <Link to='/create'>
                    <button className='button-style' style={{WebkitFontSmoothing: 'antialiased'}}>Create Chat</button>
                </Link>
                <Link to='/join'>
                    <button className='button-style' style={{webkitFontSmoothing: 'antialiased'}}>Join Chat</button>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default HomePage