var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('resturantApp', function resturantApp($scope,$http) {
  $scope.value = []
  $scope.submit = function () {
    let test = 'delis';
    console.log(test)
    
     
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
