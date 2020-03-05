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


function sibling(){
  const input = document.getElementById("siblings").value;
  const output = document.getElementById("siblings-output");
  var text = "You have " + input + " siblings!!";
  output.innerHTML = text;
}

function solve(){
  var brothers = document.getElementById("brothers").value;
  var sisters = document.getElementById("sisters").value;
  var output='';
  if(brothers > sisters){
    output='You have more brothers';
  }
  else if(brothers < sisters){
    output = 'You have more sisters';
  }
  else{
    output = 'You have the same number of brothers and sisters';
  }
  document.getElementById("solveoutput").innerHTML = output;
}

function grade(){
  var letter = document.getElementById("grade").value.toUpperCase();
  var output = '';
  switch(letter){
    case 'A':
    output = "You got 90% or above!!";
    break;
    case 'B':
    output = "You got between 80% and 90%";
    break;
    case 'C':
    output = "You got between 70% and 80%";
    break;
    case 'D':
    output = "You got between 60% and 70%";
    break;
    case 'F':
    output = "You got less than 60%";
    break;
    default:
    output = "Umm thats not a letter grade";

  }
    document.getElementById("gradeoutput").innerHTML = output;
}

function alpha(){
  var input = document.getElementById("alpha").value;
  var alphabet = 'abcdefghijklmnopqrstuvwxyz'
  var output = '';
  for(var i = 0; i < input; i++){
    if(i > 25){
      output += "I guess we'll start over?" + '<br>';
      i=0;
      input -= 25;
    }
    output += alphabet[i] + '<br>';

  }
  document.getElementById("alphaoutput").innerHTML = output;
}

function count(){
  var input = document.getElementById("count").value;
  var output = '';
  var i = 0;
  while(i <= input){
    output += i + '<br>';
    i++;
  }
  document.getElementById("countoutput").innerHTML = output;
}

function array(){
var values = [],
    form = document.getElementById("formlist"),
    inputs = form.getElementsByTagName("input");

for (var i = 0; i < inputs.length; i++){
    if (inputs[i].type === "checkbox" && inputs[i].checked)
          values.push(inputs[i].value);
}
document.getElementById("arrayoutput").innerHTML = values;
}


function list() {
     var form = document.getElementById("form_id");
    var inputs = form.getElementsByTagName("input");
    var values = [];
    for (var i = 0; i < inputs.length; ++i) {
        if (inputs[i].type === "checkbox" && 
            inputs[i].checked) 
        {
              values.push(inputs[i].value);
        }
    }
    
    var output = document.getElementById("arrayoutput");
    var msg = "Your Shopping List is: <br />";    
    msg += values.length > 0 ? values.toString() : "-";    
    msg += "<br />";
    output.innerHTML = msg;
}

function character(){
  var form = document.getElementById("character");
    var values = [];

    form.querySelectorAll("input").forEach(element => {
       values[element.id] = element.value
    });
    var output = JSON.stringify(values);
    // I do not know why this isn't working...
    document.getElementById("objoutput").innerHTML = output;
}