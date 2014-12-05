var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('servers_info', ['servers_info']);

exports.search = function(req, res) {
    var inputStr = req.body.value;
    db.servers_info.runCommand("text", {search : inputStr}, function(err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            res.send({results : docs.results})
        }
    })
}