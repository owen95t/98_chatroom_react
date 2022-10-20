import io from "socket.io-client";

// let socket = io("http://localhost:4000", {
//     transports: ['websocket'],
//     autoConnect: false
// });
let socket = io("https://chat95-backend.herokuapp.com/", {
    transports: ['websocket'],
    autoConnect: false
});


export default socket;