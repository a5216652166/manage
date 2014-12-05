var monk = require('monk');
var db = monk('localhost:27017/servers_info');
var tools = require('ms');
//-------------------------------------------------------------------------------------
exports.index = function(req, res) {
    res.render("siteinfo", {siteinfos : []});
}
//-------------------------------------------------------------------------------------
exports.add = function(req, res) {
    var now_time = tools.get_now_time();
    var t_siteinfo = req.body;
    t_siteinfo['uptime'] = now_time;
    var SiteInfo = db.get('sites_info');
    SiteInfo.insert(t_siteinfo, function(err, doc) {
        if (err) {
            console.log(err);
            return res.send({ok : 0, msg : "参数异常"});
        }
        res.send({ok : 1, msg : "添加成功"});
    });
}
//-------------------------------------------------------------------------------------
exports.get = function(req, res) {
     var SiteInfo = db.get('sites_info');
     SiteInfo.find({}, {sort : {ip_20 : 1}}, function(err, docs) {
        if (err) console.log(err);
        //console.log(docs)
        res.send({siteinfos : docs});
    });
}
//-------------------------------------------------------------------------------------
exports.modify = function(req, res) {
    var t = req.body;
    var now_time = tools.get_now_time();
    var SiteInfo = db.get('sites_info');
    var update_str = {};
    update_str[t.filed] = t.new_value;
    update_str['uptime'] = now_time;
    console.log(update_str);
    SiteInfo.findAndModify({'_id' : t._id}, {$set : update_str}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.send({ok : 0, msg : "参数异常"});
        }
        res.send({ok : 1});
    });
}