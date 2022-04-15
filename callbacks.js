
  ///////////////////////////////////
  // CALLBACKS
  ///////////////////////////////////


  function on_select_change(id, i, value)  {  // called when any of the Select object changes
    var num = i
    // console.log(id, num, value)
    if (id == "page") {
      on_page_select_changed(value);  // if the Page Select is changed, just update the UI
    }
    else {  // if any other Select is changed, send a Sysex message to change the corresponding control
      var options_list = Object.keys(actions[id]); // retrieves the list of button actions
      cc_to_send = actions[id][options_list[value]]; // gets the cc corresponding to the action selected
      control[id][current_layout][num] = cc_to_send;
      channel[id][current_layout][num] = 16;
      type[id][current_layout][num] = 1;
      if(id=="encoder_short") num_to_send = num + NUM_BUTTONS;
      else num_to_send = num;

      if (options_list[value] == "① MIDI Map 1 (Big Button)") {
          cc_to_send = 1;
          // control[id][current_layout][num] = 128;
          channel[id][current_layout][num] = 16;
          type[id][current_layout][num] = 0;
      }
      else if (options_list[value] == "② MIDI Map 2 (Clear)") {
          cc_to_send = 1;
          // control[id][current_layout][num] = 129;
          channel[id][current_layout][num] = 15;
          type[id][current_layout][num] = 0;
      }
      else if (options_list[value] == "③ MIDI Map 3") {
          cc_to_send = 1;
          // control[id][current_layout][num] = 130;
          channel[id][current_layout][num] = 14;
          type[id][current_layout][num] = 0;
      }
      else if (options_list[value] == "④ MIDI Map 4") {
          cc_to_send = 1;
          // control[id][current_layout][num] = 131;
          channel[id][current_layout][num] = 13;
          type[id][current_layout][num] = 0;
      }
      else if (options_list[value] == "⑤ MIDI Map 5") {
          cc_to_send = 1;
          // control[id][current_layout][num] = 132;
          channel[id][current_layout][num] = 12;
          type[id][current_layout][num] = 0;
      }
      else if (options_list[value] == "⑥ MIDI Map 6") {
          cc_to_send = 1;
          // control[id][current_layout][num] = 133;
          channel[id][current_layout][num] = 11;
          type[id][current_layout][num] = 0;
      }

      if (id=="led"){
        if (value==0) channel[id][current_layout][num] = 10;
        update_led_selects(id, num, type[id][current_layout][num], control[id][current_layout][num], channel[id][current_layout][num])
      }
      
      if (value != Object.keys(actions[id]).indexOf("Custom MIDI") && value != Object.keys(actions[id]).indexOf("Custom Action")){
        show_receive_message();
        sleep(pause)
        sendSysex(id_to_sysex[id], current_layout, num_to_send, cc_to_send, type[id][current_layout][num], channel[id][current_layout][num]);
        sleep(pause)
      }
      if (id != "led" && id != "display") update_custom_MIDI(id, num, true);
      else request_Live_update();
    }
  }

  function on_LEDs_brightness_change(value) {
    sendRawSysex([240, 122, 29, 1, 19, 23, value, 247]);
  }

  // function on_display_brightness_change(value) {
  //   sendRawSysex([240, 122, 29, 1, 19, 22, value, 247]);
  // }

  function on_display_brightness_changed(value) {
    sendRawSysex([240, 122, 29, 1, 19, 22, value, 247]);
  }

  function on_color_change(i, value, datatype) { // custom color
    // var sel = document.getElementById("sel" + id);
    value = parseInt(value);
    value = colors[value];
    // // if data comes from Page Color Selector, sned special sysex message
    // if (i == 90) {
    //   sendSysex(32 + current_layout, value); // send color for Page 1
    //   options[2 + current_layout] = value; //stores color as options 2 to 4
    // }
    // else {
      sendSysex(15, current_layout, i, value, 1, 16);
      control["led"][current_layout][i] = value;
      channel["led"][current_layout][i] = 10;
    // }
  }

  function on_snap_changed(i, value) {
    show_receive_message();
    sendRawSysex([240, 122, 29, 1, 19, 11, current_layout, i, value, 247]);
    snap["button_short"][current_layout][i] = value;
    update_snap_box(i, value);
  }

  function on_toggle_changed(i, val, id) {
    show_receive_message();
    toggle[id][current_layout][i] = val;
    sendSysex(13, current_layout, i, val, id_to_toggle[id], 1);
  }

  function on_custom_MIDI_change(num, value, id, datatype) {
    value = parseInt(value);
    if (id=="external_MIDI") num = 0;
    if (datatype == "type_select") type[id][current_layout][num] = value-1
    if (datatype == "cc_select") control[id][current_layout][num] = value
    if (datatype == "ch_select") channel[id][current_layout][num] = value
    if(id=="encoder_short") num_to_send = num + NUM_BUTTONS;
    else num_to_send = num;
    show_receive_message();
    sleep(pause)

    var s = document.getElementById(id + num);
    if (s.value == Object.keys(actions[id]).indexOf("Custom Action")){
      type[id][current_layout][num] = 1
      channel[id][current_layout][num] = 15
    }
    sendSysex(id_to_sysex[id], current_layout, num_to_send, control[id][current_layout][num], type[id][current_layout][num], channel[id][current_layout][num]);
    sleep(pause)
    request_Live_update();
  }

  
  //////////////////////////////////////////////////////////////////////
  // UPDATE DISPLAY AT STARTUP AND ON PAGE CHANGE
  //////////////////////////////////////////////////////////////////////

  
  function on_page_select_changed(layout) {
    current_layout = layout;
    for (var i = 0; i < NUM_BUTTONS; i++) { // update Buttons Selects
      id = "button_short"
      update_button_selects(id, i, type[id][current_layout][i], control[id][current_layout][i], channel[id][current_layout][i], toggle[id][current_layout][i], snap[id][current_layout][i]);
      id = "button_long"
      update_button_selects(id, i, type[id][current_layout][i], control[id][current_layout][i], channel[id][current_layout][i], toggle[id][current_layout][i]);
      id = "button_double"
      update_button_selects(id, i, type[id][current_layout][i], control[id][current_layout][i], channel[id][current_layout][i], toggle[id][current_layout][i]);
    }
    for (var i = 0; i < NUM_LEDS; i++) { // update LEDs
      id = "led"
      update_led_selects(id, i, type[id][current_layout][i], control[id][current_layout][i], channel[id][current_layout][i])
    }

    for (var i = 0; i < NUM_SLIDERS; i++) { // updates sliders
      id = "slider"
      update_select(id, i, control[id][current_layout][i], channel[id][current_layout][i])
    }

    for (var i = 0; i < NUM_ENCODERS; i++) { // updates encoders
      id = "encoder"
      update_select(id, i, control[id][current_layout][i], channel[id][current_layout][i])
      id = "encoder_hold"
      update_select(id, i, control[id][current_layout][i], channel[id][current_layout][i])
      id = "encoder_short"
      update_button_selects(id, i, type[id][current_layout][i], control[id][current_layout][i], channel[id][current_layout][i]);
    }
    update_display_select(control["display"][current_layout][0])
    update_linked_to()
  }

  function update_linked_to(){    
    var session_checkbox = document.getElementById("link_to_session_button");
    var arr_checkbox = document.getElementById("link_to_arr_button");
    session_checkbox.checked = false;
    arr_checkbox.checked = false;
    if (control["linked_to"][current_layout] == 1) session_checkbox.checked = true;
    if (control["linked_to"][current_layout] == 2) arr_checkbox.checked = true;
  }

  function update_button_selects(id, i, _type, _control, _channel, _toggle, _snap=null) {
    channel[id][current_layout][i] = _channel;
    control[id][current_layout][i] = _control;
    type[id][current_layout][i] = _type;
    toggle[id][current_layout][i] = _toggle;

    // console.log(id, i, _type, _control, _channel, _toggle)
    var s = document.getElementById(id + i);
    if (_type == 0 && _channel == 16) s.value = Object.keys(button_actions).indexOf("① MIDI Map 1 (Big Button)");
    else if (_type == 0 && _channel == 15) s.value = Object.keys(button_actions).indexOf("② MIDI Map 2 (Clear)");
    else if (_type == 0 && _channel == 14) s.value = Object.keys(button_actions).indexOf("③ MIDI Map 3");
    else if (_type == 0 && _channel == 13) s.value = Object.keys(button_actions).indexOf("④ MIDI Map 4");
    else if (_type == 0 && _channel == 12) s.value = Object.keys(button_actions).indexOf("⑤ MIDI Map 5");
    else if (_type == 0 && _channel == 11) s.value = Object.keys(button_actions).indexOf("⑥ MIDI Map 6");
    else {
      value = get_index(_control, actions[id]);
      s.value = value
      update_custom_MIDI(id, i, false)
      // update_custom_action(id, i, false)
    }
    if (_snap != null)
      { var s = document.getElementById("snap_checkbox" + i);
      s.checked = _snap;
      update_snap_box(i, _snap);
    }
  }

  function update_led_selects(id, i, _type, _control, _channel){
    channel[id][current_layout][i] = _channel;
    control[id][current_layout][i] = _control;
    type[id][current_layout][i] = _type;

      var s = document.getElementById("led" + i);
      var c = document.getElementById("color_sel" + (i));
      c.style.display = "none";
      if (_channel == 10) {
        s.value = 1;
        s.value = 0;
        c.style.display = "block";
        c.value = _control;
      }
      else s.value = get_index(_control, led_actions);
      s.style.display = "block";
  }

  function update_select(id, i, _control, _channel){
    channel[id][current_layout][i] = _channel;
    control[id][current_layout][i] = _control;
      var s = document.getElementById(id + i);
      value = get_index(_control, actions[id]);
      s.value = value
      update_custom_MIDI(id, i, false)
      // update_custom_action(id, i, false)
  }
  
  function update_display_select(value){
    var s = document.getElementById("display0");
    s.value = get_index(value, display_actions);
  }

  function update_snap_box(num, value) {
    a = ["long", "double"]
    for (_a of a) {
      var s = document.getElementById("button_" + _a + num);
      var l = document.getElementById("button_" + _a + "_label" + num);
      if (value == 1) {
        s.style.visibility = "hidden";
        l.style.visibility = "hidden";
      }
      else {
        s.style.visibility = "visible";
        l.style.visibility = "visible";
      }
    }
  }

  function update_custom_MIDI(id, i, switching) {
    _channel = channel[id][current_layout][i];
    _control = control[id][current_layout][i];
    is_button = (control_type[id] == "button")
    is_not_encoder_short = (control_type[id] == "button" && id!="encoder_short")
    if (is_button) _type = type[id][current_layout][i];
    if (is_button) _toggle = toggle[id][current_layout][i];
    custom_MIDI = false;
    custom_Action = false;

    var main_sel = document.getElementById("custom_MIDI_" + id + i);
    var sel_type = document.getElementById(id+"_type_select" + i);
    var sel_cc = document.getElementById(id+"_cc_select" + i);
    var sel_ch = document.getElementById(id+"_ch_select" + i);
    if (is_not_encoder_short)  var sel_toggle = document.getElementById("toggle_" + id + i);
    if (is_not_encoder_short)  var toggle_checkbox = document.getElementById(id+ "_toggle_checkbox"+ i);

    var s = document.getElementById(id + i);
    value = get_index(_control, actions[id]);
    s.value = value
    if (switching) {
      state= "visible";
      if (s.value == Object.keys(actions[id]).indexOf("Custom MIDI")) custom_MIDI = true;
      else if (s.value == Object.keys(actions[id]).indexOf("Custom Action")) custom_Action = true;
    }
    else{
      if  (_channel < 11) custom_MIDI = true;
      if (_channel == 15) custom_Action = true;
    }

    // console.log(id, i, _channel, custom_MIDI)
    if (custom_MIDI) {
      if (is_button) sel_type.style.visibility = "visible";
      sel_cc.style.visibility = "visible";
      sel_ch.style.visibility = "visible";
      main_sel.style.visibility = "visible";
      if (is_button)  sel_type.value = _type + 1;
      sel_cc.value = _control;
      sel_ch.value = _channel;
      if (is_not_encoder_short)  sel_toggle.style.visibility = "visible";
      if (is_not_encoder_short)  toggle_checkbox.checked = _toggle;
      main_sel.style.visibility = "visible";
      if (is_not_encoder_short)  sel_toggle.style.visibility = "visible";
      s.value = Object.keys(actions[id]).indexOf("Custom MIDI");
    }
    else if (custom_Action) {    
      if (is_button) sel_type.style.visibility = "hidden";
      sel_cc.style.visibility = "visible";
      sel_ch.style.visibility = "hidden";
      main_sel.style.visibility = "hidden";
      if (is_button)  sel_type.value = _type + 1;
      sel_cc.value = _control;
      sel_ch.value = _channel;
      if (is_not_encoder_short)  sel_toggle.style.visibility = "visible";
      if (is_not_encoder_short)  toggle_checkbox.checked = _toggle;
      main_sel.style.visibility = "hidden";
      if (is_not_encoder_short)  sel_toggle.style.visibility = "visible";
      s.value = Object.keys(actions[id]).indexOf("Custom Action");
    }
    else  {    
      if (is_button) sel_type.style.visibility = "hidden";
      sel_cc.style.visibility = "hidden";
      sel_ch.style.visibility = "hidden";
      main_sel.style.visibility = "hidden";
      if (is_button)  sel_type.value = _type + 1;
      sel_cc.value = _control;
      sel_ch.value = _channel;
      if (is_not_encoder_short)  sel_toggle.style.visibility = "hidden";
      if (is_not_encoder_short)  toggle_checkbox.checked = _toggle;
      main_sel.style.visibility = "hidden";
      if (is_not_encoder_short)  sel_toggle.style.visibility = "hidden";
    }
  }
  
  function get_index(control_number, action_type) {
    var values_list = Object.values(action_type)
    return values_list.indexOf(control_number);
  }

  function set_External_MIDI(num, btn_ctrl, btn_chnl, btn_type) {
    var cc_sel = document.getElementById("external_MIDI_cc_select" + num);
    var ch_sel = document.getElementById("external_MIDI_ch_select" + num);
    cc_sel.value = btn_ctrl;
    ch_sel.value = btn_chnl;
    if (num<8){
      var type_sel = document.getElementById("external_MIDI_type_select" + num);
      type_sel.value = btn_type;
    }
    control["external_MIDI"][0][num] = btn_ctrl;
    type["external_MIDI"][0][num] = btn_type
    channel["external_MIDI"][0][num] = btn_chnl
  }

  function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

  function create_preset_cell(div){
    var divClass = document.getElementsByClassName(div);
    var preset_buttons = [document.createElement('label'), document.createElement('label')];

    // Export
    var save_button =  document.createElement('input');
    save_button.id = "save"
    save_button.type = "button"
    save_button.value = "Save"
    save_button.className = "preset"
    save_button.onclick = function() {
      var obj2 = {
        type_button_short : type["button_short"][current_layout],
        control_button_short: control["button_short"][current_layout],
        channel_button_short: channel["button_short"][current_layout], 
        toggle_button_short: toggle["button_short"][current_layout], 
        snap_button_short: snap["button_short"][current_layout], 
        type_button_long: type["button_long"][current_layout], 
        control_button_long : control["button_long"][current_layout], 
        channel_button_long : channel["button_long"][current_layout], 
        toggle_button_long : toggle["button_long"][current_layout], 
        type_button_double : type["button_double"][current_layout], 
        control_button_double : control["button_double"][current_layout], 
        channel_button_double : channel["button_double"][current_layout], 
        toggle_button_double : toggle["button_double"][current_layout], 
        type_led : type["led"][current_layout], 
        control_led : control["led"][current_layout], 
        channel_led : channel["led"][current_layout], 
        type_encoder_short : type["encoder_short"][current_layout], 
        control_encoder_short : control["encoder_short"][current_layout], 
        channel_encoder_short : channel["encoder_short"][current_layout], 
        control_encoder : control["encoder"][current_layout], 
        channel_encoder : channel["encoder"][current_layout], 
        control_encoder_hold : control["encoder_hold"][current_layout], 
        channel_encoder_hold : channel["encoder_hold"][current_layout], 
        control_slider : control["slider"][current_layout], 
        channel_slider : channel["slider"][current_layout], 
        display:  control["display"][current_layout]
      }
      saveText( JSON.stringify(obj2), "Page "+(current_layout+1)+".json" );
    }
    save_label = document.createElement('label');
    save_label.className = "preset"
    save_label.appendChild(document.createTextNode('Export'));
    save_label.htmlFor = "save"
    
    // Import
    var load_button =  document.createElement('input');
    load_button.type = "file"
    load_button.id = "file-input"
    load_button.accept = ".json"
    load_button.className = "preset"
    load_button.addEventListener('change', readSingleFile, false);
    load_label = document.createElement('label');
    load_label.className = "preset"
    load_label.appendChild(document.createTextNode('Import'));
    load_label.htmlFor = "file-input"

    // Upload
    var upload_button =  document.createElement('input');
    upload_button.type = "button"
    upload_button.value = "Upload"
    upload_button.id = "upload"
    upload_button.className = "preset"
    upload_button.onclick = function() {uploadPreset()}
    upload_label = document.createElement('label');
    upload_label.className = "preset"
    upload_label.id = "upload_label"
    upload_label.htmlFor = "upload"
    upload_label.appendChild(document.createTextNode('Upload'));
    upload_label.style.visibility = "hidden"
    upload_button.style.visibility = "hidden"


    // CSV
    var csv_button =  document.createElement('input');
    csv_button.id = "csv"
    csv_button.type = "button"
    csv_button.value = "csv"
    csv_button.className = "preset"
    csv_button.onclick = function() {
	var csvContent = "data:text/csv;charset=utf-8,";
      var table = []
      var i = 0
      var index = ["   "]
      var display = ["Display"]
      for (button of control["display"][current_layout]){
        display.push(getKeyByValue(display_actions, button))
        }

      var led = ["LED"]
      for (button of control["led"][current_layout]){
        i++
        index.push(i.toString())
        led.push(getKeyByValue(led_actions, button))
        }

      i = 0
      var button_short = ["Button Short"]
      for (button of control["button_short"][current_layout]){
        var action = null
        action = get_midi_map_button("button_short", i)
        if (action == null) action = getKeyByValue(button_actions, button)
        button_short.push(action)
        i++
        }

      i = 0
      var button_long = ["Button Long"]
      for (button of control["button_long"][current_layout]){
        var action = null
        if (snap["button_short"][current_layout][i] == 1) action = "Off (Snap On)"
        if (action == null) action = get_midi_map_button("button_long", i)
        if (action == null) action = getKeyByValue(button_actions, button)
        button_long.push(action)
        i++
        }
        button_long.length -= 2;

        i = 0
      var button_double = ["Button Double"]
      for (button of control["button_double"][current_layout]){
        var action = null
        if (snap["button_short"][current_layout][i] == 1) action = "Off (Snap On)"
        if (action == null) action = get_midi_map_button("button_double", i)
        if (action == null) action = getKeyByValue(button_actions, button)
        button_double.push(action)
        i++
        }
        button_double.length -= 2;

      var encoder = ["Encoder"]
      for (button of control["encoder"][current_layout]){
        encoder.push(getKeyByValue(encoder_actions, button))
        }
        encoder.length += 4;
      var encoder_hold = ["Encoder Hold"]
      for (button of control["encoder_hold"][current_layout]){
        encoder_hold.push(getKeyByValue(encoder_actions, button))
        }
        encoder_hold.length += 5;
      var encoder_button = ["Encoder Button"]
      for (button of control["encoder_short"][current_layout]){
        encoder_button.push(getKeyByValue(button_actions, button))
        }
        encoder_button.length += 6;
      var slider = ["Expression Pedal"]
      for (button of control["slider"][current_layout]){
        slider.push(getKeyByValue(slider_actions, button))
        }
        // encoder_short.length += 4;

      table = [display, index, led, button_short, button_long, button_double, encoder, encoder_hold, encoder_button, slider]
      table.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
		});
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
    }

    csv_label = document.createElement('label');
    csv_label.className = "preset"
    csv_label.appendChild(document.createTextNode('CSV'));
    csv_label.htmlFor = "csv"

    preset_buttons[0].appendChild(save_button);
    preset_buttons[0].appendChild(save_label);
    preset_buttons[0].appendChild(load_button);
    preset_buttons[0].appendChild(load_label);
    preset_buttons[0].appendChild(upload_button);
    preset_buttons[0].appendChild(upload_label);
    preset_buttons[0].appendChild(csv_button);
    preset_buttons[0].appendChild(csv_label);
    return (preset_buttons[0])
  }

