$.getJSON("richter.json", function (json) {
  var body = document.body,
    tbl = document.createElement("table"),
    harmonica = json;

  tbl.style.width = "100px";
  console.log(harmonica);

  var k = 0;
  var row = harmonica.articulations[k].row;
  var hole = harmonica.articulations[k].hole - 1;
  var value = harmonica.articulations[k].value;
  var total_articulations = harmonica.articulations.length;
  for (var i = 0; i < harmonica.rows; i++) {
    var tr = tbl.insertRow();
    for (var j = 0; j < harmonica.holes; j++) {
      var td = tr.insertCell();
      td.style.height = "30px";
      if (i == row && j == hole) {
        td.appendChild(document.createTextNode(value));
        td.style.border = "1px solid black";
        tr.style.width  = "30px";
        k++;
        if (k < total_articulations) {
          row = harmonica.articulations[k].row;
          hole = harmonica.articulations[k].hole - 1;
          var value = harmonica.articulations[k].value;
        }
      }
      body.appendChild(tbl);
    }
  }
});
