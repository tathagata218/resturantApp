

const secondPart = angular.module('savedPart',[]);


secondPart.controller('displayResturants', function displayResturants($scope,$http) {

$http.get('/allData').success((data)=>{
    $scope.allArrData = data.data
    //$scope.test = data.data
    console.log(data.data)
})


$scope.delRest = function ($event) {
    let dataID = $event.currentTarget.attributes[2].nodeValue
    console.log(dataID)

}

})