function get_midi_map_button(btn, index){
  var result = null
  var _type = type[btn][current_layout][index]
  var _channel = channel[btn][current_layout][index]
  if (_type == 0){
    if (_channel == 16) result = "① MIDI Map 1 (Big Button)";
    else if (_channel == 15) result = "② MIDI Map 2 (Clear)";
    else if (_channel == 14) result = "③ MIDI Map 3";
    else if (_channel == 13) result = "④ MIDI Map 4";
    else if (_channel == 12) result = "⑤ MIDI Map 5";
    else if (_channel == 11) result = "⑥ MIDI Map 6";
  }
  return result
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);

  var upload_button = document.getElementById("upload");
  var upload_label = document.getElementById("upload_label");
  upload_label.style.visibility = "visible"
  upload_button.style.visibility = "visible"
}
var elements

function displayContents(contents) {
  elements = JSON.parse(contents);
  console.log(elements)

//   on_page_select_loaded(current_layout);
// }

// function on_page_select_loaded(layout) {
    // current_layout = layout;
    for (var i = 0; i < NUM_BUTTONS; i++) { // update Buttons Selects
      id = "button_short"
      update_button_selects(id, i, elements["type_"+id][i], elements["control_"+id][i], elements["channel_"+id][i], elements["toggle_"+id][i],  elements["snap_"+id][i]);
      id = "button_long"
      update_button_selects(id, i,  elements["type_"+id][i], elements["control_"+id][i], elements["channel_"+id][i], elements["toggle_"+id][i]);
      id = "button_double"
      update_button_selects(id, i,  elements["type_"+id][i], elements["control_"+id][i], elements["channel_"+id][i], elements["toggle_"+id][i]);
    }
    for (var i = 0; i < NUM_LEDS; i++) { // update LEDs
      id = "led"
      update_led_selects(id, i, elements["type_"+id][i], elements["control_"+id][i], elements["channel_"+id][i])
    }

    for (var i = 0; i < NUM_SLIDERS; i++) { // updates sliders
      id = "slider"
      update_select(id, i, elements["control_"+id][i], elements["channel_"+id][i])
    }

    for (var i = 0; i < NUM_ENCODERS; i++) { // updates encoders
      id = "encoder"
      update_select(id, i, elements["control_"+id][i], elements["channel_"+id][i])
      id = "encoder_hold"
      update_select(id, i, elements["control_"+id][i], elements["channel_"+id][i])
      id = "encoder_short"
      update_button_selects(id, i, elements["type_"+id][i], elements["control_"+id][i], elements["channel_"+id][i], 0);
    }
    update_display_select(elements["display"][0])
  }
  
  function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

