var map;
var set = null; 

//  Create Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'terrain'
    });

    var script = document.createElement('script');

    script.src = 'apartments.js';
    document.getElementsByTagName('head')[0].appendChild(script);

}

      // Loop through the results array and place a marker for each
      // set of coordinates.

function eqfeed_callback(results) {
  var bounds = new google.maps.LatLngBounds();
  var name;
      //  clear sidebar content
  while (document.getElementById("nav").firstChild)
    document.getElementById("nav").removeChild(document.getElementById("nav").firstChild);  

  if(set === null){
    set = results.apartment;
    localStorage.setItem('data', JSON.stringify(set));
  }

  for (var i = 0; i < set.length; i++) {
    var rental = set[i];
    var coords = rental.location;
    var latLng = new google.maps.LatLng(coords.lat,coords.lon);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    bounds.extend(marker.position);

      // if no title for property
    if(rental.name === "")
      name = rental.address.num;
    else
      name = rental.name;

        //  Info window Content
    var content = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">'+ name + '</h1>'+
      '<div id="bodyContent">'+
      '<div><img src="' + rental.img[0] + '" width="100px" height="70px">' +
      '<div> Beds: ' + print(rental.style.bed, ' ') + '</div>'+
      '<div> Bathrooms: ' + print(rental.style.bath, ' ') + '</div>' +
      '<div> Price:' + print(rental.price, " $") + '<div>' +
      '</div>'    

    var infowindow = new google.maps.InfoWindow()

    //  Sidebar data and creation 
    var listItem = document.createElement("LI");
    var linebreak = document.createElement("br");
    var image = document.createElement("IMG");
    var header = document.createElement("H4");
    var cost = document.createElement("P");
    var rooms = document.createElement("P");
    var hr = document.createElement("HR");

    image.src = rental.img[0];
    image.title = name;
    image.id = "displayImg";

    cost.id = "disp";
    rooms.id = "disp";

    listItem.id = "info";
    listItem.appendChild(image);
    header.textContent = name;
    listItem.appendChild(header);

    cost.textContent = "Cost: $" + Range(rental.price);
    rooms.textContent = "Rooms: " + Range(rental.style.bed);
    listItem.appendChild(cost);
    listItem.appendChild(rooms);

    
    
    
    //  Mousover and out of sidebar element to display info window.  

    document.getElementById("nav").appendChild(listItem);

    listItem.addEventListener('mouseover', (function(marker,content,infowindow){ 
        return function() {
           infowindow.setContent(content);
           infowindow.open(map,marker);
        };
    })(marker, content, infowindow));
    listItem.addEventListener('mouseout', (function(marker,content,infowindow){ 
        return function() {
           infowindow.close();
        };
    })(marker, content, infowindow));

      //  Mousover and out to display and remove info window

    google.maps.event.addListener(marker,'mouseover', (function(marker,content,infowindow){ 
        return function() {
           infowindow.setContent(content);
           infowindow.open(map,marker);
        };
    })(marker,content,infowindow)); 
    google.maps.event.addListener(marker, 'mouseout', (function(marker, content, infowindow){
      return function(){
        infowindow.close();
      };
    })(marker, content, infowindow));  
  }

  //  Resize bounds based on min and max X and Y values.
map.fitBounds(bounds);

}

function displayAve() {
    // Creating the XMLHttpRequest object, data sourced from Zillow.com
    const output = document.getElementById('average');
    const request = new XMLHttpRequest();
    const url = "https://raw.githubusercontent.com/ANDER50N-STEVEN/ANDER50N-STEVEN.github.io/master/project/csvjson.json";
    var city = "Portland";    
    var state = "OR"

    request.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {
            
            var average = JSON.parse(request.responseText);
            var current = average.filter(obj => {
              return (obj.RegionName === city && obj.State === state)
            })
            var response =  "The Average Cost for Apartments in the " + city + " area is: $" + current[0].Zri+ "/month";
            output.innerHTML = response;
        }
    };
  // Instantiating the request object
    request.open("GET", url, true);
    // Sending the request to the server
    request.send();
}
    // Filter depending on user input.
      
