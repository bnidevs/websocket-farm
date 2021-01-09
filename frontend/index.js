var ws;

window.onload = () => {
  document.getElementById("ipform").addEventListener("submit", function(event){event.preventDefault();cnct();});
  construct_grid();
}

var farm_area = [];
let loc = [];

var construct_grid = () => {
  var dv = document.getElementById("grid");
  for(var t = 0; t < 9; t++){
    const r = document.createElement("div");
    r.className = "grid_row";
    for(var k = 0; k < 9; k++){
      const c = document.createElement("div");
      c.className = "grid_cell";
      c.id = "c" + t + "." + k;
      r.appendChild(c);
    }
    dv.appendChild(r);
  }
  dv.style.display = "none";
}

var cnct = () => {
  ws = new WebSocket('ws://' + document.getElementById("ipfield").value);
  ws.onmessage = sock_msg;
  ws.onopen = sock_open;
  // ws.onclose = function(){document.write("close");}
  // ws.onerror = function(){document.write("error");}
  document.addEventListener("keyup", kp);
}

var sock_msg = (event) => {
  var lines = event.data.split("\n");
  for(var i = 0; i < lines.length; i++){
    farm_area.push([])
    var cl = lines[i].split(",");
    for(var j = 0; j < cl.length; j++){
      farm_area[i].push(parseInt(cl[j]));
      if(farm_area[i][j] == 3){
        loc = [i+1,j];
      }
    }
  }
  console.log(loc);

  update_grid();
}

var sock_open = () => {
  document.getElementById("ipform").style.display = "none";
  document.getElementById("grid").style.display = "flex";
  hello();
}

var hello = () => {
  ws.send("hello farm");
}

var update_grid = () => {
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      document.getElementById("c" + i + "." + j).innerText = farm_area[loc[0] + (i - 4)][loc[1] + (j - 4)];
    }
  }
}

var kp = (e) => {
  if(e.key === "w"){
    loc[0]--;
    update_grid();
  }else if(e.key === "a"){
    loc[1]--;
    update_grid();
  }else if(e.key === "s"){
    loc[0]++;
    update_grid();
  }else if(e.key === "d"){
    loc[1]++;
    update_grid();
  }
}
