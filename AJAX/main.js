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

var DB = null;
var classes = 0;

function getClass(db, classes) {
var output = '';
  if (db === null) {
    alert("Database has not been loaded.  Please try again in a few minutes.");
  }

for(i in db.classList){
  document.getElementById("ajax-execute").innerHTML += db.classList[i].name +
    " " + db.classList[i].id + "<br>";
}
}
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    DB = JSON.parse(this.responseText);
      classes = 0;
      getClass(DB, classes);
      classes++;
    }
  };
  xhttp.open("GET", "classList.json", true);
  xhttp.send();
}

document.getElementById("ajax").addEventListener(
  "click",
  function() {
    loadDoc();
  },
  false
);