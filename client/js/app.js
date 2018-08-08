const phonecatApp = angular.module('FoodHung', []);


phonecatApp.controller('resturantApp', function resturantApp($scope,$http) {
  
  let lat = null
  let long = null
  let mymap = null
  
  function getLocation () {
    if(navigator.geolocation)
    { 
      navigator.geolocation.getCurrentPosition(Position)
    }
    else{
      alert('Your Browser Dose not Support Geolocation')
    }
    
  }
  
  getLocation()
  
  function Position(pos){
    lat = pos.coords.latitude
    long = pos.coords.longitude
    mymap = L.map('mapid').setView([lat, long], 11); 
    console.log(lat,long)
  }
  
  

  $scope.submit = function () {
    let test = {data : $scope.inputText,
                long : long,
                lat : lat
              };
    
              console.log(test)

    $http.post('/data',test).success((data)=>{
      console.log(data)
      let info = JSON.parse(data.data)
      console.log (info.businesses)
      $scope.getData = info.businesses
      L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${data.leaflet}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: data.leaflet
          }).addTo(mymap);


      for(let i = 0; i < info.businesses.length; i++) {
       
         L.marker([info.businesses[i].coordinates.latitude, info.businesses[i].coordinates.longitude]).addTo(mymap)
          .bindPopup(`<p>Name : ${info.businesses[i].name}</p><hr/><p>Phone : ${info.businesses[i].display_phone}</p>`)

        } 
    
    }) }

    
  $scope.popupInfo = function ($event) {
    let lat = $event.currentTarget.attributes.lat.nodeValue;
    let long = $event.currentTarget.attributes.long.nodeValue;
    let resturantName = $event.currentTarget.children[1].children[0].innerHTML
    let retuPhone = $event.currentTarget.children[1].children[2].innerHTML 
    

      L.marker([lat,long]).addTo(mymap).bindPopup(`<p>Name : ${resturantName}</p><hr/><p>${retuPhone}</p>`).openPopup()
  } 
  
  $scope.clearAll = function (param) {
    mymap.eachLayer(function (layer) {
      mymap.removeLayer(layer);
      $scope.inputText = ' '
      $scope.getData = []
  });
  
  }
  
  $scope.names = [ "Your Location" , "Austin", "Houston", "Dallas", "Katy", "San Antonio", "Baton Rouge", "Monroe", "New Orleans", "Boston", "San Fransisco"];
    
  $scope.saveRest = function ($event) { 
    // let lat = $event.currentTarget.attributes.lat.nodeValue;
    // let long = $event.currentTarget.attributes.long.nodeValue;
    // let resturantName = $event.currentTarget.children[1].children[0].innerHTML
    // let retuPhone = $event.currentTarget.children[1].children[2].innerHTML 

    console.log($event)
   }
  
});
