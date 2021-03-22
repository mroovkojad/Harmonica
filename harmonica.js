var harmonica, tones;

$.getJSON("./data/tones.json", function (json) {
  tones = json;
});

$.getJSON("./data/richter.json", function (json) {
  harmonica = json;
});

function draw_diagram() {
  var table_title_div = document.getElementById("diagram_title"),
    table_div = document.getElementById("diagram"),
    table_title = document.createElement("h1"),
    table = document.createElement("table"),
    harmonica_key,
    tone_shift = document.getElementById("key_selector").value;

  // tone_shift = selector.value;
  table_title_div.appendChild(table_title);
  table_div.appendChild(table);
  table.className = "center";
  harmonica_key = tones.filter((obj) => {
    return obj.value === tone_shift;
  }).name;

  table_title.textContent =
    harmonica.tuning + " tuned Harmonica in the key of " + harmonica_key;

  // k iterates through articualtions array
  var k = 0;
  // set articulations to initial k value
  var row = harmonica.articulations[k].row;
  var hole = harmonica.articulations[k].hole - 1;
  var value = harmonica.articulations[k].value;
  var total_articulations = harmonica.articulations.length;
  var technique = harmonica.articulations[k].technique;

  // base tone of harmonica
  // var starting_tone = "G";
  // l iterates through 12 music tones read from JSON
  var tone_shift = 0;
  // set initial l according to starting_tone
  // set initial tone
  tone_id = (tone_shift + value + 11) % 12;
  tone = tones[tone_id].name;
  // i iterates table rows
  for (var i = 0; i < harmonica.rows; i++) {
    var tr = table.insertRow();
    // j iterates through columns (holes of harmonica)
    for (var j = 0; j < harmonica.holes; j++) {
      var td = tr.insertCell();
      // if articulation described in JSON its row and hole matches
      // k iterates through articualtions
      if (i == row && j == hole) {
        if (technique == "hole_number") {
          td.appendChild(document.createTextNode(value));
        } else {
          td.appendChild(document.createTextNode(tone));
        }
        td.className = technique;
        // go to next articulation
        k++;
        // fill in articulation values if not reached end of array
        if (k < total_articulations) {
          row = harmonica.articulations[k].row;
          hole = harmonica.articulations[k].hole - 1;
          technique = harmonica.articulations[k].technique;
          value = harmonica.articulations[k].value;
          tone_id = (tone_shift + value + 11) % 12;
          tone = tones[tone_id].name;
        }
      }
      // hide empty cells
      else {
        td.className = "hidden";
      }
      table_div.appendChild(table);
    }
  }
}

function start() {
  create_key_selector();
  draw_diagram();
}

function create_key_selector() {
  var div = document.getElementById("selector_div");

  div.textContent = "Select harmonica key: ";
  //Create and append select list
  var selectList = document.createElement("select");
  selectList.id = "key_selector";
  selectList.setAttribute("onchange", "draw_diagram()");
  div.appendChild(selectList);

  //Create and append the options
  for (var i = 0; i < tones.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", tones[i].value);
    option.text = tones[i].name;
    selectList.appendChild(option);
  }
}

function test() {
  console.log("Test OK");
}
