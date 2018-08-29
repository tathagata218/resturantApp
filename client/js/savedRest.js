

const secondPart = angular.module('savedPart',[]);


secondPart.controller('displayResturants', function displayResturants($scope,$http) {
    
console.log('You are working here')
$http.get('/allData').success((data)=>{
    $scope.allArrData = data.data
    //$scope.test = data.data
    console.log(data.data)
})
})
