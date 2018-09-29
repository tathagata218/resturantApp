const authorization = angular.module('authPage',[])


authorization.controller('authInfo', function resturantApp($scope,$http) {

function intFirebase(config) {
    firebase.initializeApp(config)
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
                    
               
                //intFirebase(data.config)
                
                //firebase.initializeApp(data.config);

                
                                            
                firebase.auth().signInWithEmailAndPassword(email, pass).catch((err)=>{
                    if(err) {
                        console.log(err.massage)

                        
                    }
                    else {
                        console.log('You have logged in')
                        firebase.auth().onAuthStateChanged(function(user) {
                            if (user) {
                              // User is signed in.
                              var displayName = user.displayName;
                              var email = user.email;
                              var emailVerified = user.emailVerified;
                              var photoURL = user.photoURL;
                              var isAnonymous = user.isAnonymous;
                              var uid = user.uid;
                              var providerData = user.providerData;
                              console.log(displayName,email,emailVerified,uid)
                              // ...
                            } 
                          });
                          
                        
                    }
                })
                
            //window.location.pathname = '/homePage'
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
            if(firebase.apps.length === 0) {
                firebase.initializeApp(data.config)
            }           
            
            firebase.auth().createUserWithEmailAndPassword(firbaseData.email,firbaseData.password).catch((err)=>{
                if(err){
                    console.log(err)
                }
                else {
                    firebase.auth().onAuthStateChanged(function(user) {
                        if (user) {
                          // User is signed in.
                          var displayName = user.displayName;
                          var email = user.email;
                          var emailVerified = user.emailVerified;
                          var photoURL = user.photoURL;
                          var isAnonymous = user.isAnonymous;
                          var uid = user.uid;
                          var providerData = user.providerData;
                          console.log(displayName,email,emailVerified,uid)
                          // ...
                        } 
                      });
                    }
                })
            }
        })
    
    
}

});


