const express = require('express')
const app = express()
const PORT = 8080
const bodyParser = require('body-parser')
const path = require('path')
const data = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('client'));

app.get('/',( req,res ) => {
    res.sendFile(path.join(__dirname, "client/index.html"));
})


app.post('/data',(req,res)=> {
    console.log(req.body)
    if(req.body) { 
        data.push(req.body)
    }
    res.status(200)
})

app.listen(PORT, () => {
    console.log(`You are Lisining to PORT ${PORT}`)
})





