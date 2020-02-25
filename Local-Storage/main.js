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


  function Name() {
              var fullName = {};
              fullName['first'] = document.getElementById("first").value;
              fullName['last'] = document.getElementById("last").value;
              localStorage.setItem("fullName", JSON.stringify(fullName));
              var obj = JSON.parse(localStorage.fullName);
              var output = "Welcome " + obj['first'] + " " + obj['last'] + "!";
              document.getElementById("showName").innerHTML = output;
          }