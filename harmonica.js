let harmonica, tones;

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
    table = document.createElement("table");

  let tone_shift = document.getElementById("key_selector").value - 1;
  let key =  tones[one_shift].name;
  // Clear existing diagram
  table_title_div.innerHTML = "";
  table_div.innerHTML = "";
  // tone_shift = selector.value;
  table_title.textContent =
    harmonica.tuning + " tuned Harmonica in the key of " + key;
  table_title_div.appendChild(table_title);
  table_div.appendChild(table);
  table.className = "center";

  // k iterates through articualtions array
  let k = 0;
  // set articulations to initial k value
  let row = harmonica.articulations[k].row;
  // hole numbers correspond to real harmonica and start at 1 not 0, hence correction
  let hole = harmonica.articulations[k].hole - 1;
  let value = harmonica.articulations[k].value;
  let total_articulations = harmonica.articulations.length;
  let technique = harmonica.articulations[k].technique;

  // base tone of harmonica
  // var starting_tone = "G";
  // l iterates through 12 music tones read from JSON

  // set initial l according to starting_tone
  // set initial tone
  tone_id = (tone_shift + value + 11) % 12;

  tone = tones[tone_id].name;

  // i iterates table rows
  for (let i = 0; i < harmonica.rows; i++) {
    var tr = table.insertRow();
    // j iterates through columns (holes of harmonica)
    for (let j = 0; j < harmonica.holes; j++) {
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
  for (let i = 0; i < tones.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", tones[i].value);
    option.text = tones[i].name;
    selectList.appendChild(option);
  }
}
