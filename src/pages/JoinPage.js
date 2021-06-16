import {Link} from "react-router-dom";
import '../customFont.css'

const JoinPage = () => {
    return (
        <div className='window centred' style={{width: '365px', height: '300px'}}>
            <div className="title-bar">
                <div className="title-bar-text">Chat95</div>
                <div className="title-bar-controls">
                    <Link to='/'>
                        <button aria-label="Close"/>
                    </Link>
                </div>
            </div>
            <div className="window-body box">
                <h3 className='box-margin' style={{fontFamily: 'W95FA'}}>Join A Room</h3>
                <hr/>
                <div className="field-row-stacked" style={{width: '200px', marginLeft: '75px', marginTop: '20px'}}>
                    <label htmlFor="text22" style={{webkitFontSmoothing: 'antialiased', fontSize: '13px', paddingLeft: '3px'}}>Enter your name: </label>
                    <input id="text22" type="text" style={{height: '27px', fontSize: '13px', paddingLeft: '8px', webkitFontSmoothing: 'antialiased'}}/>
                </div>
                <div className="field-row-stacked" style={{width: '200px', marginLeft: '75px', marginTop: '30px'}}>
                    <label htmlFor="text22" style={{webkitFontSmoothing: 'antialiased', fontSize: '13px', paddingLeft: '3px'}}>Enter room ID: </label>
                    <input id="text22" type="text" style={{height: '27px', fontSize: '13px', paddingLeft: '8px', webkitFontSmoothing: 'antialiased'}}/>
                </div>
            </div>
            <div className='button-container'>
                <Link tp='/join'>
                    <button className='button-style' style={{marginTop: '15px', webkitFontSmoothing: 'antialiased'}}>Join Chat</button>
                </Link>
            </div>
        </div>
    )
}

export default JoinPage