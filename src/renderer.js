const io = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');
const {keyboard, Key} = require("@nut-tree/nut-js");
keyboard.config.autoDelayMs = 0;

const socket = io("https://socketio-any.herokuapp.com");
var qrzone;

document.querySelector('#runBtn').addEventListener('click', () => {
    const hereID = uuidv4();
    document.querySelector('#runBtn').classList.add('hide');
    document.getElementById("fullPage").classList.remove('hide');
    qrzone = new QRCode(document.getElementById("qrcode"), "https://tam11a.github.io/remotaa-web/?q="+hereID);
    document.getElementById('copyZone').innerHTML = "https://tam11a.github.io/remotaa-web/?q="+hereID;
    // document.querySelector("#idHere").innerHTML = hereID;
    socketOn(hereID);
})

document.querySelector('#disconnectBtn').addEventListener('click', () => {
    socket.removeAllListeners();
    qrzone.clear();
    document.querySelector('#runBtn').classList.remove('hide');
    document.getElementById("fullPage").classList.add('hide');
})

const holdKeys = {
    'ctrl': Key.LeftControl,
    'alt': Key.LeftAlt,
    'shift': Key.LeftShift,
    'caps': Key.CapsLock,
    'scroll': Key.ScrollLock,
    'num': Key.NumLock
}

const specialKeys = {
    'return': Key.Enter,
    'backspace': Key.Backspace,
    'tab': Key.Tab,
    'space': Key.Space,
    'esc': Key.Escape,
    'f1': Key.F1,
    'f2': Key.F2,
    'f3': Key.F3,
    'f4': Key.F4,
    'f5': Key.F5,
    'f6': Key.F6,
    'f7': Key.F7,
    'f8': Key.F8,
    'f9': Key.F9,
    'f10': Key.F10,
    'f11': Key.F11,
    'f12': Key.F12,
    'prtscr': Key.Print,
    'pause': Key.Pause,
    'insert': Key.Insert,
    'home': Key.Home,
    'page up': Key.PageUp,
    'delete': Key.Delete,
    'end': Key.End,
    'page down': Key.PageDown,
    'up': Key.Up,
    'right': Key.Right,
    'down': Key.Down,
    'left': Key.Left,
    'cmd': Key.LeftSuper,
}

const socketOn = (room_id) => {
    console.log(room_id)
    socket.on(room_id, (data) => {
        data.hold?.map((eachOne) => {
            keyboard.pressKey(holdKeys[eachOne])
        })
          if(data.key){
              if (specialKeys[data.key] !== null && specialKeys[data.key] !== undefined) {
                  keyboard.type(specialKeys[data.key])
              } else {
                  if(data.hold.includes('caps') || data.hold.includes('shift'))
                    keyboard.type(data.key.toUpperCase())
                    else 
                    keyboard.type(data.key)
              }
          }
          data.hold?.map((eachOne) => {
            keyboard.releaseKey(holdKeys[eachOne])
        })
         // keyboard.type(data.text);
      });
}