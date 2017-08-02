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

var moduel_prefix = 'ioio_education_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_education_cookie";

    server.route([
        //班级列表
        {
            method: 'GET',
            path: '/index',
            handler: function(request, reply) {
                return reply.view("index");
            },
        },

        //班级详情
        {
            method: 'GET',
            path: '/class_view',
            handler: function(request, reply) {
                var id = request.query.id;
                return reply.view("class_view",{"id":id});
            },
        },

        //班级学员列表
        {
            method: 'GET',
            path: '/class_student_list',
            handler: function(request, reply) {
                return reply.view("class_student_list");
            },
        },

        //学员列表
        {
            method: 'GET',
            path: '/student_list',
            handler: function(request, reply) {
                return reply.view("student_list");
            },
        },

        //老师列表
        {
            method: 'GET',
            path: '/teacher_list',
            handler: function(request, reply) {
                return reply.view("teacher_list");
            },
        },

        //计划列表
        {
            method: 'GET',
            path: '/play_list',
            handler: function(request, reply) {
                return reply.view("play_list");
            },
        },

        //添加学员
        {
            method: 'GET',
            path: '/add_student',
            handler: function(request, reply) {
                return reply.view("add_student");
            },
        },

        //学员详情
        {
            method: 'GET',
            path: '/student_view',
            handler: function(request, reply) {
                var id = request.query.id;
                return reply.view("student_view",{"id":id});
            },
        },

        //添加班级
        {
            method: 'GET',
            path: '/add_class',
            handler: function(request, reply) {
                return reply.view("add_class");
            },
        },


    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
