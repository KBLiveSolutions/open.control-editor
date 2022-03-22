
  ///////////////////////////////////
  // CREATE TABLES AND FUNCTIONS
  ///////////////////////////////////

  function create_options_table(div) {
    var divClass = document.getElementById(div);
    var optionsTable = document.createElement('table');
    optionsTable.className = "type_options";
    var optionsTable_row0 = optionsTable.insertRow(0);
    var optionsTable_row1 = optionsTable.insertRow(1);
    var optionsTable_row2 = optionsTable.insertRow(2);
    text_cell = document.createElement('td')
    text_cell.innerHTML = "Options"
    // text_cell.className = "type_options";
    text_cell.setAttribute("colspan", "4");
    var options_cell = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td')];
    
    for (var i = 0; i < 10; i++) {
    options_cell[i].className = "type_options";
    }

    tempo_option = create_bpm_option("Options");
    session_box_option = create_session_box_option("Options");
    led_brightness_option = create_led_brightness_option("Options");
    display_brightness_option = create_display_brightness_option("Options");
    midi_thru_option = create_midi_thru_option("Options");
    options_cell[0].appendChild(tempo_option[0]);
    options_cell[0].appendChild(tempo_option[1]);
    options_cell[1].appendChild(session_box_option[0]);
    options_cell[1].appendChild(session_box_option[1]);

    options_cell[2].appendChild(display_brightness_option[0]);
    options_cell[2].appendChild(display_brightness_option[1]);
    options_cell[2].appendChild(display_brightness_option[2]);
    options_cell[3].appendChild(led_brightness_option[1]);
    options_cell[3].appendChild(led_brightness_option[0]);
    options_cell[4].innerHTML = "Forward MIDI In to:"
    options_cell[5].appendChild(midi_thru_option);

    


    // Connect
    var connect_button =  document.createElement('input');
    connect_button.type = "button"
    connect_button.value = "Connect"
    connect_button.id = "connect"
    connect_button.className = "preset"
    connect_button.onclick = function() {connect_webusb()}
    connect_label = document.createElement('label');
    connect_label.className = "preset"
    connect_label.htmlFor = "connect"
    connect_label.appendChild(document.createTextNode('Connect'));
    // Refesh
    var refresh_button =  document.createElement('input');
    refresh_button.type = "button"
    refresh_button.value = "Refesh"
    refresh_button.id = "refresh"
    refresh_button.className = "preset"
    // refresh_button.onclick = function() {refresh_webusb()}
    refresh_label = document.createElement('label');
    refresh_label.className = "preset"
    refresh_label.htmlFor = "refresh"
    refresh_label.appendChild(document.createTextNode('Refesh'));


    var statusLabel = document.createElement('label');
    statusLabel.id = "Status Label";
    statusLabel.innerHTML = "<b><font color=#000000> Please connect open·control </font></b><br><br>";
    options_cell[6].className = "connect_cell";
    options_cell[6].id = "connect_cell";
    options_cell[6].appendChild(statusLabel)
    options_cell[6].appendChild(connect_button);
    options_cell[6].appendChild(connect_label);
    options_cell[6].setAttribute("rowspan", "2");
    // options_cell[6].appendChild(refresh_button);
    // options_cell[6].appendChild(refresh_label);


    options_cell[7].innerHTML = "<span style=vertical-align: middle> <a href=https://kblivesolutions.github.io/open.control/user_manual/ target=_blank><img src=./question_mark.png width=15px></a></span> <a href= http://opencontrol.me><img src=https://kblivesolutions.github.io/open.control/assets/images/logo_big.png  width=110px></a>"
    options_cell[7].setAttribute("rowspan", "2");

    optionsTable_row1.appendChild(options_cell[7]);
    // optionsTable_row2.appendChild(options_cell[8]);
    optionsTable_row1.appendChild(options_cell[0]);
    optionsTable_row2.appendChild(options_cell[1]);
    optionsTable_row1.appendChild(options_cell[2]);
    optionsTable_row2.appendChild(options_cell[3]);
    optionsTable_row1.appendChild(options_cell[4]);
    optionsTable_row2.appendChild(options_cell[5]);
    optionsTable_row1.appendChild(options_cell[6])
    divClass.appendChild(optionsTable);
  }

  function create_bpm_option(div) {
    var divClass = document.getElementsByClassName(div);
    var tempo_label = document.createElement('label');
    var tempo_checkbox = document.createElement('input');
    tempo_checkbox.type = "checkbox";
    tempo_checkbox.id = "metro";
    tempo_checkbox.className = "demo2"
    tempo_label.htmlFor = tempo_checkbox.id

    tempo_label.appendChild(document.createTextNode(' Metronome blinking'));

    tempo_checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        sendRawSysex([240, 122, 29, 1, 19, 30, 0, 0, 247]);
        options["metro"] = 0;
      }
      else {
        sendRawSysex([240, 122, 29, 1, 19, 30, 0, 1, 247]);
        options["metro"] = 1;
      }
    show_receive_message();
      request_Live_update();
    })
    return ([tempo_checkbox, tempo_label])
  }

  function create_session_box_option(div) {
    var divClass = document.getElementsByClassName(div);
    var session_box_label = document.createElement('label');
    var session_box_checkbox = document.createElement('input');
    session_box_checkbox.type = "checkbox";
    session_box_checkbox.id = "session_box";
    session_box_checkbox.className = "demo2"
    session_box_label.htmlFor = session_box_checkbox.id

    session_box_label.appendChild(document.createTextNode(' Create Session Box'));

    session_box_checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        options["session_box"] = 0;
        sendRawSysex([240, 122, 29, 1, 19, 30, 1, 0, 247]);
      }
      else {
        options["session_box"] = 1;
        sendRawSysex([240, 122, 29, 1, 19, 30, 1, 1, 247]);
      }
    show_receive_message();
      request_Live_update();
    })
    return ([session_box_checkbox, session_box_label])
  }

  function create_led_brightness_option(div) {
    var divClass = document.getElementsByClassName(div);
    var brightness_slider = document.createElement('input');
    brightness_slider.type = 'range';
    brightness_slider.steps = "1";
    brightness_slider.min = "10";
    brightness_slider.max = "127";
    brightness_slider.class = "slider";
    // brightness_slider.id = "brightness_slider";

    var brightness_slider_label = document.createElement('label');
    brightness_slider_label.appendChild(document.createTextNode(' LEDs Brightness'));

    brightness_slider.oninput = function () { on_LEDs_brightness_change(brightness_slider.value); };
    return ([brightness_slider, brightness_slider_label]);
  }

  function create_display_brightness_option(div) {
    var divClass = document.getElementsByClassName(div);

    var display_brightness_label = document.createElement('label');
    var display_brightness = document.createElement('input');
    display_brightness.type = "checkbox";
    display_brightness.id = "display_brightness_checkbox";
    display_brightness.className = "display_brightness"
    display_brightness_label.htmlFor = display_brightness.id
    display_brightness.addEventListener('change', (event) => {
      if (event.target.checked) on_display_brightness_changed(127);
      else on_display_brightness_changed(80);
    })
    // display_brightness_cell = [display_brightness, display_brightness_label];

    var display_brightness_slider_label = document.createElement('label');
    display_brightness_slider_label.appendChild(document.createTextNode(' Display Brightness'));
    // display_brightness_slider.oninput = function () { on_display_brightness_change(display_brightness_slider.value); };
    return ([display_brightness_slider_label, display_brightness, display_brightness_label]);
  }

  function create_midi_thru_option(div) {
    var divClass = document.getElementsByClassName(div);
    var usb_thru_div = document.createElement('div');
    var usb_thru_label = document.createElement('label');
    var usb_thru_checkbox = document.createElement('input');
    usb_thru_checkbox.type = "checkbox";
    usb_thru_checkbox.id = "usb_thru_box";
    usb_thru_checkbox.className = "demo2"
    usb_thru_label.htmlFor = usb_thru_checkbox.id
    usb_thru_label.appendChild(document.createTextNode('USB   '));
    usb_thru_checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        options[1] = 0;
        sendRawSysex([240, 122, 29, 1, 19, 25, 1, 247]);
      }
      else {
        options[1] = 1;
        sendRawSysex([240, 122, 29, 1, 19, 25, 0, 247]);
      }
    })
    var midi_out_thru_label = document.createElement('label');
    var midi_out_thru_checkbox = document.createElement('input');
    midi_out_thru_checkbox.type = "checkbox";
    midi_out_thru_checkbox.id = "midi_thru_box";
    midi_out_thru_checkbox.className = "demo2"
    midi_out_thru_label.htmlFor = midi_out_thru_checkbox.id
    midi_out_thru_label.appendChild(document.createTextNode('MIDI Out'));
    midi_out_thru_checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        options[1] = 0;
        sendRawSysex([240, 122, 29, 1, 19, 26, 1, 247]);
      }
      else {
        options[1] = 1;
        sendRawSysex([240, 122, 29, 1, 19, 26, 0, 247]);
      }
    })

    usb_thru_div.appendChild(usb_thru_checkbox);
    usb_thru_div.appendChild(usb_thru_label);
    usb_thru_div.appendChild(midi_out_thru_checkbox);
    usb_thru_div.appendChild(midi_out_thru_label);
    return (usb_thru_div)
  }

  function create_sel(num, options_dict, id, display) {
    var select = document.createElement('select')
    var options_str = "";
    if (!Array.isArray(options_dict)) var options_list = Object.keys(options_dict);
    else options_list = options_dict;
    options_list.forEach(function (option) { options_str += '<option value=' + options_list.indexOf(option) + '>' + option + '</option>'; });
    select.innerHTML = options_str;
    select.num = num;
    select.id = id + num;
    select.onchange = function () { on_select_change(id, select.num, select.value); };
    select.classList.add('select1');
    return select
  }

  function create_color_sel(num) {
    var select = document.createElement('select')
    var options_str = "";
    color_names.forEach(function (option) { options_str += '<option value=' + color_names.indexOf(option) + '>' + option + '</option>'; });
    select.innerHTML = options_str;
    select.num = num;
    select.id = 'color_sel' + num;
    select.className = 'color_select'
    select.onchange = function () { on_color_change(select.num, select.value, num); };
    return select
  }
 
  function create_layout_table(div) {
    var divClass = document.getElementById(div);
    var mainTable = document.createElement('table');
    divClass.className = "Layout";
    var mainTable_row0 = mainTable.insertRow(0);
    var mainTable_row1 = mainTable.insertRow(1);
    var mainTable_row2 = mainTable.insertRow(2);
    var main_cell = document.createElement('td');
    // var status_cell = document.createElement('td');
    var preset_cell = document.createElement('td');
    var main_cell_table = document.createElement('table');
    var layout_icon_cell = main_cell_table.insertRow(-1).insertCell(0);
    var layout_select_cell = main_cell_table.insertRow(-1).insertCell(0);
    var link_to_label_cell = mainTable_row1.insertCell(0);
    // var link_to_buttons_cell = mainTable_row2.insertCell(0);
    mainTable.className = "type_layout";

    layout_icon_cell.innerHTML = "Select Page";
    sel_layout = create_sel(90, layout_actions, 'page', 'block');
    layout_icon_cell.className = "layout";

    divClass.appendChild(mainTable);
    main_cell.appendChild(layout_icon_cell);
    main_cell.appendChild(sel_layout);

    preset_cell_content = create_preset_cell("Options");
    preset_cell.appendChild(preset_cell_content);
    preset_cell.className = "preset";

    link_to_label_cell.innerHTML = "<font size=2><br></font>";
    var link_to_buttons_cell = create_link_option("Options");
    link_to_buttons_cell.className = "link_to";
    link_to_buttons_cell.setAttribute("rowspan", "2");

    mainTable_row0.appendChild(main_cell);
    mainTable_row0.appendChild(link_to_label_cell);
    mainTable_row1.appendChild(preset_cell);
    mainTable_row0.appendChild(link_to_buttons_cell);
  }

  function create_link_option(div){
    var divClass = document.getElementsByClassName(div);
    var linkTable = document.createElement('table');
    linkTable.className = "link_to";
    var linkTable_row0 = linkTable.insertRow(0);
    var linkTable_row1 = linkTable.insertRow(1);
    var linkTable_row2 = linkTable.insertRow(2);
    link_to_label = document.createElement('td');
    linkButton0 = document.createElement('td');
    linkButton1 = document.createElement('td');
    linkButton2 = document.createElement('td');
    var link_buttons = [document.createElement('label'), document.createElement('label')];
    var link_to_session_button =  document.createElement('input');
    link_to_session_button.id = "link_to_session_button"
    link_to_session_button.type = "checkbox"
    link_to_session_button.className = "link_to_session"
    link_to_session_button.addEventListener('change', (event) => {
      if (event.target.checked) on_link_to_changed(1);
      else on_link_to_changed(0);
    })
    link_to_session_label = document.createElement('label');
    link_to_session_label.className = "link_to"
    // link_to_session_label.appendChild(document.createTextNode('Session'));
    link_to_session_label.htmlFor = "link_to_session_button"
    
    var link_to_arr_button =  document.createElement('input');
    link_to_arr_button.type = "checkbox"
    link_to_arr_button.id = "link_to_arr_button"
    link_to_arr_button.className = "link_to_arr"
    link_to_arr_button.addEventListener('change', (event) => {
      if (event.target.checked) on_link_to_changed(2);
      else on_link_to_changed(0);
    })
    link_to_arr_label = document.createElement('label');
    link_to_arr_label.className = "link_to"
    // link_to_arr_label.appendChild(document.createTextNode('Arrang.'));
    link_to_arr_label.htmlFor = "link_to_arr_button"

    linkButton0.className = "link_to";
    linkButton1.className = "link_to";
    linkButton2.className = "link_to";

    link_to_label.innerHTML = "<font size=2>Link to:<br></font>";
    // if (min_ver < 2) link_to_label.innerHTML = "<font size=2>Link to:<br></font><font color=red size=1>Needs firmware 1.2</font>";
    // else link_to_label.innerHTML = "<font size=2>Link to:<br></font>";
    linkButton0.appendChild(link_to_session_button);
    linkButton0.appendChild(link_to_session_label);
    linkButton1.appendChild(link_to_arr_button);
    linkButton1.appendChild(link_to_arr_label);
    linkTable_row0.appendChild(link_to_label);
    linkTable_row1.appendChild(linkButton0);
    linkTable_row2.appendChild(linkButton1);
    return (linkTable)

  }

  function on_link_to_changed(linked_view){
    control["linked_to"][current_layout] = linked_view
    update_linked_to()
    for (var j = 0; j < NUM_LAYOUTS; j++) {
      if (j != current_layout && control["linked_to"][j] == linked_view) control["linked_to"][j] = 0;
    }
    show_receive_message();
    sendRawSysex([240, 122, 29, 1, 19, 24, current_layout, linked_view, 247]);
  }

  function create_display_table(div) {
    var divClass = document.getElementsByClassName(div);
    var mainTable = document.createElement('table');
    var mainRow = document.createElement("tr");
    mainRow.className = "columns-container";
    let mainCell = document.createElement('td');
    var empty_cell = document.createElement('td');

    var display_icon_row = document.createElement("tr");
    let display_icon_cell = document.createElement('td');
    var display_select_row = document.createElement("tr");
    let display_select_cell = document.createElement('td');

    mainCell.className = "type_display";

    display_icon_cell.innerHTML = "Display";
    display_icon_cell.className = "layout";
    sel_display = create_sel(0, display_actions, 'display', 'block');
    sel_display.className = 'display_select'

    display_select_cell.appendChild(sel_display);

    display_icon_row.appendChild(display_icon_cell);
    display_select_row.appendChild(display_select_cell);


    mainCell.appendChild(display_icon_row);
    mainCell.appendChild(display_select_row);
    mainTable.appendChild(mainCell);
    mainCell.appendChild(empty_cell);
    divClass[0].appendChild(mainTable);
    // main_cell.appendChild(display_icon_cell);
    // main_cell.appendChild(sel_display);
  }

  function create_buttons_table(div) {
    // Creates a row of controls described by the name of the div, the number of controls,
    // the offset number of the first control and the type of control
    var divClass = document.getElementsByClassName(div);
    var mainTable = document.createElement('table');
    var mainTable_row0 = mainTable.insertRow(0);

    for (var i = 0; i < NUM_BUTTONS; i++) {
      // creates the content of each cell of the main table
      let main_cell = document.createElement('td');
      mainTable_row0.className = "columns-container";
      create_button_cell_content(main_cell, i);
      mainTable_row0.appendChild(main_cell);
      main_cell.className = "main_cell";
    }

    divClass[0].appendChild(mainTable);
  }

  function create_button_cell_content(main_cell, i) {
    let main_cell_table = document.createElement('table');
    let row = [];
    let cell = [];
    for (var j = 0; j < 13; j++) {
      row[j] = document.createElement("tr");
      cell[j * 2] = document.createElement('td');
      cell[j * 2 + 1] = document.createElement('td');
      cell[j * 2].classList.add("type1");
      cell[j * 2 + 1].classList.add("type1");
    }

    switch (i) {
      case 0:
        cell[0].innerHTML = "<font size=8 color=#A246FE>●</font><br> ________________________";
        break;
      case 1:
        cell[0].innerHTML = "<font size=8 color=#2BE1BD>●</font><br> ________________________";
        break;
      case 2:
        cell[0].innerHTML = "<font size=8 color=#3882E8>●</font><br> ________________________";
        break;
      case 3:
        cell[0].innerHTML = "<font size=8 color=#F9FF33>●</font><br> ________________________";
        break;
      case 4:
        cell[0].innerHTML = "<font size=8 color=#FFA233>●</font><br> ________________________";
        break;
      case 5:
        cell[0].innerHTML = "<font size=8 color=#FF3390>●</font><br> ________________________";
        break;
    }
    cell[0].classList.add("type6");
    cell[0].setAttribute("colspan", "2");
    row[0].appendChild(cell[0]);


    cell[2].innerHTML = "LED";
    cell[2].setAttribute("colspan", "2");
    row[1].appendChild(cell[2]);

    sel_led = create_sel(i, led_actions, 'led', 'block');
    cell[4].appendChild(sel_led);
    color_sel = create_color_sel(i);
    cell[5].appendChild(color_sel);
    cell[5].className = "color_sel";
    row[2].appendChild(cell[4]);
    row[2].appendChild(cell[5]);

    cell[6].innerHTML = "<font size=5>" + (i + 1).toString() + "</font>";
    cell[6].classList.add("main_cell_text");
    cell[6].setAttribute("colspan", "2");
    row[3].appendChild(cell[6]);


    cell[8].innerHTML = "Short";
    // cell[8].setAttribute("colspan", "2");
    cell[8].classList.add("type5");
    cell[9].classList.add("type5");
    row[4].appendChild(cell[8]);
    row[4].appendChild(cell[9]);

    sel_button_short = create_sel(i, button_actions, 'button_short', 'block');
    cell[10].appendChild(sel_button_short);

    snap_checkbox = create_snap(i);
    cell[11].appendChild(snap_checkbox[0]);
    cell[11].appendChild(snap_checkbox[1]);
    row[5].appendChild(cell[10]);
    row[5].appendChild(cell[11]);

    cc_table_short = custom_MIDI_constructor(i, "button_short", "button");
    cell[12].appendChild(cc_table_short);
    cc_table_short.style.visibility = "hidden";
    row[6].appendChild(cell[12]);

    toggle_short_checkbox = create_toggle(i, "button_short");
    cell[13].appendChild(toggle_short_checkbox);
    toggle_short_checkbox.style.visibility = "hidden";
    row[6].appendChild(cell[13]);

    
    var button_long_label = document.createElement('label');
    button_long_label.appendChild(document.createTextNode('Long'));
    button_long_label.id = "button_long_label"+i;
    cell[14].appendChild(button_long_label);
    // cell[14].setAttribute("colspan", "2");
    sel_button_long = create_sel(i, button_actions, 'button_long', 'block');
    cell[16].appendChild(sel_button_long);
    // cell[16].setAttribute("colspan", "2");
    row[7].appendChild(cell[14]);
    row[8].appendChild(cell[16]);

    cc_table_long = custom_MIDI_constructor(i, "button_long", "button");
    cell[18].appendChild(cc_table_long);
    cell[18].style.visibility = "hidden";
    row[9].appendChild(cell[18]);

    toggle_short_checkbox = create_toggle(i, "button_long");
    cell[19].appendChild(toggle_short_checkbox);
    toggle_short_checkbox.style.visibility = "hidden";
    row[9].appendChild(cell[19]);


    var button_double_label = document.createElement('label');
    button_double_label.appendChild(document.createTextNode('Double'));
    button_double_label.id = "button_double_label"+i;
    cell[20].appendChild(button_double_label);
    sel_button_double = create_sel(i, button_actions, 'button_double', 'block');
    cell[22].appendChild(sel_button_double);
    row[10].appendChild(cell[20]);
    row[11].appendChild(cell[22]);

    cc_table_double = custom_MIDI_constructor(i, "button_double", "button");
    cell[24].appendChild(cc_table_double);
    cell[24].style.visibility = "hidden";
    row[12].appendChild(cell[24]);

    toggle_short_checkbox = create_toggle(i, "button_double");
    cell[25].appendChild(toggle_short_checkbox);
    toggle_short_checkbox.style.visibility = "hidden";
    row[12].appendChild(cell[25]);


    for (var i = 0; i < 13; i++) {
      main_cell.appendChild(row[i]);
    }
  }

  function create_snap(i) {
    var snap_label = document.createElement('label');
    var snap = document.createElement('input');
    snap.type = "checkbox";
    snap.id = "snap_checkbox" + i;
    snap.className = "snap"
    snap_label.htmlFor = snap.id
    snap.addEventListener('change', (event) => {
      if (event.target.checked) on_snap_changed(i, true);
      else on_snap_changed(i, false);
    })
    return [snap, snap_label];
  }

  function create_toggle(i, id) {
    var toggle_div = document.createElement('div');
    toggle_div.id = "toggle_" + id + i;
    var toggle_label = document.createElement('label');
    var toggle = document.createElement('input');
    toggle.type = "checkbox";
    toggle.id = id + "_toggle_checkbox" + i;
    toggle.className = "toggle"
    toggle_label.htmlFor = toggle.id
    toggle.addEventListener('change', (event) => {
      if (event.target.checked) on_toggle_changed(i, 1, id);
      else on_toggle_changed(i, 0, id);
    })
    toggle_div.appendChild(toggle);
    toggle_div.appendChild(toggle_label);
    return toggle_div;
  }

  function create_encoder_table(div) {

  var divClass = document.getElementsByClassName(div);
  var mainTable = document.createElement('table');
  mainTable.className = "type_encoder";
  var mainTable_row0 = mainTable.insertRow(0);

  for (var i = 0; i < NUM_ENCODERS; i++) {
    let main_cell = document.createElement('td');
    mainTable_row0.className = "columns-container";
    create_encoder_cell_content(main_cell, i);
    mainTable_row0.appendChild(main_cell);
    main_cell.className = "main_cell";
  }

  divClass[0].appendChild(mainTable);
  }

  function create_encoder_cell_content(main_cell, i) {
  let main_cell_table = document.createElement('table');
  let row = [];
  let cell = [];
  for (var j = 0; j < 11; j++) {
    row[j] = document.createElement("tr");
    cell[j] = document.createElement('td');
    cell[j].classList.add("type1");
  }

  cell[0].innerHTML = "Encoder " + (i + 1).toString() + "<br> ________________________<br>Turn</font>";
  cell[0].setAttribute("colspan", "2");
  row[0].appendChild(cell[0]);

  sel_encoder = create_sel(i, encoder_actions, 'encoder', 'block');
  cell[1].appendChild(sel_encoder);
  row[1].appendChild(cell[1]);
  cc_table_encoder = custom_MIDI_constructor(i, "encoder", "slider");
  cell[2].appendChild(cc_table_encoder);
  cell[2].style.visibility = "hidden";
  row[2].appendChild(cell[2]);

  cell[3].innerHTML = "Hold and Turn";
  row[3].appendChild(cell[3]);

  sel_encoder_hold = create_sel(i, encoder_actions, 'encoder_hold', 'block');
  cell[4].appendChild(sel_encoder_hold);
  row[4].appendChild(cell[4]);
  cc_table_encoder_hold = custom_MIDI_constructor(i, "encoder_hold", "slider");
  cell[5].appendChild(cc_table_encoder_hold);
  cell[5].style.visibility = "hidden";
  row[5].appendChild(cell[5]);

  cell[6].innerHTML = "Short Press";
  cell[6].classList.add("type5");
  row[6].appendChild(cell[6]);

  sel_button_short = create_sel(i, button_actions, 'encoder_short', 'block');
  cell[7].appendChild(sel_button_short);
  row[7].appendChild(cell[7]);

  cc_table_encoder_short = custom_MIDI_constructor(i, "encoder_short", "button");
  cell[8].appendChild(cc_table_encoder_short);
  cc_table_encoder_short.style.visibility = "hidden";
  row[8].appendChild(cell[8]);

  toggle_encoder_short_checkbox = create_toggle(i, "encoder_short");
      cell[9].appendChild(toggle_encoder_short_checkbox);
      toggle_encoder_short_checkbox.style.visibility = "hidden";
      // row[8].appendChild(cell[9]);

  for (var i = 0; i < 10; i++) {
    main_cell.appendChild(row[i]);
  }
  }

  function create_slider_table(div) {
  var divClass = document.getElementsByClassName(div);
  var mainTable = document.createElement('table');
  mainTable.className = "type_slider";
  var mainTable_row0 = mainTable.insertRow(0);

  for (var i = 0; i < NUM_SLIDERS; i++) {
    let main_cell = document.createElement('td');
    mainTable_row0.className = "columns-container";
    create_slider_cell_content(main_cell, i);
    mainTable_row0.appendChild(main_cell);
    main_cell.className = "main_cell";
  }
  divClass[0].appendChild(mainTable);
  }

  function create_slider_cell_content(main_cell, i) {
  let main_cell_table = document.createElement('table');
  let row = [];
  let cell = [];
  for (var j = 0; j < 5; j++) {
    row[j] = document.createElement("tr");
    cell[j] = document.createElement('td');
    row[j].appendChild(cell[j]);
    cell[j].classList.add("type1");
  }

  cell[0].innerHTML = "Expression Pedal " + (i + 1).toString() + "</font><br>____________________";
  sel_slider = create_sel(i, slider_actions, 'slider', 'block');
  cell[1].appendChild(sel_slider);

  cc_table_slider = custom_MIDI_constructor(i, "slider", "slider");
  cell[2].appendChild(cc_table_slider);
  cell[2].style.visibility = "hidden";
  row[2].appendChild(cell[2]);

  cell[3].innerHTML = "____________________<br> Calibrate";
  calibrate_min_button = document.createElement("input");
  calibrate_min_button.type = "button"
  calibrate_min_button.value = "Min."
  calibrate_max_button = document.createElement("input");
  calibrate_max_button.type = "button"
  calibrate_max_button.value = "Max."
  cell[4].appendChild(calibrate_min_button);
  cell[4].appendChild(calibrate_max_button);
  calibrate_min_button.onclick = function() {
    console.log("click ", i)
    sendSysex(27, i, i, 0, 1, 1);
  }
  calibrate_max_button.onclick = function() {
    console.log("click ", i)
    sendSysex(27, i, i, 1, 1, 1);
  }

  for (var k = 0; k < 5; k++) {
    main_cell.appendChild(row[k]);
  }
  }

  function create_external_MIDI_table(div) {
      var divClass = document.getElementsByClassName(div);
      var external_MIDI_table = document.createElement('table');
      external_MIDI_table.className = "external_midi_table";
      var external_MIDI_table_row0 = external_MIDI_table.insertRow(0);
      var external_MIDI_table_row1 = external_MIDI_table.insertRow(1);
      var external_MIDI_table_row2 = external_MIDI_table.insertRow(2);
      var empty_cell = document.createElement('td');
      var empty_cell2 = document.createElement('td');
      var empty_cell3 = document.createElement('td');
      external_MIDI_table_row2.appendChild(empty_cell);
      external_MIDI_table_row2.appendChild(empty_cell2);
      external_MIDI_table_row2.appendChild(empty_cell3);
      empty_cell.style.backgroundColor = "#11ffee00";
      empty_cell.style.border = "0px";
      empty_cell2.style.backgroundColor = "#11ffee00";
      empty_cell2.style.border = "0px";
      empty_cell3.style.backgroundColor = "#11ffee00";
      empty_cell3.style.border = "0px";

      for (var i = 0; i < 10; i++) {

        var external_MIDI_CC_table = document.createElement('table');
        var external_MIDI_CC_table_row0 = external_MIDI_CC_table.insertRow(0);
        var external_MIDI_CC_table_row1 = external_MIDI_CC_table.insertRow(1);
        var external_MIDI_cell = [document.createElement('td'), document.createElement('td')];

        var external_MIDI_label = document.createElement('label');
        if (i < 8) external_MIDI_label.appendChild(document.createTextNode("Button " + (i + 1)));
        else external_MIDI_label.appendChild(document.createTextNode("Knob/Slider " + (i - 7)));
        external_MIDI_cell[0].appendChild(external_MIDI_label);

        // creates the content of each cell of the main table
        var MIDI_cell = document.createElement('td');
        var MIDI_cell_table = document.createElement('table');

        if (i < 8) cc_tab = custom_MIDI_constructor(i, "external_MIDI", "button");
        else cc_tab = custom_MIDI_constructor(i, "external_MIDI", "slider");
        MIDI_cell_table = cc_tab;
        external_MIDI_cell[0].appendChild(MIDI_cell_table);
        external_MIDI_cell[0].appendChild(MIDI_cell);
        if (i < 8) external_MIDI_table_row0.appendChild(external_MIDI_cell[0]);
        else external_MIDI_table_row2.appendChild(external_MIDI_cell[0]);
      }
      divClass[0].appendChild(external_MIDI_table);
    }

  function custom_MIDI_constructor(i, id, type) {
      var cc_table = document.createElement('table');
      var cc_table_row0 = cc_table.insertRow(0);
      var cell00 = cc_table_row0.insertCell(0);
      var cell01 = cc_table_row0.insertCell(1);
      var cell02 = cc_table_row0.insertCell(2);
      var cell03 = cc_table_row0.insertCell(3);

      cc_table.id = "custom_MIDI_" + id + i;
      type_sel = create_cc_sel(i, type_values, 'type_select', id);
      // if (id != "external_MIDI") cell00.appendChild(type_sel);
      if (type != "slider") cell00.appendChild(type_sel);
      cc_sel = create_cc_sel(i, cc_values, 'cc_select', id);
      cell01.appendChild(cc_sel);
      if (id == "external_MIDI") ch_sel = create_cc_sel(i, ch_values, 'ch_select', id);
      else ch_sel = create_cc_sel(i, ch_values_custom, 'ch_select', id);
      cell02.appendChild(ch_sel);
      var cc_label = document.createElement('label', id);
      cc_label.innerHTML = " ";
      cell03.appendChild(cc_label);
      // return ([cc_table, cc_sel, ch_sel, type_sel]);
      return cc_table;
    }

  function create_cc_sel(num, options_dict, data_type, id) {
    var select = document.createElement('select')
    var options_str = "";
    if (!Array.isArray(options_dict)) var options_list = Object.keys(options_dict);
    else options_list = options_dict;
    options_list.forEach(function (option) { options_str += '<option value=' + options_list.indexOf(option) + '>' + option + '</option>'; });
    select.innerHTML = options_str;
    select.num = num;
    select.id = id + "_" + data_type + num;
    select.onchange = function () { on_custom_MIDI_change(select.num, select.value, id, data_type); };
    return select
  }