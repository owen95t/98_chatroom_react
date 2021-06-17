import io from "socket.io-client";

// let socket = io("http://localhost:4000", {
//     transports: ['websocket'],
//     autoConnect: false
// });
let socket = io("https://gentle-everglades-66889.herokuapp.com/", {
    transports: ['websocket'],
    autoConnect: false
});


export default socket;