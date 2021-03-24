var axios = require('axios');
var links = require('../constants/constants').links;


function getmovie(req,res){
    axios.get(links.movies).then(response => res.send(response.data))
    .catch((error) => {
    console.error(error)
    })
}

function getpage(req,res,next){
    var page = req.headers['page'];
    axios.get(links.moviesLink+"&page="+page).then(response => res.send(response.data))
    .catch((error) => {
    console.error(error)
    })
}

function getdate(req,res){
    var date = req.headers['date1']
           //console.log(res);
            var sam1 = [];
            axios.get(links.moviesLink).then(response => {
               // var sam1=response.data.results.filter(result => (result.release_date == date));
                var sam = response.data.results
                if(date == "" || date == undefined){
                    res.send(sam);
                }else{
                    sam.forEach(element => { 
                        if(element.release_date == date){
                           sam1.push(element)
                            }
                   });
                   res.send(sam1);
                }
            })
                .catch((error) => {
                    console.error(error)
                    })     
}

function getpopularity(req,res){
    var popularity = req.headers['popularity']
    //console.log(res);
     var sam1 = [];
     axios.get(links.moviesLink).then(response => {
         //var sam1=response.data.results.filter(result => (result.popularity <= popularity));
        var sam = response.data.results
        if(popularity == "" || popularity == undefined){
            res.send(sam);
        }else{
            sam.forEach(element => { 
                if(element.popularity <= popularity){
                   sam1.push(element)
                    }
           });
           res.send(sam1);
        }
        
     })
     .catch((error) => {
     console.error(error)
     })
}

function getrate(req,res){
    var rating = req.headers['rating']
    //console.log(res);
    var sam1 = [];
    axios.get(links.moviesLink).then(response => {
    var sam = response.data.results
    if(rating == "" || rating ==undefined){
        res.send(sam);
    }else{
        sam.forEach(element => { 
            if(element.vote_average >= rating){
            sam1.push(element)
            }
            });
            res.send(sam1);
    }
    
    })
    .catch((error) => {
    console.error(error)
    })
}

function getgenres(req,res){
                 var name = req.headers.genre;
                 var name1;
                 if(name == undefined || name ==""){
                    name1 = name;//spliied to save as array
               //console.log(name1);
                 }
               else{
                   name1=name.split(",");
               }
                Promise.all([
                    axios.get(links.moviesLink),
                    axios.get(links.genresLink)
                ]).then(function (responses) {
                    // Get a JSON object from each of the responses
                    return Promise.all(responses.map(function (response) {
                        //console.log(res.send(response.data));
                            return response.data;    
                    }));// taking into singal array
                }).then(function (data) {
                    console.log(data[0].popularity);
                    if(name1 == "" || name1 == undefined){
                        res.send(data[0])
                    }else{
                        var sam = [];// based on  input header from line number 118  fecthing genre names and ids
                    data[1].genres.filter(result =>name1.forEach(element=>{
                            if(element == result.name ){
                                sam.push(result);
                            }
                    }));
                    //console.log(sam)
                    var sam1 = [];//fetching ids from sam
                    sam.forEach(element=>{
                        sam1.push(element.id);
                    })
                    //console.log(sam1)
                 var sam3 = [];//fecting movie list using genre_ids which is comnig from sam1..
                data[0].results.filter(element=>{
                    for(var i = 0; i < element.genre_ids.length; i++){
                    if(sam1.indexOf(element.genre_ids[i]) != -1){
                    sam3.push(element);
                     break;
                     }
                    //else{
                    //     result=[];
                    // }
                    }
                    })
                   // console.log(sam3);
                    res.send(sam3);
                    }
                    
                }).catch(function (error) {
                    // if there's an error, log it
                    console.log(error);
                });
}

function getAll(req,res){
                var name = req.headers.genre;
                var name1;
                if(name == undefined || name ==""){
                    name1 = name;//spliied to save as array
               //console.log(name1);
                 }
               else{
                   name1=name.split(",");
               }//spliied to save as array
                var popularity = req.headers['popularity'];
                var date = req.headers['date1'];
               //console.log(name1);
                Promise.all([
                    axios.get(links.moviesLink),
                    axios.get(links.genresLink)
                ]).then(function (responses) {
                    // Get a JSON object from each of the responses
                    return Promise.all(responses.map(function (response) {
                        //console.log(res.send(response.data));
                            return response.data;    
                    }));// taking into singal array
                }).then(function (data) {
                    // var sample=data[0].results.filter(result=>result.popularity<=popularity);
                    // console.log(sample);
                    var sam = [];
                    var sam3 = [];
                    if(name1 == "" || name1 == undefined){
                        sam3=data[0].results;
                    }else{
                        // based on  input header from line number 118  fecthing genre names and ids
                    data[1].genres.filter(result => name1.forEach(element => {
                            if((element == result.name)  ){
                                sam.push(result);
                            }
                            //console.log(sample)
                    }));
                    //console.log(sam)
                    var sam1 = [];//fetching ids from sam
                    sam.forEach(element => {
                        sam1.push(element.id);
                    }) 
                 //fecting movie list using genre_ids which is comnig from sam1..
                data[0].results.filter(element => {
                    for(var i = 0; i < element.genre_ids.length; i++){
                    if((sam1.indexOf(element.genre_ids[i]) != -1)  ){
                    sam3.push(element);
                     break;
                     }
                    }
                    })
                    }
                    if(popularity=="" || popularity == undefined)
                        sam5 = sam3;
                        else{
                    var sam5 = sam3.filter(result => (result.popularity <= popularity))
                    //res.send(sam5);
                        }
                        if(date == "" || date == undefined){
                        sam6 = sam5;
                        //console.log("entered")
                        }
                        else{
                    var sam6 = sam5.filter(result => (result.release_date == date))
                    
                        }
                        res.send(sam6)
                }).catch(function (error) {
                    // if there's an error, log it
                    console.log(error);
                });
     
}

module.exports = {
    getmovie,
    getpage,
    getdate,
    getpopularity,
    getrate,
    getgenres,
    getAll

}