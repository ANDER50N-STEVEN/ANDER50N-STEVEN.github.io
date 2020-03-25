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

      // Loop through the results array and place a marker for each
      // set of coordinates.

function eqfeed_callback(results) {
  var bounds = new google.maps.LatLngBounds();
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

    

        //  Info window Content

    var content = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">'+ rental.name + '</h1>'+
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
 map.setZoom(map.getZoom()-2);
}

    // Filter depending on user input.
      
function filter(c, filter) {
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
    //  Calls filter functions
set = JSON.parse(localStorage.getItem('data'));
  switch(filter){
    case "bed":

      localStorage.setItem('rooms', c);
      filterBed(c);
      if(localStorage.getItem('bath') != null && set != null)
        filterBath(localStorage.getItem('bath'));
      break;
    case "bath":
      localStorage.setItem('bath', c);
      filterBath(c);
      if(localStorage.getItem('rooms') != null && set != null)
        filterBed(localStorage.getItem('rooms'));
      break;
    case "price":
      filterPrice(document.getElementById('minPrice').value, document.getElementById('maxPrice').value);
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
   initMap()

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
console.log(JSON.parse(localStorage.getItem('data')));
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

function filterPrice(min, max){ 
  if(min == "")
    min = 0;
  if(max == "")
    max =1000000000;
  for (var i = 0; i < set.length; i++) {
    for(var j = 0; j < set[i].price.length; j++){
    if(set[i].price[j] < min || set[i].price[j] > max){
      set.splice(i,1);
      // i--;
    }}
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

