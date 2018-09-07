document.addEventListener('DOMContentLoaded', function() {
    console.log('Dom is loaded')
    document.getElementById('signinbutton').addEventListener("click",function(){
        event.preventDefault()
        let email = document.getElementById("emailInp").value
        let password = document.getElementById("passInp").value
        
        console.log(email,password)
    })
    
    
    

    
    // your code here
 }, true);