
  var layout_actions = {
    "Page 1": 0,
    "Page 2": 1,
    "Page 3": 2
  };
  var display_actions = {
    "☲  Scene Name": 0,
    "⌈  Arrangement Marker": 4,
    "♫  Setlist Song": 5,
    "🎹 Track Name": 1,
    "Ⓛ  Looper Number": 2,
    "⌸  Variation Number / Device": 3,
  };
  var button_actions = {
    "Off": 0,
    "--- Global ---": 0,
    "■/▶ Start/Stop": 1,
    "❚❚ Pause": 100,
    "●○ Metronome": 2,
    "⤶ Undo": 4,
    "⤷ Redo": 40,
    "▢ Capture": 5,
    "⊕ BPM +1": 28,
    "⊖ BPM -1": 29,
    "ℚ MIDI Recording Quantization": 104,
    "← Re-enable Automation": 41,
    "⇶ Back To Arrangement": 42,
    "⮂ Arr./Session View": 75,
    "⮂ Clip/Device View": 76,
    "--- Arrangement ---": 0,
    "↞ Jump to 1.1.1": 74,
    "⇉ Restart From Last Pos.": 103,
    "● Arrangement Rec": 6,
    "⥁ Arrangement Loop": 7,
    "⇤ Go to Prev Marker": 9,
    "⇥ Go to Next Marker": 8,
    "⤓ Add/Delete Marker": 10,
    "⥀ Loop to Next Marker": 102,
    "⌉ Punch In": 38,
    "⌈ Punch Out": 39,
    "--- Session ---": 0,
    "○ Session Rec": 11,
    "▶ Launch Scene": 13,
    "⬆ Sel Prev Scene": 14,
    "⬇ Sel Next Scene": 15,
    "⇈+4 Jump 4 Scenes Up": 105,
    "⇊-4 Jump 4 Scenes Down": 106,
    "❶ Fixed Length Rec 1 Bars": 107,
    "❷ Fixed Length Rec 2 Bars": 108,
    "❹ Fixed Length Rec 4 Bars": 109,
    "❽ Fixed Length Rec 8 Bars": 110,
    "⥴ Jump to Playing Scene": 16,
    "⥅ Insert Scene": 17,
    "⇴ Capture and Insert Scene": 43,
    "⧈ Stop All Clips": 3,
    // "➟ Disable Follow Actions": 12,
    "--- Setlist ---": 0,
    "⏮️  Prev Song": 33,
    "⏭️  Next Song": 34,
    "▶️  Launch Song": 44,
    "▶️ Ⓠ Launch Song No Q": 45,
    // "▷ Refresh Setlist": 46,
    "--- Tracks ---": 0,
    "← Sel Prev Track": 18,
    "→ Sel Next Track": 19,
    "▷ Launch Clip": 22,
    "↳ Find Empty Slot": 23,
    "⌧ Mute": 24,
    "S Solo": 25,
    "⌻ Arm": 26,
    "■ Stop": 27,
    "U Fold/Unfold Track": 55,
    "☆ Add Audio Track": 20,
    "✬ Add MIDI Track": 21,
    "--- Looper ---": 0,
    "⧀ Prev Looper": 48,
    "⧁ Next Looper": 49,
    "① MIDI Map 1 (Big Button)": 128,
    "② MIDI Map 2 (Clear)": 129,
    "③ MIDI Map 3": 130,
    "④ MIDI Map 4": 131,
    "⑤ MIDI Map 5": 132,
    "⑥ MIDI Map 6": 133,
    // "▣ Stop Looper": 35,
    "⌻ Arm Track": 30,
    "⌧ Mute Track": 31,
    "⌸ Show Looper": 32,
    "⊕ Add Looper": 47,
    "∅ Clear All": 36,
    "--- Variations ---": 0,
    "⍇ Prev Device": 65,
    "⍈ Next Device": 66,
    "⌃ Prev Variation": 67,
    "⌵ Next Variation": 68,
    "▹ Launch Variation": 69,
    "◦ Store Variation": 70,
    "↩︎ Recall Last Used": 72,
    "⌁ Randomize Macros": 71,
    "--- Pages ---": 0,
    "↩ Prev Page": 56,
    "↪ Next Page": 57,
    "Page 1⇆2": 50,
    "Page 1⇆3": 51,
    "--- Custom ---": 0,
    "Custom MIDI": 122
  };
  var led_actions = {
    "Custom Color": 0,
    "--- Global ---": 0,
    "■/▶ Start/Stop": 1,
    "❚❚ Pause": 100,
    "●○ Metronome": 2,
    "← Re-enable Automation": 41,
    "▢ Capture": 5,
    "ℚ MIDI Recording Quantization": 104,
    "--- Arrangement ---": 0,
    "● Arrangement Rec": 6,
    "⥁ Arrangement Loop": 7,
    "⌉ Punch In": 38,
    "⌈ Punch Out": 39,
    "⇶ Back To Arrangement": 42,
    "--- Session ---": 0,
    "○ Session Rec": 11,
    "▶ Selected Scene Color": 13,
    "⬆ Prev Scene Color": 14,
    "⬇ Next Scene Color": 15,
    // "➟ Disable Follow Actions": 12,
    "--- Setlist ---": 0,
    "⏮️  Prev Song Color": 33,
    "⏭️  Next Song Color": 34,
    "▶️  Current Song Color": 44,
    "--- Tracks ---": 0,
    "✽ Selected Track Color": 54,
    "← Prev Track Color": 18,
    "→ Next Track Color": 19,
    "▷ Clip Color": 22,
    "⌧ Mute": 24,
    "S Solo": 25,
    "⌻ Arm": 26,
    "■ Stop": 27,
    "--- Looper ---": 0,
    "⧀ Prev Looper Track Color": 48,
    "⧁ Next Looper Track Color": 49,
    "◈ State Selected Looper ": 53,
    "⌻ Track Arm": 30,
    "⌧ Track Mute": 31,
    "◈ State (LOOPER1)": 77,
    "◈ State (LOOPER2)": 78,
    "◈ State (LOOPER3)": 79,
    "◈ State (LOOPER4)": 80,
    "◈ State (LOOPER5)": 81,
    "◈ State (LOOPER6)": 82,
  };
  var slider_actions = {
    "Off": 0,
    "--- Global ---": 0,
    "⟳ Last Selected Parameter": 73,
    "% Global Groove Amount": 37,
    "🎚 Master Volume": 89,
    "🎧 Cue Volume": 90,
    "--- Selected Track ---": 0,
    "⟊ Volume": 91,
    "◠ Pan": 96,
    "A Send A": 59,
    "B Send B": 60,
    "--- Selected Device ---": 0,
    "① Parameter 1": 61,
    "② Parameter 2": 62,
    "③ Parameter 3": 63,
    "④ Parameter 4": 64,
    "--- Custom ---": 0,
    "Custom MIDI": 122
  };
  var encoder_actions = {
    "Off": 0,
    "--- Global ---": 0,
    "⟳ Last Selected Parameter": 73,
    "% Global Groove Amount": 37,
    "🎚 Master Volume": 89,
    "🎧 Cue Volume": 90,
    "± BPM +/- 1": 87,
    "↔ Track Select": 101,
    "--- Arrangement ---": 0,
    "≪≫ Skip Fwd/Bckwd": 83,
    "⤞ Loop Position": 84,
    "⩉ Loop Length": 85,
    "↹ Jump to Next/Prev Marker": 88,
    "↔ Horizontal Zoom": 99,
    "↔ Horizontal Scroll": 101,
    "↕ Vertical Zoom": 0,
    "--- Session ---": 0,
    "↕ Scene Select": 86,
    "--- Selected Track ---": 0,
    "⟊ Volume": 91,
    "◠ Pan": 96,
    "A Send A": 59,
    "B Send B": 60,
    "--- Selected Device ---": 0,
    "① Parameter 1": 61,
    "② Parameter 2": 62,
    "③ Parameter 3": 63,
    "④ Parameter 4": 64,
    // "❶ Device 1 Param 1": 92,
    // "❷ Device 1 Param 2": 93,
    // "❸ Device 1 Param 3": 94,
    // "❹ Device 1 Param 4": 95,
    "--- Custom ---": 0,
    "Custom MIDI": 122
  };
  var led_translator = {
    "Off": "Off",
    "▶ Launch Scene": "▶ Selected Scene Color",
    "⬆ Sel Prev Scene": "⬆ Prev Scene Color",
    "⬇ Sel Next Scene": "⬇ Next Scene Color",
    "■/▶ Start/Stop": "■/▶ Start/Stop",
    "●○ Metronome": "●○ Metronome",
    "■ Stop All Clips": 0,
    "● Arrangement Rec": "● Arrangement Rec",
    "⥁ Arrangement Loop": "⥁ Arrangement Loop",
    "⇥ Go to Next Marker": 0,
    "⇤ Go to Prev Marker": 0,
    "⤓ Add/Delete Marker": 0,
    "○ Session Rec": "○ Session Rec",
    "➟ Disable Follow Actions": 0,
    "▷ Launch Clip": "▷ Clip Color",
    "↳ Find Empty Slot": 0,
    "⌧ Mute": "⌧ Mute",
    "S Solo": "S Solo",
    "⌻ Arm": "⌻ Arm",
    "← Sel Prev Track": "← Prev Track Color",
    "→ Sel Next Track": "→ Next Track Color",
    "+ Add Looper": 0,
    "⧀ Prev Looper": "⧀ Prev Looper Track Color",
    "⧁ Next Looper": "⧁ Next Looper Track Color",
    "⇆ Page 1/2": "⇆ Page Color",
    "⇆ Page 1/3": "⇆ Page Color",
    "⌻ Arm Looper Track": "⌻  Looper Track Arm",
    "⌧ Mute Looper Track": "⌧ Looper Track Mute",
    "① MIDI Map 1 (Big Button)": "◈ Looper State",
  };


  var NUM_BUTTONS = 6;
  var NUM_LEDS = 6;
  var NUM_SLIDERS = 2;
  var NUM_ENCODERS = 2;
  var NUM_LAYOUTS = 3;
  var NUM_DISPLAY = 1;
  var min_ver = 0;

  var type = {
   "button_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_long" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_double" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "encoder_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "encoder" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "encoder_hold" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "slider" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_SLIDERS)),
    "led" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_LEDS)),
    "display" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_DISPLAY)),
    "linked_to" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_DISPLAY)),
    "external_MIDI" : [...Array(1)].map(e => Array(10))
  }

  var control = {
   "button_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_long" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_double" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "encoder_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "encoder" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "encoder_hold" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "slider" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_SLIDERS)),
    "led" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_LEDS)),
    "display" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_DISPLAY)),
    "linked_to" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_DISPLAY)),
    "external_MIDI" : [...Array(1)].map(e => Array(10))
  }

  var channel = {
   "button_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_long" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_double" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "encoder_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "encoder" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "encoder_hold" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
   "slider" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_SLIDERS)),
    "led" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_LEDS)),
    "display" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_DISPLAY)),
    "linked_to" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_DISPLAY)),
    "external_MIDI" : [...Array(1)].map(e => Array(10))
  }

  var toggle = {
   "button_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_long" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "button_double" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS)),
   "encoder_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_ENCODERS)),
  };

  var options = {
    "metro" : 0,
    "session_box" : 0
  }

  var snap = {
   "button_short" : [...Array(NUM_LAYOUTS)].map(e => Array(NUM_BUTTONS))
  };

  id_to_sysex = {
   "button_short" : 10,
   "button_long" : 12,
   "button_double" : 19,
   "encoder_short" : 10,
   "encoder" : 8,
   "encoder_hold" : 9,
   "slider" : 17,
    "led" : 14,
    "snap" : 11,
    "toggle": 13,
    "display": 18,
    "external_MIDI": 21
  };

 var actions = {
   "button_short" : button_actions,
   "button_long" : button_actions,
   "button_double" : button_actions,
   "encoder_short" : button_actions,
   "encoder" : encoder_actions,
   "encoder_hold" : encoder_actions,
   "slider" : slider_actions,
    "led" : led_actions,
    "display": display_actions
  }

  var control_type = {
   "button_short" : "button",
   "button_long" : "button",
   "button_double" : "button",
   "encoder_short" : "button",
   "encoder" : "slider",
   "encoder_hold" : "slider",
   "slider" : "slider",
    "led" : "slider",
    "display": "display",
  }
  
  sysex_to_id = {
          10 : "button_short",
          12 : "button_long",
          19 : "button_double",
          8 : "encoder",
          18: "display",
          9: "encoder_hold",
          17 : "slider",
          14 : "led",
          11 : "snap",
          13 : "toggle",
          21 : "external_MIDI",
          30 : "options",
          24 : "linked_to"
        }

  toggle_to_id = {
      0 : "button_short",
      1 : "button_long",
      2 : "button_double"
    }
    id_to_toggle = {
      "button_short" : 0,
      "button_long" : 1,
      "button_double" : 2
    }

  options_to_id = {
    0 : "metro",
    1 : "session_box"
  }