var pause = 10;

  function uploadPreset() { 
    console.log("bing")
  type["button_short"][current_layout] = elements["type_button_short"];
  control["button_short"][current_layout] = elements["control_button_short"];
  channel["button_short"][current_layout] = elements["channel_button_short"];
  toggle["button_short"][current_layout] = elements["toggle_button_short"];
  snap["button_short"][current_layout] = elements["snap_button_short"];
  type["button_long"][current_layout] = elements["type_button_long"];
  control["button_long"][current_layout] = elements["control_button_long"];
  channel["button_long"][current_layout] = elements["channel_button_long"];
  toggle["button_long"][current_layout] = elements["toggle_button_long"];
  type["button_double"][current_layout] = elements["type_button_double"];
  control["button_double"][current_layout] = elements["control_button_double"];
  channel["button_double"][current_layout] = elements["channel_button_double"];
  toggle["button_double"][current_layout] = elements["toggle_button_double"];
  type["led"][current_layout] = elements["type_led"];
  control["led"][current_layout] = elements["control_led"];
  channel["led"][current_layout] = elements["channel_led"];
  type["encoder_short"][current_layout] = elements["type_encoder_short"];
  control["encoder_short"][current_layout] = elements["control_encoder_short"];
  channel["encoder_short"][current_layout] = elements["channel_encoder_short"];
  control["encoder"][current_layout] = elements["control_encoder"];
  channel["encoder"][current_layout] = elements["channel_encoder"];
  control["encoder_hold"][current_layout] = elements["control_encoder_hold"];
  channel["encoder_hold"][current_layout] = elements["channel_encoder_hold"];
  control["slider"][current_layout] = elements["control_slider"];
  channel["slider"][current_layout] = elements["channel_slider"];
  control["display"][current_layout] = elements["display"];

    for (var i = 0; i < 6; i++) {
    show_receive_message();
   // "button_short"
   id = "button_short";
   sendSysex(id_to_sysex[id], current_layout, i, control[id][current_layout][i], type[id][current_layout][i], channel[id][current_layout][i]);
sleep(pause)
id = "button_long"
   sendSysex(id_to_sysex[id], current_layout, i, control[id][current_layout][i], type[id][current_layout][i], channel[id][current_layout][i]);
   sleep(pause)
   id = "button_double"
   sendSysex(id_to_sysex[id], current_layout, i, control[id][current_layout][i], type[id][current_layout][i], channel[id][current_layout][i]);
   sleep(pause)
   id = "led"
    sendSysex(id_to_sysex[id], current_layout, i, control[id][current_layout][i], 1, 16);
    sleep(pause)
    id =  "snap"
sendRawSysex([240, 122, 29, 1, 19, id_to_sysex[id], current_layout, i, snap["button_short"][current_layout][i], 247]);
sleep(pause)
id =  "toggle_short"
        sendRawSysex([240, 122, 29, 1, 19, id_to_sysex[id], current_layout, i, toggle["button_short"][current_layout][i], 0, 247]);
        sleep(pause)
        id = "toggle_long"
        sendRawSysex([240, 122, 29, 1, 19, id_to_sysex[id], current_layout, i, toggle["button_long"][current_layout][i], 1, 247]);
sleep(pause)
id =  "toggle_double"
        sendRawSysex([240, 122, 29, 1, 19, id_to_sysex[id], current_layout, i, toggle["button_double"][current_layout][i], 2, 247]);
}

show_receive_message();
    for (var i = 0; i < 2; i++) {
      id =  "slider"
sleep(pause)
     sendSysex(id_to_sysex[id], current_layout, i, control[id][current_layout][i], 1, channel[id][current_layout][i]);
     id =  "encoder"
sleep(pause)
     sendSysex(id_to_sysex[id], current_layout, i, control[id][current_layout][i], 1, channel[id][current_layout][i]);
     id =  "encoder_hold"
sleep(pause)
     sendSysex(id_to_sysex[id], current_layout, i+2, control[id][current_layout][i], 1, channel[id][current_layout][i]);
id =  "encoder_short"
sleep(pause)
   sendSysex(id_to_sysex[id], current_layout, i+6, control[id][current_layout][i], type[id][current_layout][i], channel[id][current_layout][i]);
    }

    sleep(pause)
    id =  "display"
   sendSysex(id_to_sysex[id], current_layout, 1, control[id][current_layout][0], 1, 16);
   request_Live_update()

  }

  function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}