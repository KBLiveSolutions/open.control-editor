
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

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', event => {
    // let connectButton = document.querySelector("#connect");
    let requestButton = document.querySelector("#refresh");
    // let statusDisplay = document.querySelector('#status');
    let port;

    function connect() {
      port.connect().then(() => {

        // statusDisplay.textContent = '';
        // connectButton.textContent = 'Disconnect';
        onOpenControlDetected(1, 4);
        let arr = [140, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        sendWebUSB(arr);

        port.onReceive = data => {
          let my_array = new Uint8Array(data.buffer);
          my_array.forEach(element => { 
                build_sysex_array(element);
            });
          };

        port.onReceiveError = error => {
          console.error(error);
        };
      }, error => {
        // statusDisplay.textContent = error;
      });
    }

    // connectButton.addEventListener('click', function() {
    //   if (port) {
    //     port.disconnect();
    //     connectButton.textContent = 'Connect';
    //     // statusDisplay.textContent = '';
    //     port = null;
    //     console.log("WebUSB Connect");
    //   } else {
    //     serial.requestPort().then(selectedPort => {
    //       port = selectedPort;
    //       connect();
    //     }).catch(error => {
    //       // statusDisplay.textContent = error;
    //     });
    //     console.log("MIDI Connect");
    //   }
    // });

    serial.getPorts().then(ports => {
      if (ports.length === 0) {
        // statusDisplay.textContent = 'No device found.';
        navigator.requestMIDIAccess({ sysex: true }).then(onMIDISuccess, onMIDIFailure);
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