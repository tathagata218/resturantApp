var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('resturantApp', function resturantApp($scope,$http) {
  
  let lat = null
  let long = null
  let mymap = null
  function getLocation () {
    if(navigator.geolocation)
    { 
      console.log(navigator.geolocation.getCurrentPosition(Position)) }
    
  }
  
  getLocation()
  
  function Position(pos){
    lat = pos.coords.latitude
    long = pos.coords.longitude
    mymap = L.map('mapid').setView([lat, long], 11); 
  }
  
  

  $scope.submit = function () {
    let test = {data : $scope.inputText,
                long : long,
                lat : lat};
    console.log(test)
    $http.post('/data',test).success((data)=>{
      console.log(data)
      let info = JSON.parse(data.data)
      console.log (info.businesses)
      
      L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${data.leaflet}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: data.leaflet
          }).addTo(mymap);


      for(let i = 0; i < info.businesses.length; i++) {
       
         L.marker([info.businesses[i].coordinates.latitude, info.businesses[i].coordinates.longitude]).addTo(mymap)
          .bindpopup(`<h3>Name : ${info.businesses[i].name}</h3><br/><p>Phone : ${info.businesses[i].phone}</p>`)

        
      
      } 
    
    }) }

    

  
  $scope.clear = function (param) {
    $http.post('/data',data)
    }

    

  
});
