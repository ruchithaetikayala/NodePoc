var express = require('express');
var router = express.Router();
var axios = require('axios');
var movieService = require('../service/movieServices');
var CB=require('../circuit-breaker');

   router.get('/', CB , function(req, res, next) 
   {
    movieService.getmovie(req,res);
        
    });

    router.get('/page', CB , function(req, res, next)
     {
         movieService.getpage(req,res);
        
     });

 
     router.get('/date', CB , function(req, res, next)
     {
         movieService.getdate(req,res);
     });  
        
   router.get('/popularity', CB ,  function(req, res, next)
    {
        movieService.getpopularity(req,res);
            
    });        

  
    router.get('/rating',  CB , function(req, res, next)
    {
        movieService.getrate(req,res);
    });
  
   
    router.get('/genre',  CB , function(req, res, next) 
    {
        movieService.getgenres(req,res);
     });

  
     router.get('/all',  CB , function(req, res, next) 
    {
        movieService.getAll(req,res);
     });

module.exports = router;
