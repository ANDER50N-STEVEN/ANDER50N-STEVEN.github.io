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


//This was just easier to implement in the actual JavaScript rather than the code block
//Do I need to adjust the API ID for github?

function loadWeather(city) {
  const xhttps = new XMLHttpRequest();
  const uri = encodeURI(
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=468d285f51f1746352526f9b57d363d2&units=imperial"
  );

  xhttps.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const container = document.getElementById("execute");
      const response = JSON.parse(this.responseText);
      var buffer = "";
      container.style.visibility = "visible";
      buffer += "City: " + response.name + ", " + response.sys.country + "\n";
      buffer += "Temperature: " + response.main.temp + " F\n";
      buffer += "Humidity: " + response.main.humidity + " %\n";

      container.innerHTML = buffer;
    }
  };
  xhttps.open("GET", uri, true);
  xhttps.send();
}

function getWeather(city){
  var temp = '';
  var x =document.getElementsByName("temp");
  var y;
  const xhttps = new XMLHttpRequest();
  for(var i = 0; i < x.length; i++){
    if(x[i].checked){
      y = x[i].value;
    }
  if(y == "far"){
    temp = "&units=imperial";
  }
}
  const uri = encodeURI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=468d285f51f1746352526f9b57d363d2" + temp);

  xhttps.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const container = document.getElementById("objoutput");
      const response = JSON.parse(this.responseText);
      var buffer = "";
      container.style.visibility = "visible";
      buffer += "City: " + response.name + ", " + response.sys.country + "\n";
      buffer += "Temperature: " + response.main.temp;
      if(y == "far")
        buffer += "F\n";
      else
        buffer += "C\n";
      if(document.getElementById("description").checked == true)
      buffer += "Description: " + response.weather.description + "\n";
      if(document.getElementById("humidity").checked == true)
      buffer += "Humidity: " + response.main.humidity + "%\n";
      if(document.getElementById("wind").checked == true){
      buffer += "Wind speed: " + response.wind.speed;
        if(y == "far")
        buffer += "mph\n";
      else
        buffer += "kph\n";
}


      container.innerHTML = buffer;
    }
  };
  xhttps.open("GET", uri, true);
  xhttps.send();
}
