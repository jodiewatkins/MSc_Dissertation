//code adapted from: Google Maps Platform 2019. Geolocation  |  Maps JavaScript API  |  Google Developers. Available at: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/map-geolocation [Accessed: 15 August 2019].
var map, infoWindow;
var geoLocation = []
//code adapted from: Traversy Media [2017]. Google Maps JavaScript API Tutorial - YouTube. Available at: https://www.youtube.com/watch?v=Zxf1mnP5zcw [Accessed: 13 August 2019].
function initMap() {
  //creating a new map, centering it on cardiff and setting the zoom level
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:51.481583, lng:-3.179090},
    zoom: 13
  });

  infoWindow = new google.maps.InfoWindow;
  
  // finds the location of the user from HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      geoLocation.push(latitude,longitude);
   
      //showing an info window on where the user is located
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    //Handing errors - if the users browser does not support geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  mapLoad()
//error catching for geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
    }
 
}
function mapLoad(){

  //time out function to wait for the data to be extracted from the database
   setTimeout(function(){
     var lenReturnRest = markers.length
    console.log(lenReturnRest);
    document.getElementById('strapline').innerHTML = "Wooooooooohooo! We have found "+lenReturnRest+ " places have been found that you would like. Search the map too see....";
    
   console.log("MARKERS: "+ markers);
   //loop through markers and adds marker function 
   for (var i = 0; i < markers.length; i++) {
     //add each marker
     console.log(markers[i]);
     addMarker(markers[i]);
 }
   function addMarker(props) {
     var marker = new google.maps.Marker({
         position: props.coords,//create positions for the markers of restaurant
         map: map,
         animation: google.maps.Animation.DROP,
         //icon: props.iconImage
     });
     if (props.iconImage) {
         //set icon image
         marker.setIcon(props.iconImage);
     }
     //check content for restaurant
     if (props.name) {
         //information window
         var infoWindow = new google.maps.InfoWindow({
             content: "Restaurant: "+ props.name +"<br>"+"Address: "+props.address +"<br>"+ "Opening Hours: "+props.open
         });
     
         //Gets the name of the restaurant onto information window 
         marker.addListener('click', function () {
             infoWindow.open(map, marker);
         });
     }
 
   }
 } , 20000);} //sets the timeout function to 3 seconds

//code adapted from: Form.Guide [no date]. How to use the HTML5 range input type. Available at: http://form.guide/html-form/html5-input-type-range.html [Accessed: 01 September 2019].
$(function(){
$('.slider').on('input change', function(){
          $(this).next($('.slider_label')).html(this.value);
        });
      $('.slider_label').each(function(){
          var value = $(this).prev().attr('value');
          $(this).html(value);
        });  
  
  
})

//detect change in star filter, alter query and update map
var starOPt =""
function newchangeStars(){
  var star =document.getElementById('starsSelect');
  starOPt= star.options[star.selectedIndex].text;
  console.log(starOPt);
  dbStars();
  mapLoad();
}

//detect change in category filter, alter query and update map
var catOPt = ""
function newchangeCat(){
  var cat =document.getElementById('categoerySelect');
  catOPt = cat.options[cat.selectedIndex].text;
  dbCategory();
  mapLoad();
  console.log(catOPt);
}

//detect change in distance filter, alter query and update map
var disOPt = ""
function newchangeDis(){
  var dis =document.getElementById('slider_label');
  catOPt = dis.textContent;
  dbCategory();
  mapLoad();
  console.log(disOPt);
}


