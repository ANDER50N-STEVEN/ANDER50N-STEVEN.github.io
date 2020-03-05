// window.onload = function() {
//   const buttons = document.getElementsByClassName("button");

//   for (i = 0; i < buttons.length; i++) {
//     buttons[i].onclick = function(e) {
//       const ev = e || window.event;
//       const target = ev.target || ev.srcElement;
//       executeCode(target);
//     };
//   }
// };

// function executeCode(topic) {
//   const id = topic.getAttribute("id");

//   const code = document.getElementById(`${id}-code`);
//   const console = document.getElementById(`${id}-execute`);

//   console.innerHTML = eval(code.innerText);
//   console.style.visibility = "visible";
// }
