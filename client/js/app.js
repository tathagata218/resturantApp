var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('resturantApp', function resturantApp($scope,$http) {
  $scope.value = []
  let lat = null
  let long = null
  function getLocation () {
    if(navigator.geolocation)
    { 
      console.log(navigator.geolocation.getCurrentPosition(Position)) }
    
  }

   getLocation()
  function Position(pos){
    lat = pos.coords.latitude
    long = pos.coords.longitude 
  }
  
   $scope.submit = function () {
    let test = {data : $scope.inputText,
                long : long,
                lat : lat};
    console.log(test)
    $http.post('/data',test)
     
    }

  $scope.clear = function (param) {
    $http.post('/data',data)
    
  }

  $scope.resturants= [
    {'resturant' : 'Applebeas',
      'location' : 'Houston'  },
    {'resturant' : 'Chimes',
    'location' : 'Houston'},
    {'resturant' : 'Starbucks',
    'location' : 'Houston'  }
  ];
});
