import {Link} from "react-router-dom";
import '../customFont.css'
import {Helmet} from "react-helmet";

const CreatePage = ({name, onNameChange, handleCreate}) => {
    return (
        <div>
            <Helmet>
                <title>Chat95 - Create a room</title>
            </Helmet>
        <div className='window centred' style={{width: '365px', height: '250px'}}>
            <div className="title-bar">
                <div className="title-bar-text">Chat95</div>
                <div className="title-bar-controls">
                    <Link to='/'>
                        <button aria-label="Close"/>
                    </Link>
                </div>
            </div>
            <div className="window-body">
                <h3 className='box-margin' style={{fontFamily: 'W95FA'}}>Create A Room</h3>
                <hr/>
                <div className="field-row-stacked" style={{width: '200px', marginLeft: '75px', marginTop: '20px'}}>
                    <label htmlFor="text22" style={{webkitFontSmoothing: 'antialiased', fontSize: '13px', paddingLeft: '3px'}}>Enter your name: </label>
                    <input
                        id="text22"
                        type="text"
                        value={name}
                        onChange={e => onNameChange(e)}
                        style={{webkitFontSmoothing: 'antialiased', height: '27px', fontSize: '13px', paddingLeft: '8px'}}
                    />
                </div>
            </div>
            <div className='button-container'>
                <Link to='/chat'>
                    <button
                        className='button-style'
                        style={{marginTop: '20px', webkitFontSmoothing: 'antialiased'}}
                        onClick={handleCreate}
                    >
                        Create Chat
                    </button>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default CreatePage