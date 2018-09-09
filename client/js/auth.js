const authorization = angular.module('authPage',[])





document.addEventListener('DOMContentLoaded', function() {
    console.log('Dom is loaded')
    document.getElementById('signinbutton').addEventListener("click",function(){
        event.preventDefault()
        let email = document.getElementById("emailInp").value
        let password = document.getElementById("passInp").value
        let data = {
            email : email,
            pass : password
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", '/auth', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            //
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log('The data Has been sent')
            }
        }
        xhr.send( JSON.stringify(data));




        
    })
    
    
    

    
    // your code here
 }, true);