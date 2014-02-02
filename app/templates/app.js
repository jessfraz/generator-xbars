/* 
 * Dependencies
 */
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    exphbs = require('express3-handlebars'),
    lessMiddleware = require('less-middleware');


/*
 * Initiate Express
 */
var app = express();


/* 
 * App Configurations
 */
app.configure(function() {
    app.set('port', process.env.PORT || <%= port %>);

    app.set('views', __dirname + '/views');

    app.set('view engine', 'html');
    app.engine('html', exphbs({
        defaultLayout: 'main',
        extname: '.html'
        //helpers: helpers
    }));
    app.enable('view cache');

    app.use(lessMiddleware({
        src: __dirname + '/public',
        compress: true,
        sourceMap: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.favicon());
    app.use(express.logger('dev')); 
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

/*
* Route for Index
*/
app.get('/', function(req, res) {
    res.render('index');
});


/*
 * Routes for Robots/404
 */
app.get('/robots.txt', function(req, res) {
    fs.readFile(__dirname + "/robots.txt", function(err, data) {
        res.header('Content-Type', 'text/plain');
        res.send(data);
    });
});

app.get('*', function(req, res) {
    res.render('404');
});


http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});