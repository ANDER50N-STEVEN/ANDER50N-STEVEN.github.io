var map;

function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(2.8,-187.3),
      mapTypeId: 'terrain'
    });

    var script = document.createElement('script');

    script.src = 'apartments.js';
    document.getElementsByTagName('head')[0].appendChild(script);

}

      // Loop through the results array and place a marker for each
      // set of coordinates.

window.eqfeed_callback = function(results) {
   var bounds = new google.maps.LatLngBounds();
  var set = results.apartment;
  for (var i = 0; i < set.length; i++) {
    
    var rental = set[i];
    var coords = rental.location;
    var latLng = new google.maps.LatLng(coords.lat,coords.lon);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    bounds.extend(marker.position);

    var content = '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">'+ rental.name + '</h1>'+
      '<div id="bodyContent">'+
      '<div> Beds: ' + rental.style.bed + '</div>'+
      '<div> Bathrooms: ' + rental.style.bath + '</div>' +
      '<div> Price: $' + rental.price + '<div>' +
      '</div>'    

    var infowindow = new google.maps.InfoWindow()

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
}
    