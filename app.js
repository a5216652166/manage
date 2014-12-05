var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ip_info');

var index = require('./routes/index');
var monitor = require('./routes/monitor');
var queryServerInfo = require('./routes/ServerInfo');
var querySiteInfo = require('./routes/SiteInfo');
var queryIpInfo = require('./routes/ipinfo');
var history = require('./routes/history');
var search = require('./routes/search');
// var users = require('./routes/users');
// var helloworld = require('./routes/helloworld');
// var iplist = require('./routes/iplist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/monitor', monitor);
app.get('/serverinfo', queryServerInfo.index);
app.put('/serverinfo', queryServerInfo.add);
app.get('/get_serverinfo', queryServerInfo.get);
app.post('/modify_serverinfo', queryServerInfo.modify);
app.get('/siteinfo', querySiteInfo.index);
app.get('/get_siteinfo', querySiteInfo.get);
app.post('/modify_siteinfo', querySiteInfo.modify);
app.put('/siteinfo', querySiteInfo.add);
app.get('/ipinfo', queryIpInfo.index);
app.use('/history', history);
app.put('/search', search.search);

// app.use('/users', users);
// app.use('/helloworld', helloworld);
// app.use('/iplist', iplist);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;