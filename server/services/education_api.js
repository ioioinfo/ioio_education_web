/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

var _ = require('lodash');
var eventproxy = require('eventproxy');
const util = require('util');
const uu_request = require('../utils/uu_request');

var host = "http://211.149.248.241:18027/";

var nav = function(server) {
    return {



        // car4s_act: function(act_time, point,person_id,act_options,cb) {
        //     var url = host + "fsm/car4s_act";
        //     var data = {act_time:act_time,point:point,"person_id":person_id,"act_options":act_options};
        //
        //     uu_request.request(url, data, function(err, response, body) {
        //         if (!err && response.statusCode === 200) {
        //             cb(err,body);
        //         } else {
        //             cb(true,{message:"网络错误"});
        //         }
        //     });
        // },

        // geocode: function(address,cb) {
        //     var url = host + "geocode/geo";
        //     var data = {key:"0c053bde775595e8b1b3de340265f053",output:"JSON","address":address};
        //
        //     uu_request.request(url, data, function(err, response, body) {
        //         if (!err && response.statusCode === 200) {
        //             var geocodes = [];
        //
        //             if (body["status"] == "1") {
        //                 geocodes = body["geocodes"];
        //             }
        //             cb(err,geocodes);
        //         } else {
        //             cb(true,{message:"网络错误"});
        //         }
        //     });
        // },


    };
};

module.exports = nav;
