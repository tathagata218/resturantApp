const authorization = angular.module('authPage',[])


authorization.controller('authInfo', function resturantApp($scope,$http) {
let firbaseConfig = null
if (!firbaseConfig) {
    firebase.initializeApp(firbaseConfig);
}
$scope.auth = function ($event) {
    let email =  $scope.emailText
    let pass = $scope.passText
    let loginData = {
        auth : true
    }
    
    $http.post('/auth',loginData).success((data)=>{
        
        let currentLocation = window.location.pathname
        if(data.config) {
                    
                console.log(firebase.app())
                firebase.initializeApp(data.config);
                firbaseConfig = data.config
                
                                            
                firebase.auth().signInWithEmailAndPassword(email, pass).catch((err)=>{
                    if(err) {
                        console.log(err)
                        
                    }
                    else {
                        console.log('You have logged in')
                        let user = firebase.auth().currentUser;

                        if (user != null) {
                        user.providerData.forEach(function (profile) {
                            console.log("Sign-in provider: " + profile.providerId);
                            console.log("  Provider-specific UID: " + profile.uid);
                            console.log("  Name: " + profile.displayName);
                            console.log("  Email: " + profile.email);
                            console.log("  Photo URL: " + profile.photoURL);
                        });
                        }
                        
                    }
                })
                
            window.location.pathname = '/homePage'
            }
        
        else {
            window.location.pathname = window.location.pathname
        } 

        
        
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
            
            if(!firebase.app.length){
                firebase.initializeApp(data.config);
                firbaseConfig = data.config
            }
            firebase.auth().createUserWithEmailAndPassword(firbaseData.email,firbaseData.password).catch((err)=>{
                if(err){
                    console.log(err)
                }
                else {
                    let user = firebase.auth().currentUser;

                    if (user != null) {
                    user.providerData.forEach(function (profile) {
                        console.log("Sign-in provider: " + profile.providerId);
                        console.log("  Provider-specific UID: " + profile.uid);
                        console.log("  Name: " + profile.displayName);
                        console.log("  Email: " + profile.email);
                        console.log("  Photo URL: " + profile.photoURL);
                    });
                    }
                }
            })
        }
    })
    
}

});


