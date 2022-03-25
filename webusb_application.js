
let fake_sysex = new Array();
let building_sysex = false;
function build_sysex_array(element){
    if (!building_sysex){
        fake_sysex = [];
        if (element===240){
            fake_sysex[0] = 240;
            building_sysex = true;
        }
    }
    else {
        fake_sysex.push(element)
        if (element===247){
            building_sysex = false;
            sysexHandler(fake_sysex)
        }
    }
}

let usb_webport;
function sendWebUSB(array){
  // console.log(array);
  usb_webport.send(arrayToArrayBuffer(array));
}

function arrayToArrayBuffer (array) {
  var length = array.length;
  var buffer = new Uint8Array(length);
  for ( var i = 0; i < length; i++) {
    buffer[i] = array[i];
  }
  // console.log('unit8', buffer)
  return buffer;
}

function update_refresh_button()
{
  // let refresh_button = document.getElementById("refresh_button");
  // let refresh_label = document.getElementById("refresh_label");
  // refresh_button.style.visibility = "visible";
  // refresh_label.style.visibility = "visible";
  let connect_button = document.getElementById("connect");
  let connect_label = document.getElementById("connect_label");
  connect_button.style.visibility = "hidden";
  connect_label.style.visibility = "hidden";
}

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', event => {
    let connectButton = document.querySelector("#connect");
    let requestButton = document.querySelector("#refresh");
    // let statusDisplay = document.querySelector('#status');
    let port;

    function connect() {
      port.connect().then(() => {

        // statusDisplay.textContent = '';
        // connectButton.textContent = 'Disconnect';
    var requestMessage = [240, 122, 29, 1, 19, 1, 247];
    sendRawSysex(requestMessage);
        let arr = [140, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        sendWebUSB(arr);
        update_refresh_button();

        port.onReceive = data => {
          let my_array = new Uint8Array(data.buffer);
          my_array.forEach(element => { 
                build_sysex_array(element);
            });
          };

        port.onReceiveError = error => {
          console.error(error); 
          onOpenControlDisconnected()
        };
      }, error => {
        // statusDisplay.textContent = error;
      });
    }

    connectButton.addEventListener('click', function() {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect';
        console.log("WebUSB Disconnect");
        // statusDisplay.textContent = '';
        port = null;
      } else {
        serial.requestPort().then(selectedPort => {
          port = selectedPort;
          connect();
          console.log("WebUSB Connect");
        }).catch(error => {
          navigator.requestMIDIAccess({ sysex: true }).then(onMIDISuccess, onMIDIFailure);
          console.log("MIDI Connect");
          // statusDisplay.textContent = error;
        });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length === 0) {
        // statusDisplay.textContent = 'No device found.';
      } else {
        // statusDisplay.textContent = 'Connecting...';
        port = ports[0];
        usb_webport = port;
        connect();
      }
    });

    requestButton.addEventListener('click', function() {
      refresh();
        // port.send(new TextEncoder("utf-8").encode(arrayToArrayBuffer(arr)));
      });


  });
})();