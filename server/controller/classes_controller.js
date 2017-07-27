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
        //学员修改
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
        //学员删除
        {
            method: "POST",
            path: '/delete_student',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_student(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存学员
        {
            method: "POST",
            path: '/save_student',
            handler: function(request, reply) {
                var students = request.payload.students;
                students = JSON.parse(students);
                if (students.length==0) {
                    return reply({"success":false,"message":"students wrong","service_info":service_info});
                }

                var data = {"students":JSON.stringify(students)};
                education_api.save_student(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询课程
        {
            method: "GET",
            path: '/get_lessons',
            handler: function(request, reply) {
                education_api.get_lessons(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询课程信息
        {
            method: "GET",
            path: '/search_lesson_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                education_api.search_lesson_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //课程删除
        {
            method: "POST",
            path: '/delete_lesson',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_lesson(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存课程
        {
            method: "POST",
            path: '/save_lesson',
            handler: function(request, reply) {
                var plan_id = request.payload.plan_id;
				var teacher_id = request.payload.teacher_id;
				var name = request.payload.name;
				var code = request.payload.code;
				var hours = request.payload.hours;
				var level_id = request.payload.level_id;

				if (!plan_id || !teacher_id || !name || !code || !hours || !level_id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "plan_id": plan_id,
                    "teacher_id": teacher_id,
                    "name": name,
                    "code": code,
                    "hours": hours,
                    "level_id": level_id
                };
                education_api.save_lesson(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新课程
        {
            method: "POST",
            path: '/update_lesson',
            handler: function(request, reply) {
                var id = request.payload.id;
                var plan_id = request.payload.plan_id;
                var teacher_id = request.payload.teacher_id;
                var name = request.payload.name;
                var code = request.payload.code;
                var hours = request.payload.hours;
                var level_id = request.payload.level_id;

                if (!id ||!plan_id || !teacher_id || !name || !code || !hours || !level_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "id":id,
                    "plan_id": plan_id,
                    "teacher_id": teacher_id,
                    "name": name,
                    "code": code,
                    "hours": hours,
                    "level_id": level_id
                };
                education_api.update_lesson(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询学习任务列表
        {
            method: "GET",
            path: '/get_learning_tasks',
            handler: function(request, reply) {
                education_api.get_learning_tasks(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询学习任务
        {
            method: "GET",
            path: '/search_task_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                education_api.search_task_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //学习习任务删除
        {
            method: "POST",
            path: '/delete_task',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_task(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存学习任务
        {
            method: "POST",
            path: '/save_learning_task',
            handler: function(request, reply) {
                var student_id = request.payload.student_id;
				var class_id = request.payload.class_id;
				var plan_id = request.payload.plan_id;
				var lesson_id = request.payload.lesson_id;
				var level_id = request.payload.level_id;
				var total_hours = request.payload.total_hours;

				if (!student_id || !class_id || !plan_id || !level_id || !lesson_id || !total_hours) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "student_id": student_id,
                    "class_id": class_id,
                    "plan_id": plan_id,
                    "lesson_id": lesson_id,
                    "total_hours": total_hours,
                    "level_id": level_id
                };
                education_api.save_learning_task(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新学习任务
        {
            method: "POST",
            path: '/update_learning_task',
            handler: function(request, reply) {
                var id = request.payload.id;
				var current_hours = request.payload.current_hours;
				var lesson_id = request.payload.lesson_id;

                if (!id ||!current_hours || !lesson_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "id":id,
                    "current_hours": current_hours,
                    "lesson_id": lesson_id
                };
                education_api.update_learning_task(data,function(err,rows){
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
