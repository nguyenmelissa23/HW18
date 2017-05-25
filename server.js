var express = require("express"); 
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio"); 
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");  
var mongoose = require("mongoose");

var Article = require("./models/Article");
var Note = require("./models/Note");
var User = require("./models/User");

var Promise = require("bluebird");

mongoose.Promise = Promise;
// Initialized express
var app = express();

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
	extended: false
}));


// Databse config with mongoose:
mongoose.connect("mongodb://heroku_zjc6crhg:686evpue33npdj1f9b1kbnd0rk@ds119091.mlab.com:19091/heroku_zjc6crhg")
var db = mongoose.connection;

// Show err: 
db.on("error", function(error){
	console.log("Mongoose Error:", error);
});

// Once logged in, log message:
db.once("open", function(){
	console.log("Mongoose connection successful.");
})


/**----------------------------------------------------------------
 * ROUTING
 *----------------------------------------------------------------- 
 */
// Main route
app.get("/", function(req,res){
	res.render("home", {});
});

//Articles
// Retrieve data from the db: 
app.post("/savingArticle", function(req, res){
	// var obj = {
	// 	title: "Title here", 
	// 	link: "Link here"
	// };
	// var newArticle = new Article(obj); 
	console.log(req.body);
	var newArticle = new Article(req.body);
	newArticle.save(function(error, saved){
		if(error) console.log(error);
		else{
			res.send(saved);
		}
	});
});

app.get("/savedArticles", function (req, res) {
	Article.find({}, function (error, articles) {
		if (error) console.log(Error);
		else {
			console.log(articles);
			res.render("savedArticles", {savedArticles: articles});
		}
	});
});

// Notes
app.post("/savingNote", function(req, res){
	var newNote = new Note({"text" : req.body.text});
	newNote.save(function(error, savedNote){
		if (error) console.log(error);
		else {
			console.log("articleId: ", req.body.articleId);
			Article.findOneAndUpdate({"_id": req.body.articleId}, {$push:{"notes": savedNote._id}}, {new:false},
				function(error, newSavedNote){
					if (error) res.send("in article error",error);
					else res.send(newSavedNote);
				});
		}
	});
});

app.get("/note", function (req, res) {
	Note.find({}, function(error, notes){
		if (error) console.log(error);
		if (!notes){
			res.send("There is no note.");
		} else {
			res.send(notes);
		}
	})
});

// Scrape New Articles
app.get("/scrape", function(req, res){
	var articleArr = [];
	request("https://www.reddit.com/r/futurology/search?q=flair%3A%22AI%22&sort=hot&restrict_sr=on&t=all#AI", 
	function(error, response, html){
		var $ = cheerio.load(html);
		// Look for all "a" element with class "search title"
		// for each of the found element, do something 
		// then send it to home.handlebars to display
		$("a.search-title").each(function(i, element){
			var title = $(this).text();
			var link = $(this).parentsUntil("div.search-result").children("div").next().children("a.search-link").text();

			if (title && link){
				var newArticle = {
					title: title, 
					link: link
				}
				articleArr.push(newArticle);
			}
		});
		res.render("home", {scrapedArticles: articleArr});
	});
});

/**----------------------------------------------------------------
 * End of Routing
 *----------------------------------------------------------------- 
 */


//Listening on port:
app.listen(3000, function(){
	console.log("App running: http://localhost:3000");
});