var express = require('express');
var router = express.Router();
var monk = require('monk');
var tools = require('ms');
var db = monk('localhost:27017/servers_info');
//-------------------------------------------------------------------------------------
exports.index = function(req, res) {
    res.render("ipinfo", {infos : []});
}
//-------------------------------------------------------------------------------------
exports.add = function(req, res) {
    var now_time = tools.get_now_time();
    var t_serverinfo = req.body;
    t_serverinfo['uptime'] = now_time;
    var ServersInfo = db.get('servers_info');
    ServersInfo.insert(t_serverinfo, function(err, doc) {
        if (err) {
            console.log(err);
            return res.send({ok : 0, msg : "参数异常"});
        }
        res.send({ok : 1, msg : "添加成功"});
    });
}
//-------------------------------------------------------------------------------------
exports.get = function(req, res) {
     var ServersInfo = db.get('servers_info');
     ServersInfo.find({}, function(err, docs) {
        if (err) 
            console.log(err);
        res.send({infos : docs});
    });
}
//-------------------------------------------------------------------------------------
exports.modify = function(req, res) {
    var t = req.body;
    var now_time = tools.get_now_time();
    var ServersInfo = db.get('servers_info');
    var update_str = {};
    update_str[t.filed] = t.new_value;
    update_str['uptime'] = now_time;
    console.log(update_str);
    ServersInfo.findAndModify({'_id' : t._id}, {$set : update_str}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.send({ok : 0, msg : "参数异常"});
        }
        res.send({ok : 1});
    });
}
//-------------------------------------------------------------------------------------
//module.exports = router;