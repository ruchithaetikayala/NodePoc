var express = require('express');
var router = express.Router();
var axios=require('axios');

var express=require('express');
var router=express.Router();
var axios=require('axios');
 
router.get('/', function(req, res, next) {
 axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US&page=1"
 
 ).then(response => res.send(response.data))
 .catch((error) => {
 console.error(error)
 })
 });
 
 
 router.get('/page', function(req, res, next) {
 var page = req.headers['page'];
 //console.log(page);
 //console.log(res);
 axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US"+"&page="+page)
 .then(response => res.send(response.data))
 .catch((error) => {
 console.error(error)
 })
 });
 
 router.get('/date', function(req, res, next) {
 var date=req.headers['date']
 //console.log(res);
 var sam1=[];
 axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US"
 ).then(response => {

 //this.response = response.data
//  var sam=response.data.results.filter(result => (result.date >= date));
//  res.send(sam);
var sam=response.data.results;
 sam.forEach(element => { 
 if(element.release_date==date){
 sam1.push(element)
 }
 });
 res.send(sam1);
 })
 .catch((error) => {
 console.error(error)
 })
 }); 
 
 
 router.get('/popularity', function(req, res, next) {
 
 var popularity=req.headers['popularity']
 console.log(res);
 var sam1=[];
 axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US"
 ).then(response => {
    //var sam=response.data.results.filter(result => (result.popularity >= popularity));
    //  res.send(sam);
 this.response = response.data
 var sam=response.data.results
 sam.forEach(element => { 
 if(element.popularity<=popularity){
 sam1.push(element)
 }
 });
 res.send(sam1);
 })
 .catch((error) => {
 console.error(error)
 })
 }); 
 


 router.get('/rating', function(req, res, next) {
 
    var rating=req.headers['rating']
    console.log(res);
    var sam1=[];
    axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US"
    ).then(response => {
    this.response = response.data
    var sam=response.data.results
    sam.forEach(element => { 
    if(element.vote_average>=rating){
    sam1.push(element)
    }
    });
    res.send(sam1);
    })
    .catch((error) => {
    console.error(error)
    })
    }); 

 
    router.get('/genre', function(req, res, next) {
        var name=req.headers.genre;
        var name1=name.split(",");//spliied to save as array
        //console.log(name1);
        Promise.all([
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US'),
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=27cf50a818f5b0ecdb3d4f79b45dea46&language=en-US')
        ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
        //console.log(res.send(response.data));
        return response.data; 
        }));// taking into singal array
        }).then(function (data) {

        var sam=[];// based on input header from line number 118 fecthing genre names and ids
        data[1].genres.filter(result =>name1.forEach(element=>{
        if(element==result.name){
        sam.push(result);
        }
        }));
        
        //console.log(sam)
        var sam1=[];//fetching ids from sam
        sam.forEach(element=>{
        sam1.push(element.id);
        })
        
        //console.log(sam1)
        var sam3=[];//fecting movie list using genre_ids which is comnig from sam1
        data[0].results.filter(element=>{
        for(var i=0;i<element.genre_ids.length;i++){
        if(sam1.indexOf(element.genre_ids[i])!=-1){
        sam3.push(element);
        break;
        }
        }
        })
        //console.log(sam3);
        res.send(sam3);
        }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
        });
        });


 
 module.exports=router;