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
function fade(){
  const transition = document.getElementById("transition-execute");
  transition.style.opacity = 0;
  transition.style.transition = "2s";
}
function reset(){
  const transition = document.getElementById("transition-execute");
  transition.style.opacity = "initial";
}
function stop(){
  const animation = document.getElementById("animation-execute");
  animation.style.animationPlayState = "paused";
}
function start(){
  const animation = document.getElementById("animation-execute");
  animation.style.animationPlayState = "initial";
}