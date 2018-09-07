document.addEventListener('DOMContentLoaded', function() {
    console.log('Dom is loaded')
    document.getElementById('signinbutton').addEventListener("click",function(){
        event.preventDefault()
        let email = document.getElementById("emailInp").value
        let password = document.getElementById("passInp").value

        const xhr = new XMLHttpRequest();
        xhr.open("POST", '/login', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log('The data Has been sent')
            }
        }
        xhr.send("foo=bar&lorem=ipsum"); 



        console.log(email,password)
    })
    
    
    

    
    // your code here
 }, true);