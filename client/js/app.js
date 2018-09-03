

const phonecatApp = angular.module('myApp',[]);


phonecatApp.controller('resturantApp', function resturantApp($scope,$http) {
  getLocation()

  var lat = null
  var long = null
  var mymap = null
  
 
 
  if(localStorage.getItem('data') === null ) {
    $scope.getData = []
  }
  else if (localStorage.getItem('data')){
    let data = JSON.parse(localStorage.getItem('data'))
    let info = JSON.parse(data.data)
    let token = data.leaflet
    
    $scope.getData = info.businesses
     setTimeout(function(){ forLoop(token,info.businesses) },1000) 
  }
  


  

  function getLocation () {
    if(navigator.geolocation)
    { 
      navigator.geolocation.getCurrentPosition(Position)
    }
    else{
      alert('Your Browser Dose not Support Geolocation')
    }
    
  }
  
  
  
  function Position(pos){
    lat = pos.coords.latitude
    long = pos.coords.longitude
    console.log(lat,long)
  }
  

   function forLoop (apiIfo,busData) {
    if(mymap !== null){
    mymap.remove()
    }
          
    mymap = L.map('mapid').setView([lat, long], 11);
    
      L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${apiIfo}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: apiIfo
        }).addTo(mymap);




      for(let i = 0; i < busData.length; i++) {
  
        L.marker([busData[i].coordinates.latitude, busData[i].coordinates.longitude]).addTo(mymap)
          .bindPopup(`<p>Name : ${busData[i].name}</p><hr/><p>Phone : ${busData[i].display_phone}</p>`)

        }
   
    }
  

  $scope.submit = function () {
    localStorage.clear()

        

      let test = {
          data : $scope.inputText,
          long : long,
          lat : lat
        };

    console.log(test)       

        $http.post('/data',test).success((data)=>{
          
        console.log(data)
          if(data) {
            localStorage.setItem('data',JSON.stringify(data))
          }
          
          let info = JSON.parse(data.data)
          let token = data.leaflet
        console.log (info.businesses)
        
          $scope.getData = info.businesses
          
          
          setTimeout(function (){ forLoop(token,info.businesses)  },1200)
          
        }
  

    ) 
  

  
}

    
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
      localStorage.clear()
  });
  
  }
  
  
  $scope.saveRest = function ($event) {
    let html = '<i class="fas fa-save"></i>  Save  <i class="fas fa-check"></i>'
    console.log($event.currentTarget.innerHTML)
    $event.currentTarget.innerHTML = html
    
    let saveData = { restName : $event.currentTarget.attributes[2].value,
                    restAddres : $event.currentTarget.attributes[3].value,
                    restPhone : $event.currentTarget.attributes[4].value,
                    restCoords : $event.currentTarget.attributes[5].value,
                    restURL : $event.currentTarget.attributes[1].value} 
    console.log(saveData)
    let tester = new RegExp(/^\(\d{3}\)\s\d{3}-\d{4}/ig);
    let check = tester.test(saveData.restPhone)
    
    if(check) {
      $http.post('/saveData',saveData).success(()=>{
        console.log('The data has been sent')
      })
    }
    
    console.log($event.currentTarget.attributes)
   }


  
  });
