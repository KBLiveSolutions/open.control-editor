
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
            console.log(fake_sysex);
        }
    }

}

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', event => {
    let connectButton = document.querySelector("#connect");
    let requestButton = document.querySelector("#request");
    let statusDisplay = document.querySelector('#status');
    let port;

    function connect() {
      port.connect().then(() => {
        statusDisplay.textContent = '';
        connectButton.textContent = 'Disconnect';

        port.onReceive = data => {
          let my_array = new Uint8Array(data.buffer);
          console.log("DATA", my_array);
          my_array.forEach(element => { 
                console.log("element", element)
                build_sysex_array(element);
            });

            // let textDecoder = new TextDecoder();
            // console.log("DAT4", textDecoder.decode(data));
          };

        port.onReceiveError = error => {
          console.error(error);
        };
      }, error => {
        statusDisplay.textContent = error;
      });
    }

    connectButton.addEventListener('click', function() {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect';
        statusDisplay.textContent = '';
        port = null;
      } else {
        serial.requestPort().then(selectedPort => {
          port = selectedPort;
          connect();
        }).catch(error => {
          statusDisplay.textContent = error;
        });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length === 0) {
        statusDisplay.textContent = 'No device found.';
      } else {
        statusDisplay.textContent = 'Connecting...';
        port = ports[0];
        connect();
      }
    });

    // let colorPicker = document.getElementById("color_picker");

    // colorPicker.addEventListener("change", function(event) {
    //     console.log(colorPicker.value)
    //   port.send(new TextEncoder("utf-8").encode(colorPicker.value));
    // });

    // function arrayToArrayBuffer (array) {
    //     var length = array.length;
    //     var buffer = new ArrayBuffer( length * 2 );
    //     var view = new Uint16Array(buffer);
    //     for ( var i = 0; i < length; i++) {
    //         view[i] = array[i];
    //     }
    //     return buffer;
    // }

    function arrayToArrayBuffer (array) {
        var length = array.length;
        // var buffer = new TextEncoder("utf-8");
        for ( var i = 0; i < length; i++) {
            array[i] = String.fromCharCode(array[i]);
        }
        console.log(array)
        return array;
    }

    requestButton.addEventListener('click', function() {
        let arr = [72, 10, 10];
        port.send(new TextEncoder("utf-8").encode(arrayToArrayBuffer(arr)));
        // port.send(arrayToArrayBuffer(arr));
      });

  });
})();