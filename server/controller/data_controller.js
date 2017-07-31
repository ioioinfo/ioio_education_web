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
var r = require('request');
var moment = require('moment');
var eventproxy = require('eventproxy');

var moduel_prefix = 'ioio_education_data';

exports.register = function(server, options, next) {
    var service_info = "ioio education";
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_borrow_cookie";

    server.route([
        //查询数据
        {
            method: "GET",
            path: '/list_data',
            handler: function(request, reply) {
                return reply({"success":true,"rows":[],"num":0});
            }
        },
        
        //返回menu菜单列表
        {
            method: 'GET',
            path: '/menu_list',
            handler: function(request, reply){
                var rows = [
                    {icon:"fa fa-home fa-fw",navname:"首页",a:"index", snav:[]},
                    {icon:"fa fa-list fa-fw",navname:"学员列表",a:"student_list",snav:[]},
                    {icon:"fa fa-child fa-fw",navname:"学员详情",a:"student_view",snav:[]},
                    {icon:"fa fa-plus-circle fa-fw",navname:"添加学员",a:"add_student",snav:[]},
                    {icon:"fa fa-user fa-fw",navname:"教师列表",a:"teacher_list",snav:[]},
                    {icon:"fa fa-book fa-fw",navname:"计划列表",a:"plan_list",snav:[]},
                    {icon:"fa fa-building-o fa-fw",navname:"班级列表",a:"index",snav:[]},
                    {icon:"fa fa-user-plus fa-fw",navname:"班级学员列表",a:"class_student_list",snav:[]},
                    {icon:"fa fa-bookmark fa-fw",navname:"班级详情",a:"class_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加班级",a:"add_class",snav:[]},
                ];
                
                return reply({"success":true,"rows":rows,"message":"ok"});
            }
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
