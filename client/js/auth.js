const authorization = angular.module('authPage',[])


authorization.controller('authInfo', function resturantApp($scope,$http) {

$scope.auth = function ($event) {
    let email =  $scope.emailText
    let pass = $scope.passText
    let loginData = {
        auth : true
    }
    $http.post('/auth',loginData).success((data)=>{
        let currentLocation = window.location.pathname
        if (data) {
            if(data.config) {
                firebase.initializeApp(data.config);
                firebase.auth().signInWithEmailAndPassword(email, pass).catch((err)=>{
                    if(err) {
                        console.log(err)
                        firebase.auth().createUserWithEmailAndPassword(email,pass).catch((err)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                window.location.pathname = '/homePage'
                            }
                        })
                    }
                    else {
                        console.log('You have logged in')
                        
                    }
                })
                
            }
        }
        else {
            window.location.pathname = window.location.pathname
        } 

        
        console.log(currentLocation)
    })
}

$scope.newUser = function ($event) {
    let newUserData = {
        firstName : $scope.firstName,
        lastName : $scope.lastName,
        email : $scope.newEmail
    }
    let firbaseData = {
        email : $scope.newEmail,
        password : $scope.newPass
    }

    let loginData = {
        auth : true
    }

    $http.post('/auth',loginData).success((data)=>{
        if(data.config) {
            firebase.initializeApp(data.config);
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(firbaseData.email,firbaseData.password).catch((err)=>{
                if(err){
                    console.log(err)
                }
                else {
                    firebase.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            console.log(user)
                          // User is signed in.
                        } else {
                             console.log("Some Thing Went Wrong")   
                        }
                      });
                }
            })
        }
    })
    
}

});