function filter(c, filter, isButton) {
  if(isButton){
    active(filter);
    
  }
    //  Calls filter functions
set = JSON.parse(localStorage.getItem('data'));
localStorage.setItem(filter, c);
  switch(filter){
    case "bed":
      if(set != null)
        storedFilter();
      break;
    case "bath":
      if(set != null)
        storedFilter();
      break;
    case "minPrice":
      if(set != null)
        storedFilter();
      break;
    case "maxPrice":
      if(set != null)
        storedFilter();
      break;
      // Future feature.
    case "feet":
        if(set != null)
      filterFeet(c);
      break;
    default:
      break;
  }

  // initMap();
  if(isEmpty(set)){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    // window.alert("We could not find any with this criteria search again");
    set = null;
    active('bed');
    active('bath');

      localStorage.clear();
      // I don't know if there is an easier way to reset defaults of CSS
      document.getElementById('left').value = 0;
      document.getElementById('right').value = 5000;
      document.getElementById('thumbl').style.left = "0%";
      document.getElementById('thumbr').style.left = "100%";
      document.getElementById('il').style.width = "0%";
      document.getElementById('ir').style.width = "100%";
      document.getElementById('range').style.left = "0%";
      document.getElementById('range').style.right = "100%";
      document.getElementById('sleft').style.left = "0%";
      document.getElementById('sright').style.left = "100%";
      document.getElementById('lvalue').innerHTML = 0;
      document.getElementById('rvalue').innerHTML = 5000;

  }
   initMap();

}

function active(filter){
  var header = document.getElementById(filter+"Btn");
    var x = header.getElementsByClassName("btn");

    // To cycle through buttons when clicked, first button pressed only if onload.

    for (var i = 0; i < x.length; i++) {
      x[i].addEventListener("click", function() {
        var current = header.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        localStorage.setItem('previous', current);
        if(!isEmpty(set)){
        this.className += " active";
        }
        else
         x[0].className += " active";
      });

    }
}

function storedFilter(){
  if(localStorage.getItem('bath') != null)
    filterBath(localStorage.getItem('bath'));
  if(localStorage.getItem('bed') != null)
    filterBed(localStorage.getItem('bed'));
  if(localStorage.getItem('minPrice') != null)
    filterPrice(localStorage.getItem('minPrice'), false);
  if(localStorage.getItem('maxPrice') != null)
    filterPrice(localStorage.getItem('maxPrice'), true);
}

function filterBed(beds){
  if (beds == "all"){ 
    localStorage.removeItem('bed');
    set =JSON.parse(localStorage.getItem('data'));
    return;}
  else{
    for (var i = 0; i < set.length; i++) {
      var temp = set[i].style.bed;
      if(!inArray(beds, temp)){
        set.splice(i,1);
        i--;
      }
    }
  }
}

function filterBath(baths){
if (baths == "all"){ 
    localStorage.removeItem('bath');
    set =JSON.parse(localStorage.getItem('data'));
    return;}
  for (var i = 0; i < set.length; i++) {
    var temp = set[i].style.bath;
      if(!inArray(baths, temp)){
        set.splice(i,1);
        i--;
    }
  }
    console.log(set);
}

function filterPrice(price, isMax){ 
  if(isMax){
    for (var i = 0; i < set.length; i++) {
      if(set[i].price[0] > price){
        set.splice(i, 1);
        i--;
      }
    }
  }
  else{
    for (var i = 0; i < set.length; i++) {
      if(set[i].price[set[i].price.length - 1] < price){
        set.splice(i, 1);
        i--;
      }
    }
  }
}

function filterFeet(min, max){
  for (var i = 0; i < set.length; i++) {
    if(set[i].style.feet < min || set[i].style.feet > max){
      set.splice(i,1);
      i--;
    }
  }
}

function print(array, space){
  var string ="";
    for(var j = 0; j < array.length; j++){
      string += space + array[j];
      if(j+1 != array.length)
        string+= ","
    }
    return string;
}

function inArray(needle,haystack)
{
    var count=haystack.length;
    for(var i=0;i<count;i++)
    {
        if(haystack[i]==needle){return true;}
    }
    return false;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function Range(range){
  var min = range[0];
  var max = range[0];
  for(var key in range){
    if(range[key] < min)
      min = range[key];
    if(range[key] > max)
      max = range[key];
  }
  if(min === max)
    return min;
  else
    return min + "-" + max;
}
