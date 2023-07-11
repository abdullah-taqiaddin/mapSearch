var map;
var markers = [];

function initMap() {

    var loc = {};
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('city-input'));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        initializeMap();
      },
      (err) => {
        console.log(err);
        initializeMap();
      }
    );
  
    function setPosition(pos) {
      loc = pos.coords;
      console.log(loc.latitude);
    }
  
    function initializeMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: loc.latitude || 0, lng: loc.longitude || 0 },
        zoom: 10,
      });
    }

    
}

function searchCity() {

    geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: document.getElementById('city-input').value}, (result,status)=>{
        if(status === 'OK'){
            map.setCenter(result[0].geometry.location);
            clearMarkers()
            var marker = new google.maps.Marker({
                map:map,
                position: result[0].geometry.location
            })
            markers.push(marker);
        }
        else{
            window.alert("Geocode was not successful due to " + status);
        }
    })

}

function clearMarkers(){
  for(let i = 0 ; i< markers.length ; i++){
    markers[i].setPosition(null)
  }
}
  