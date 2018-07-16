const express = require('express')
const app = express()
const PORT = 8080
const bodyParser = require('body-parser')
const path = require('path')
const request = require("request");
const APIkey = require('./keys/key')
const data = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('client'));

app.get('/',( req,res ) => {
    res.sendFile(path.join(__dirname, "client/index.html"));
})


app.post('/data',(req,res)=> {
    console.log(req.body)
    let inputData = req.body.data
    let leafletID = APIkey.api2
    let options = { method: 'GET',
        url: `https://api.yelp.com/v3/businesses/search?term=${inputData}&latitude=${req.body.lat}&longitude=${req.body.long}`,
        qs: { text: 'gums' },
        headers: 
        {  'Cache-Control': 'no-cache',
            Authorization: `Bearer ${APIkey.api}`,
            Token: APIkey.api } };

    request(options, function (error, response, body) {
                if (error) throw new Error(error);
                    //console.log(body)
                    res.json({data : body , leaflet : leafletID});
            });



    
})

app.listen(PORT, () => {
    console.log(`You are Lisining to PORT ${PORT}`)
})





