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
  if (db === null) {
    alert("Database not initialized. Load it before usage.");
  }

  document.getElementById("ajax-execute").innerHTML =
    db.classList[classes].name +
    " " +
    db.classList[classes].id;

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
  xhttp.open("GET", "classList.txt", true);
  xhttp.send();
}

document.getElementById("ajax").addEventListener(
  "click",
  function() {
    loadDoc();
  },
  false
);