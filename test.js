
var tones;
$.getJSON("./data/tones.json", function (json) {
  tones = json;
});

function create_key_selector() {
  var div = document.getElementById("key_selector");

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  div.appendChild(selectList);

  console.log(tones);

  //Create and append the options
  for (var i = 0; i < tones.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", tones[i].value);
    option.text = tones[i].name;
    selectList.appendChild(option);
  }
}
