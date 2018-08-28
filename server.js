const express = require('express')
const app = express()
const PORT = process.env.PORT ||  8080
const bodyParser = require('body-parser')
const path = require('path')
const request = require("request");
const APIkey = require('./keys/key')
const mongoose = require('mongoose')
const data = [];
const restData = require('./model/restData')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('client'));

app.get('/',( req,res ) => {
    res.sendFile(path.join(__dirname, "client/index.html"));
})


app.post('/data',(req,res)=> {
    //console.log(req.body)
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

app.get('/savedRest',(req,res)=>{
    res.sendFile(path.join(__dirname, "client/savedRest.html"));
});

app.post('/saveData',(req,res) => {
    let tester = new RegExp(/^\(\d{3}\)\s\d{3}-\d{4}/ig);
    let check = tester.test(req.body.restPhone)
    let data
    if(check) {
        data = {
            restName : req.body.restName,
            restAddress : req.body.restAddres,
            restPhone : req.body.restPhone,
            restCoords : req.body.restCoords    
        }
    }
    restData.create({ 
        resturantName : data.restName,
        resturantAddress : data.restAddress,
        resturantPhone : data.restPhone,
        resturantCoords :data.restCoords},  
        (err)=>{if (err){console.log(err)} else {res.sendStatus(200)} }
    )

console.log (req.body)

})

app.post('/deleteData',(req,res) => {

    console.log (req.body.id)
    res.sendStatus(200)
})

// This is connecting to monogoDB
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ResturantDB', { useNewUrlParser: true },()=>{
    console.log(`You are conncted to the Mongo DB`)
})
// This is connecting to monogoDB





app.listen(PORT, () => {
    console.log(`You are Lisining to PORT ${PORT}`)
})




