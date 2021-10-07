//import fetch from 'node-fetch'
const dotenv = require('dotenv');
dotenv.config();
//Azzam: what's the purpose of this line of code you needn't have a node package for this to work

// var MeaningCloud = require('meaning-cloud');

//Azzam: Why the fuck are you using var
var meaning = {
    key: process.env.API_KEY, // API Key. Required.     
    url:"https://api.meaningcloud.com/sentiment-2.1" // URI to create the API endpoints. Optional.
  };
 
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const { req, res } = require("express");

const app = express()

const cors = require("cors");
const { url } = require('inspector');
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(express.static('dist'))

//const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

console.log(__dirname)
//Azzam : Explain to me what those lines do
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
let data ={};
app.get('/add', async (req, res)=> {
    console.log('in add')
    console.log("in post");
    console.log(req.query.target);
    try {
        let ress = await fetch(
          `${meaning.url}?key=${meaning.key}&url=${req.query.target}&lang=en`
        );
        data = await ress.json();
       // res.send(data);
      let Data = {
        confidence: data.confidence,
        agreement: data.agreement,
        subjectivity: data.subjectivity,
        score_tag: data.score_tag,
        irony: data.irony,
        text: data.sentence_list[0].text,
      };
      console.log("Sending data");
      res.send(Data);
      console.log("Sending data2");
  }catch (err) {
    console.log(err);
  }
})

