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

var moduel_prefix = 'ioio_education_class_data';

exports.register = function(server, options, next) {
    var service_info = "ioio education";
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;
    var education_api = server.plugins.services.education_api;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_borrow_cookie";

    server.route([
        //查询班级
        {
            method: "GET",
            path: '/get_classes',
            handler: function(request, reply) {
                education_api.get_classes(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询学员
        {
            method: "GET",
            path: '/get_students',
            handler: function(request, reply) {
                education_api.get_students(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询班级中的学员
        {
            method: "GET",
            path: '/search_students_byId',
            handler: function(request, reply) {
                var class_id = request.query.class_id;
                education_api.search_students_byId(class_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //根据id查找班级
        {
            method: "GET",
            path: '/search_class_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                education_api.search_class_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //班级信息新增
        {
            method: "POST",
            path: '/save_class',
            handler: function(request, reply) {
                var clas = request.payload.clas;
                clas = JSON.parse(clas);
                if (!clas.plan_id || !clas.name || !clas.code ||!clas.state || !clas.starting_date || !clas.end_date || !clas.class_master
                || !clas.master_id || !clas.remarks || !clas.level_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }
                var data = {
                    "clas" : JSON.stringify(clas)
                };
                education_api.save_class(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //班级删除
        {
            method: "POST",
            path: '/delete_class',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_class(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询学员信息
        {
            method: "GET",
            path: '/search_student_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                education_api.search_student_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //班级删除
        {
            method: "POST",
            path: '/update_student',
            handler: function(request, reply) {
                var student = request.payload.student;
                student = JSON.parse(student);
                if (!student.id || !student.name || !student.code || !student.age ||        !student.sex || !student.phone || !student.state ||!student.address || !student.province || !student.city || !student.district || !student.photo ||
                !student.level_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }
                var data = {"student":JSON.stringify(student)};
                education_api.update_student(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },


    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
