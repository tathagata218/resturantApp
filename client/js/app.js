var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('resturantApp', function resturantApp($scope) {
  
  $scope.submit = function () { 
      console.log($scope.inputText)
   }
  
  $scope.bookResults = [
    
  ];
});