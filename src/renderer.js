const io = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');
const {keyboard, Key} = require("@nut-tree/nut-js");

keyboard.config.autoDelayMs = 0;

const socket = io("https://socketio-any.herokuapp.com");

document.querySelector('#runBtn').addEventListener('click', () => {
    const hereID = uuidv4();
    document.querySelector("#idHere").innerHTML = hereID;
    socketOn(hereID);
})


const socketOn = (room_id) => {
    console.log(room_id)
    socket.on(room_id, (data) => {
         keyboard.type(data.text);
      });
}