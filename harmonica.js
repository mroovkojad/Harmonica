var data;

try {
   articulaions = JSON.parse(fs.readFileSync('richter.json'));
} catch ( err ) {
   // handle your file not found (or other error) here
}

function tableCreate() {
  var height = 8,
    length = 10,
    body = document.body,
    tbl = document.createElement("table");
  tbl.style.border = 'hidden'

  var k = 0
  for (var i = 0; i < height; i++) {
    var tr = tbl.insertRow();
    for (var j = 0; j < length; j++) {
      var td = tr.insertCell();
      td.style.width = '30px'
      td.style.height = '30px'
      td.style.border = '1px solid black';

      if (i==3 ){
        td.appendChild(document.createTextNode(articulaions[k].value));
        k++
      } else{
        td.style.visibility =  'hidden';
      }

      //    break;
      //} else {
      //    var td = tr.insertCell();
      //    td.appendChild(document.createTextNode('Cell'));
      //    td.style.border = '1px solid black';
      //    if(i == 1 && j == 1){
      //        td.setAttribute('rowSpan', '2');
      //    }
      //}
    }
  }
  body.appendChild(tbl);
}
tableCreate();
