window.onload = function() {
  const buttons = document.getElementsByClassName("button");

  for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
      const ev = e || window.event;
      const target = ev.target || ev.srcElement;
      executeCode(target);
    };
  }
};

function executeCode(topic) {
  const id = topic.getAttribute("id");

  const code = document.getElementById(`${id}-code`);
  const console = document.getElementById(`${id}-execute`);

  console.innerHTML = eval(code.innerText);
  console.style.visibility = "visible";
}


function createObj(){
  function Character(name, classs, level, race, age) {
  this.name = name;
  this.classs = classs;
  this.level = level;
  this.race = race;
  this.age = age;
}
var name = document.getElementById("name").value;
var classs = document.getElementById("classs").value;
var level = document.getElementById("level").value;
var race = document.getElementById("race").value;
var age =document.getElementById("age").value;
var player = new Character(name, classs, level, race, age);
document.getElementById("objoutput").innerHTML = JSON.stringify(player);
}