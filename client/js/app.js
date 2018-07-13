var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('resturantApp', function resturantApp($scope,$http) {
  $scope.value = []
  $scope.submit = function () { 
      console.log($scope.inputText)
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      $http.defaults.headers.common.Authorization = 'kpKQNlt26wcMq4d4ZEDISu4NHXumEvl5KxrgsZnx4rU3UgMNd47fFIZo7n_Dz1gA8cO7bD4TpwOcSZrAK1bxAKEeVhPgO1zpPTiL1HMmRchQwpAd7zb62BG11bhHW3Yx';
      let url = 'http://api.yelp.com/v3/businesses/search'
      
    $http.get(url).then((data)=>console.log(data))
   
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
