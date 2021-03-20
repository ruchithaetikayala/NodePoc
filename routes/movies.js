var express = require('express');
var router = express.Router();
var axios = require('axios');
var movieService = require('../service/movieServices');
var CB=require('../circuit-breaker');

const movie = movieService.getmovie;
const page = movieService.getpage;
const date = movieService.getdate;
const popularity = movieService.getpopularity;
const rating = movieService.getrate;
const genre = movieService.getgenres;
const dp = movieService.getAll;


   router.get('/', CB , function(req, res, next) 
   {
         movie(req,res);
    });

   
    router.get('/page', CB , function(req, res, next)
     {
         page(req,res);
        
     });

    router.get('/date', CB , function(req, res, next)
     {
         date(req,res);
     });  
        
        
    router.get('/popularity', CB ,  function(req, res, next)
    {
          popularity(req,res);
            
    });        

    router.get('/rating',  CB , function(req, res, next)
    {
         rating(req,res);
    });
    
    router.get('/genre',  CB , function(req, res, next) 
    {
         genre(req,res);
     });

     router.get('/all',  CB , function(req, res, next) 
    {
         dp(req,res);
     });

    module.exports = router;
