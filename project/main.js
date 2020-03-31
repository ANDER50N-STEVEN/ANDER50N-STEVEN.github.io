var map;
var set = null; 
var active = false;
function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'terrain'
    });

    var script = document.createElement('script');

    script.src = 'apartments.js';
    document.getElementsByTagName('head')[0].appendChild(script);

}


    // Creating the XMLHttpRequest object
    var output = document.getElementById('average');
    var request = new XMLHttpRequest();
    var url = "./csvjson.json";
    var city = "Portland";

    // Instantiating the request object
    request.open("GET", url, true);

    // Defining event listener for readystatechange event
    request.readystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {
            
            var average = JSON.parse(request.responseText);
            var current = average.filter(obj => {
              return obj.RegionName === city
            })
            var response =  "The Average Cost for Apartments to live in " + city + " is: $" + current.Zri;
            output.innerHTML = response;
        }
        console.log(response);
    };

    // Sending the request to the server
    request.send();


      // Loop through the results array and place a marker for each
      // set of coordinates.

function eqfeed_callback(results) {
  var bounds = new google.maps.LatLngBounds();
  var name;
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

    if(rental.name === ""){
      name = rental.address.num;
    }
    else{
      name = rental.name;
    }

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
map.fitBounds(bounds);
console.log(bounds);
if(bounds.Za[0] == bounds.Za[1])
 map.setZoom(map.getZoom());
}

    // Filter depending on user input.
      
function filter(c, filter, isButton) {
  if(isButton){
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
    //  Calls filter functions
set = JSON.parse(localStorage.getItem('data'));
localStorage.setItem(filter, c);
  switch(filter){
    case "bed":
      filterBed(c);
      if(set != null)
        storedFilter();
      break;
    case "bath":
      filterBath(c);
      if(set != null)
        storedFilter();
      break;
    case "minPrice":
      filterPrice(c, false);
      if(set != null)
        storedFilter();
      break;
    case "maxPrice":
      filterPrice(c, true);
      if(set != null)
        storedFilter();
      break;
    case "feet":
      filterFeet(c);
      break;
    default:
      break;
  }

  // initMap();
  if(isEmpty(set)){
    window.alert("We could not find any with this criteria search again");
    set = null;
    if(active){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        active = false;
      }
      localStorage.clear();
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
    localStorage.removeItem('rooms');
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
//console.log(JSON.parse(localStorage.getItem('data')));
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

console.log(set);
  
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

