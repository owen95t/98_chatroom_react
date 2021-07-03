import './App.css';
import '98.css'
import {useState} from "react";
// import './customFont.css'
import {
    HashRouter as HRouter,
  Switch,
  Route,
} from "react-router-dom";
import {GuardedRoute, GuardProvider} from "react-router-guards";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import JoinPage from "./pages/JoinPage";
import CreatePage from "./pages/CreatePage";

function App() {
  const [name, setName] = useState('')
  const [roomID, setRoomID] = useState('')
  const [join, setJoin] = useState(false)
  const [create, setCreate] = useState(false)
  const [auth, setAuth] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const handleNameChange = (e) => {
    //console.log('HandleSetName: ' + e.target.value)
    setName(e.target.value)
  }

  const handleRoomIDChange = (e) => {
    setRoomID(e.target.value.toUpperCase())
  }

  function clear(){
    setRoomID('')
    setName('')
    setJoin(false)
    setCreate(false)
    setAuth(false)
  }

  const handleSetRoomID = (room) => {
    setRoomID(room)
  }

  const handleJoin = () => {
    setJoin(true)
    setCreate(false)
    handleSetAuth(true)
  }

  const handleCreate = () => {
    setCreate(true)
    setJoin(false)
    handleSetAuth(true)
  }

  function handleSetAuth(bool) {
    if (bool === true) {
      setAuth(true)
    }else if (bool === false) {
      setAuth(false)
    }
  }

  const requireName = (to, from, next) => {
    if (to.meta.auth) {
      if (auth === true) {
        next()
      }
      next.redirect('/')
    }else{
      next()
    }
  }

  // function handleError(msg) {
  //   setErrorMsg(msg)
  //   setShowError(true)
  // }

  function closeError() {
    setShowError(false)
  }

  return (
    <div className="App">
      <HRouter basename='/'>
        <GuardProvider guards={[requireName]}>
          <Switch>
            <Route
                path='/'
                exact component={() => <HomePage/>}
            />
            <Route
                path='/create' render={(props) => (
                    <CreatePage
                        {...props}
                        name={name}
                        onNameChange={handleNameChange}
                        handleCreate={handleCreate}
                        handleClear={clear}
                    />
                )}
            />
            <Route
                path='/join' render={(props) => (
                    <JoinPage
                        {...props}
                        name={name}
                        roomID={roomID}
                        onNameChange={handleNameChange}
                        onRoomChange={handleRoomIDChange}
                        onEnter={handleJoin}
                        handleClear={clear}
                    />
                )}
            />
            <GuardedRoute
                meta={{auth: true}}
                path = '/chat'
                render={(props) => (
                    <ChatPage
                        {...props}
                        name={name}
                        roomID={roomID}
                        isJoin={join}
                        isCreate={create}
                        onRoomChange={handleSetRoomID}
                        onExit={clear}
                    />
                )}
            />
            {/*<Route*/}
            {/*    path='/chat'*/}
            {/*    render={(props) => (*/}
            {/*        <ChatPage*/}
            {/*            {...props}*/}
            {/*            name={name}*/}
            {/*            roomID={roomID}*/}
            {/*            isJoin={join}*/}
            {/*            isCreate={create}*/}
            {/*            onRoomChange={handleSetRoomID}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}
          </Switch>
        </GuardProvider>
      </HRouter>
      {showError ?
          <div className='window centred' style={{width: '350px'}}>
            <div className="title-bar">
              <div className="title-bar-text">Error</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeError}/>
              </div>
              <div className='window-body' style={{height: '250px'}}>
                {errorMsg}
              </div>
            </div>
          </div>
          : <></>
      }
    </div>
  );
}

export default App;
