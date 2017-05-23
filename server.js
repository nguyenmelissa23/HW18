var express = require("express"); 
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio"); 
var expresshbr = require("express-handlebars");
var bodyParser = require("body-parser");  
var mongoose = require("mongoose");

// Initialized express
var app = express();

// MongoJS config 
var databaseURL = "scrapeDb";
var collection = ["scrapedData"];

// MongoJS config to DB variable
var db = mongojs(databaseURL, collection);
db.on("error", function(error){
    console.log("Database Error:", error);
}); 

// Main route
app.get("/", function(req,res){
    res.render("index", {string:"Aparment"});
});

// Retrieve data from the db: 
app.get("/all", function(req, res){
    db.scrapedData.find({}, function(error, data){
        if (error) console.log(error);
        else {
            res.json(data);
        }
    })
})

app.get("/scrape", function(req, res){
    request("", function(error, response, html){
        var $ = cheerio.load(html);
        // Get info from HTML 
        // Save data to the database: 
        db.scrapedData.save({
                title: 0,
                link: 0
            }, 
            function(err, saved){
            if (err) throw err; 
            else {
                console.log(saved);
            }
        });
    });
    res.send("Scrape Completed");
}); 



//Listening on port:
app.listen(3000, function(){
    console.log("App running: http://localhost:3000");
})