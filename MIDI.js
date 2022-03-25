
  // //====================== MIDI + WEBUSB ==========================

  var midi = null;
  var open_control_output = null
  var open_control_input_id = null
  var open_control_output_id = null
  var selected_layout = 0
  var open_control_detected = false
  var current_layout = 0

  var detected_maj_ver = 0;
  var detected_min_ver = 0;

  function onMIDIFailure(msg) {
    console.log("Failed to get MIDI access - " + msg);
  }

  function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    console.log("MIDI ready!");
    // connect_label();
    midi.onstatechange = function (e) { ConnectEventHandler(e); };

    var inputs = midiAccess.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      if (input.value.name == "open·control") input.value.onmidimessage = MIDIMessageEventHandler;
      haveAtLeastOneDevice = true;
    }
    // detect_output();
    midi.outputs.forEach(output => {
      console.log(output)
      if (output.name == "open·control" && !open_control_detected) detect_output(output);
    });
  }

  function ConnectEventHandler(event) {
    // Print information about the (dis)connected MIDI controller
    midi.outputs.forEach(output => {
      if (output.name == "open·control" && !open_control_detected) detect_output(output);
    });
  }

  function detect_output(output) {
    open_control_detected = true
    open_control_output = midi.outputs.get(output.id);
    var requestMessage = [240, 122, 29, 1, 19, 1, 247];
    sendRawSysex(requestMessage);
    console.log("output", open_control_output)
  }


  function onOpenControlDetectedMIDI(maj_ver, min_ver) {
    var requestMessage = [240, 122, 29, 1, 19, 4, 247];
    open_control_detected = true;
    if (open_control_detected)  sendRawSysex(requestMessage);
    onOpenControlDetected(maj_ver, min_ver);
  }


  function onOpenControlDetected(maj_ver, min_ver) {
    statusLabel = document.getElementById("Status Label");
    statusLabel.style.color = "#000000";
    var connect_cell = document.getElementById("connect_cell");
    connect_cell.style.backgroundColor = "red";
    connect_cell.className = "connect_cell";
    statusLabel.innerHTML = "<b> Please connect open·control </b>";
        var connect_cell = document.getElementById("connect_cell");
        statusLabel.style.color = "#000000";
        if (LATEST_FIRMWARE_MINOR_VERSION > min_ver){
        connect_cell.style.backgroundColor = "#FFA500";
        statusLabel.innerHTML = "<b> open·control detected</b> <br> <a href=https://github.com/KBLiveSolutions/open.control-firmusbare target=_blank style=color:#000000;> new firmware available</a> <br> Current: " + maj_ver + "." + min_ver +" | New: " + LATEST_FIRMWARE_MAJOR_VERSION + "." + LATEST_FIRMWARE_MINOR_VERSION;
        }
        else {
        connect_cell.style.backgroundColor = "#00FF55";
        statusLabel.innerHTML = "<b> open·control detected</b> <br> <font size=2>Firmware version: " + maj_ver + "." + min_ver;
        }
  }

  function onOpenControlDisconnected() {
    statusLabel = document.getElementById("Status Label");
    statusLabel.style.color = "#000000";
    var connect_cell = document.getElementById("connect_cell");
    connect_cell.style.backgroundColor = "red";
    connect_cell.className = "connect_cell";
    statusLabel.innerHTML = "<b> Please connect open·control </b>";
        var connect_cell = document.getElementById("connect_cell");
        statusLabel.style.color = "#000000";
  }

  function request_Live_update(){
    var requestMessage = [240, 122, 29, 1, 19, 5, 247];
    sendRawSysex(requestMessage);
  }

  function refresh(){
    let arr = [140, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    sendRawSysex(arr);
  }

  function MIDIMessageEventHandler(event) {
    if (event.data[1] == 122 && event.data[2] == 29 && event.data[3] == 1 && event.data[4] == 19 && event.data[5] == 68) {
        console.log("open control detected");
        maj_ver = event.data[6];
        min_ver = event.data[7];
        // onOpenControlDetectedMIDI(event.data[6], event.data[7]);
    }

    if (event.data[1] == 122 && event.data[2] == 29 && event.data[3] == 1 && event.data[4] == 19 && event.data[5] == 79) {
        // console.log("open control closed");
        // open_control_output.close();
    }

    if (event.data[1] == 122 && event.data[2] == 29 && event.data[3] == 1 && event.data[4] == 20) { // Receiving Data from opencontrol after a Dump request
      sysexHandler(event.data);
      }
    }


    function sysexHandler(sysexArray) {
      console.log(sysexArray)
      if (sysexArray[1] == 122 && sysexArray[2] == 29 && sysexArray[3] == 1 && sysexArray[4] == 19 && sysexArray[5] == 68) {
        console.log(sysexArray)
          console.log("open control detected");
          detected_maj_ver = sysexArray[6];
          detected_min_ver = sysexArray[7];
          onOpenControlDetected(detected_maj_ver, detected_min_ver);
      }
  
    if (sysexArray[1] == 122 && sysexArray[2] == 29 && sysexArray[3] == 1 && sysexArray[4] == 20) { // Receiving Data from opencontrol after a Dump request

        var sysex_byte = sysexArray[5];
        var rcvd_layout = sysexArray[6]; 
        var num = sysexArray[7];
        var id = sysex_to_id[sysex_byte];
        
        // console.log(id, sysexArray[6], sysexArray[7], sysexArray[8], sysexArray[9], sysexArray[10])

        if (id=="toggle") toggle[toggle_to_id[sysexArray[9]]][rcvd_layout][num] = sysexArray[8];
        else if (id=="snap") snap["button_short"][rcvd_layout][num] = sysexArray[8];
        else if (id=="options") {
          options[options_to_id[sysexArray[6]]] = sysexArray[7];
          s = document.getElementById(options_to_id[sysexArray[6]]);
          s.checked = !sysexArray[7];
        }
        else {
            if (id=="button_short" && num>=NUM_BUTTONS) {
              id="encoder_short";
              num = num-NUM_BUTTONS;
            } 
          type[id][rcvd_layout][num] = sysexArray[10];
          control[id][rcvd_layout][num] = sysexArray[8];
          channel[id][rcvd_layout][num] = sysexArray[9];}
          if (id=="external_MIDI") set_External_MIDI(num, control[id][0][num], channel[id][0][num], type[id][0][num] + 1);
        on_page_select_changed(0);
      }
    }


  function show_receive_message(){
   init_led_color_red = [80, 0, 17, 100, 124, 90];
   init_led_color_green = [0, 78, 23, 100, 49, 0];
   init_led_color_blue = [100, 46, 80, 0, 0, 12];
      var   message = [240, 122, 29, 1, 19, 54, 0, 247];
      sendRawSysex(message);  
    for (var i = 0; i < 6; i++) {
      var   message = [240, 122, 29, 1, 19, 28, i, init_led_color_red[i], init_led_color_green[i], init_led_color_blue[i], 247];
      sendRawSysex(message);
      sleep(30)
    }
    for (var i = 0; i < 6; i++) {
      sleep(30)
      var   message = [240, 122, 29, 1, 19, 28, i, 0, 0, 0, 247];
      sendRawSysex(message);
    }
  }

  function sendSysex(sysex_id, layout, id, value, type, channel) {
    // Sending {240, 122, 29, 1, 19, 10, Layout Number, Button number, Note/CC Number, Type, Channel, 247} changes the corresponding button
    var sysexMessage = [240, 122, 29, 1, 19, sysex_id, layout, id, value, type, channel, 247];
    if (usb_webport) sendWebUSB(sysexMessage);
     if (open_control_detected) open_control_output.send(sysexMessage);
  }

  function sendRawSysex(sysex_message) {
    if (usb_webport) sendWebUSB(sysex_message);
    // Sending {{240, 122, 29, 1, 19, 10, Layout Number, Button number, Note/CC Number, Type, Channel, 247} changes the corresponding button
     if (open_control_detected) open_control_output.send(sysex_message);
  }

  var color_names = ["Off", "Blue 1", "Blue 2", "Red 1", "Red 2", "Green 1", "Green 2", "Pink 1", "Pink 2", "Purple 1", "Purple 2", "Yellow 1", "Yellow 2", "Orange 1", "Orange 2", "White 1", "White 2"]
  var colors = [0, 125, 21, 14, 56, 126, 62, 11, 42, 66, 106, 33, 4, 43, 16, 120, 49];
  var cc_values = range(119, 1);
  cc_values.splice(0, 0, 'Num');

  var note_values = range(128, 0);
  note_values.splice(0, 0, 'Num');

  var pc_values = range(128, 0);
  pc_values.splice(0, 0, 'Num');

  var ch_values = range(16, 1);
  ch_values.splice(0, 0, 'Ch');

  var ch_values_custom = range(10, 1);
  ch_values_custom.splice(0, 0, 'Ch');

  var type_values = ['Type', 'Note', 'CC', 'PC'];

  var types = ['cc_select', 'ch_select', 'type_select'];

  var color_values = range(50, 0);
  color_values.splice(0, 0, 'Col.');

  var cell_width = "120px";
  var cell_color = "#000000";
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }


  // //====================== MIDI ==========================


  // var midi = null;
  // var open_control_output = null
  // var open_control_input_id = null
  // var open_control_output_id = null
  // var selected_layout = 0
  // var open_control_detected = false
  // var current_layout = 0

  // navigator.requestMIDIAccess({ sysex: true }).then(onMIDISuccess, onMIDIFailure);

  // function onMIDIFailure(msg) {
  //   console.log("Failed to get MIDI access - " + msg);
  // }

  // function onMIDISuccess(midiAccess) {
  //   midi = midiAccess;
  //   console.log("MIDI ready!");
  //   // connect_label();
  //   midi.onstatechange = function (e) { ConnectEventHandler(e); };
  //   statusLabel = document.getElementById("Status Label");
  //   statusLabel.style.color = "#000000";
  //   var connect_cell = document.getElementById("connect_cell");
  //   connect_cell.style.backgroundColor = "red";
  //   connect_cell.className = "connect_cell";
  //   statusLabel.innerHTML = "<b> Please connect open·control </b>";

  //   var inputs = midiAccess.inputs.values();
  //   for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
  //     if (input.value.name == "open·control") input.value.onmidimessage = MIDIMessageEventHandler;
  //     haveAtLeastOneDevice = true;
  //   }
  //   // detect_output();
  // }

  // function ConnectEventHandler(event) {
  //   // Print information about the (dis)connected MIDI controller
  //   midi.outputs.forEach(output => {
  //     if (output.name == "open·control" && !open_control_detected) detect_output(output);
  //   });
  // }

  // function detect_output(output) {
  //   open_control_detected = true
  //       var requestMessage = [240, 122, 29, 1, 19, 1, 247];
  //       open_control_output = midi.outputs.get(output.id);
  //       open_control_output.send(requestMessage);
  //       console.log("output", open_control_output)

  // }

  // function onOpenControlDetected(maj_ver, min_ver) {
  //       var connect_cell = document.getElementById("connect_cell");
  //       statusLabel.style.color = "#000000";
  //       if (LATEST_FIRMWARE_MINOR_VERSION > min_ver){
  //       connect_cell.style.backgroundColor = "#FFA500";
  //       statusLabel.innerHTML = "<b> open·control detected</b> <br> <a href=https://github.com/KBLiveSolutions/open.control-firmware target=_blank style=color:#000000;> new firmware available</a> <br> Current: " + maj_ver + "." + min_ver +" | New: " + LATEST_FIRMWARE_MAJOR_VERSION + "." + LATEST_FIRMWARE_MINOR_VERSION;
  //       }
  //       else {
  //       connect_cell.style.backgroundColor = "#00FF55";
  //       statusLabel.innerHTML = "<b> open·control detected</b> <br> <font size=2>Firmware version: " + maj_ver + "." + min_ver;
  //       }
  //       var requestMessage = [240, 122, 29, 1, 19, 4, 247];
  //       open_control_detected = true;
  //       open_control_output.send(requestMessage);
  // }

  // function request_Live_update(){
  //   var requestMessage = [240, 122, 29, 1, 19, 5, 247];
  //       open_control_output.send(requestMessage);
  // }

  // function MIDIMessageEventHandler(event) {
  //   if (event.data[1] == 122 && event.data[2] == 29 && event.data[3] == 1 && event.data[4] == 19 && event.data[5] == 68) {
  //       console.log("open control detected");
  //       onOpenControlDetected(event.data[6], event.data[7]);
  //   }

  //   if (event.data[1] == 122 && event.data[2] == 29 && event.data[3] == 1 && event.data[4] == 20) { // Receiving Data from opencontrol after a Dump request

  //       var sysex_byte = event.data[5];
  //       var rcvd_layout = event.data[6]; 
  //       var num = event.data[7];
  //       var id = sysex_to_id[sysex_byte];
        
  //       // console.log(id, event.data[6], event.data[7], event.data[8], event.data[9], event.data[10])

  //       if (id=="toggle") toggle[toggle_to_id[event.data[9]]][rcvd_layout][num] = event.data[8];
  //       else if (id=="snap") snap["button_short"][rcvd_layout][num] = event.data[8];
  //       else if (id=="options") {
  //         options[options_to_id[event.data[6]]] = event.data[7];
  //         s = document.getElementById(options_to_id[event.data[6]]);
  //         s.checked = !event.data[7];
  //       }
  //       else {
  //           if (id=="button_short" && num>=NUM_BUTTONS) {
  //             id="encoder_short";
  //             num = num-NUM_BUTTONS;
  //           } 
  //         type[id][rcvd_layout][num] = event.data[10];
  //         control[id][rcvd_layout][num] = event.data[8];
  //         channel[id][rcvd_layout][num] = event.data[9];}
  //         if (id=="external_MIDI") set_External_MIDI(num, control[id][0][num], channel[id][0][num], type[id][0][num] + 1);
  //       on_page_select_changed(0);
  //     }
  //   }

  // function show_receive_message(){
  //  init_led_color_red = [80, 0, 17, 100, 124, 90];
  //  init_led_color_green = [0, 78, 23, 100, 49, 0];
  //  init_led_color_blue = [100, 46, 80, 0, 0, 12];
  //     var   message = [240, 122, 29, 1, 19, 54, 0, 247];
  //     open_control_output.send(message);  
  //   for (var i = 0; i < 6; i++) {
  //     var   message = [240, 122, 29, 1, 19, 28, i, init_led_color_red[i], init_led_color_green[i], init_led_color_blue[i], 247];
  //     open_control_output.send(message);
  //     sleep(30)
  //   }
  //   for (var i = 0; i < 6; i++) {
  //     sleep(30)
  //     var   message = [240, 122, 29, 1, 19, 28, i, 0, 0, 0, 247];
  //     open_control_output.send(message);
  //   }
  // }

  // function sendSysex(sysex_id, layout, id, value, type, channel) {
  //   // Sending {240, 122, 29, 1, 19, 10, Layout Number, Button number, Note/CC Number, Type, Channel, 247} changes the corresponding button
  //   var sysexMessage = [240, 122, 29, 1, 19, sysex_id, layout, id, value, type, channel, 247];
  //   if (open_control_detected) open_control_output.send(sysexMessage);
  // }

  // function sendRawSysex(sysex_message) {
  //   // Sending {{240, 122, 29, 1, 19, 10, Layout Number, Button number, Note/CC Number, Type, Channel, 247} changes the corresponding button
  //   if (open_control_detected) open_control_output.send(sysex_message);
  // }

  // var color_names = ["Off", "Blue 1", "Blue 2", "Red 1", "Red 2", "Green 1", "Green 2", "Pink 1", "Pink 2", "Purple 1", "Purple 2", "Yellow 1", "Yellow 2", "Orange 1", "Orange 2", "White 1", "White 2"]
  // var colors = [0, 125, 21, 14, 56, 126, 62, 11, 42, 66, 106, 33, 4, 43, 16, 120, 49];
  // var cc_values = range(119, 1);
  // cc_values.splice(0, 0, 'Num');

  // var note_values = range(128, 0);
  // note_values.splice(0, 0, 'Num');

  // var pc_values = range(128, 0);
  // pc_values.splice(0, 0, 'Num');

  // var ch_values = range(16, 1);
  // ch_values.splice(0, 0, 'Ch');

  // var ch_values_custom = range(16, 1);
  // ch_values_custom.splice(0, 0, 'Ch');

  // var type_values = ['Type', 'Note', 'CC', 'PC'];

  // var types = ['cc_select', 'ch_select', 'type_select'];

  // var color_values = range(50, 0);
  // color_values.splice(0, 0, 'Col.');

  // var cell_width = "120px";
  // var cell_color = "#000000";
  // function range(size, startAt = 0) {
  //   return [...Array(size).keys()].map(i => i + startAt);
  // }

