const authorization = angular.module('authPage',[])


authorization.controller('authInfo', function resturantApp($scope,$http) {

$scope.auth = function ($event) {
    let loginData = {
        email : $scope.emailText,
        pass : $scope.passText
    }
    $http.post('/auth',loginData).success((data)=>{
        let currentLocation = window.location.pathname
        if (data) {
            if(data.auth) {
                window.location.pathname = '/test'
            }
        }
        else {
            window.location.pathname = window.location.pathname
        } 

        
        console.log(currentLocation)
    })
}

});


