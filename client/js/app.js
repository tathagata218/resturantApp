var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('resturantApp', function resturantApp($scope) {
  $scope.value = []
  $scope.submit = function () { 
      console.log($scope.inputText)
      let data = $scope.inputText
      let config = headers: {
        'Content-Type': 'data'
      }
    $http.post('/data',data).then(()=>{console.log('it Worked')},()=>{'sorry'})
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
