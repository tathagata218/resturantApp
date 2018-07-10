var phonecatApp = angular.module('FoodHung', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('bookResults', function PhoneListController($scope) {
  
  $scope.submit = function () { 
      console.log($scope.text)
   }
  
  $scope.bookResults = [
    
  ];
});