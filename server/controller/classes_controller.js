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
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
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

                // clas = {
                //     "plan_id":1,
                //     "name":"小二英语",
                //     "code":"008",
                //     "state":"未开始",
                //     "starting_date":"2017-07-30",
                //     "end_date":"2017-07-30",
                //     "class_master":"何仙姑",
                //     "master_id":1,
                //     "remarks":"重点补习班",
                //     "level_id":1
                // }

                if (!clas.classroom_id || !clas.name || !clas.code ||!clas.state || !clas.starting_date || !clas.end_date || !clas.class_master
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
        //班级信息修改
        {
            method: "POST",
            path: '/update_class',
            handler: function(request, reply) {
                var clas = request.payload.clas;
                clas = JSON.parse(clas);

                // clas = {
                //     "plan_id":1,
                //     "name":"小二英语",
                //     "code":"008",
                //     "state":"未开始",
                //     "starting_date":"2017-07-30",
                //     "end_date":"2017-07-30",
                //     "class_master":"何仙姑",
                //     "master_id":1,
                //     "remarks":"重点补习班",
                //     "level_id":1,
                //     "id":1
                // }

                if (!clas.classroom_id || !clas.name || !clas.code ||!clas.state || !clas.starting_date || !clas.end_date || !clas.class_master
                || !clas.master_id || !clas.remarks || !clas.level_id || !clas.id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }
                var data = {
                    "clas" : JSON.stringify(clas)
                };
                education_api.update_class(data,function(err,rows){
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
        //id查询学员信息
        {
            method: "GET",
            path: '/search_student_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
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
        //id查询课程信息
        {
            method: "GET",
            path: '/search_lesson_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
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
                var name = request.payload.name;
				var code = request.payload.code;

				if (!name || !code) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "name": name,
                    "code": code
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
				var name = request.payload.name;
				var code = request.payload.code;

				if (!id || !name || !code ) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "id":id,
                    "name": name,
                    "code": code
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
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_task_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //学习任务删除
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
        //查询教学计划列表
        {
            method: "GET",
            path: '/get_lesson_plans',
            handler: function(request, reply) {
                education_api.get_lesson_plans(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询教学计划
        {
            method: "GET",
            path: '/search_plan_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_plan_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //教学计划删除
        {
            method: "POST",
            path: '/delete_plan',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_plan(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存教学计划
        {
            method: "POST",
            path: '/save_plan',
            handler: function(request, reply) {
                var name = request.payload.name;
                var code = request.payload.code;
                var level_id = request.payload.level_id;

                if (!name || !code || !level_id ) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "name": name,
                    "code": code,
                    "level_id": level_id
                };
                education_api.save_plan(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新教学计划
        {
            method: "POST",
            path: '/update_plan',
            handler: function(request, reply) {
                var id = request.payload.id;
                var name = request.payload.name;
                var code = request.payload.code;
                var level_id = request.payload.level_id;
                if (!id||!name||!code||!level_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "id":id,
                    "name": name,
                    "level_id": level_id,
                    "code": code
                };
                education_api.update_plan(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询年级列表
        {
            method: "GET",
            path: '/get_grades',
            handler: function(request, reply) {
                education_api.get_grades(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询年级
        {
            method: "GET",
            path: '/search_grade_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_grade_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //年级删除
        {
            method: "POST",
            path: '/delete_grade',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_grade(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存年级
        {
            method: "POST",
            path: '/save_grade',
            handler: function(request, reply) {
                var name = request.payload.name;
				var code = request.payload.code;
				var grade_leader = request.payload.grade_leader;
				var leader_id = request.payload.leader_id;
				var state = request.payload.state;
				var remark = request.payload.remark;

				if (!name || !code || !grade_leader || !leader_id || !state || !remark) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "name": name,
                    "code": code,
                    "grade_leader":grade_leader,
                    "leader_id":leader_id,
                    "state":state,
                    "remark":remark
                };
                education_api.save_grade(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新年级
        {
            method: "POST",
            path: '/update_grade',
            handler: function(request, reply) {
                var id = request.payload.id;
                var name = request.payload.name;
				var code = request.payload.code;
				var grade_leader = request.payload.grade_leader;
				var leader_id = request.payload.leader_id;
				var state = request.payload.state;
				var remark = request.payload.remark;

				if (!name || !code || !grade_leader || !leader_id || !state || !remark || !id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "id":id,
                    "name": name,
                    "code": code,
                    "grade_leader":grade_leader,
                    "leader_id":leader_id,
                    "state":state,
                    "remark":remark
                };
                education_api.update_grade(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询老师列表
        {
            method: "GET",
            path: '/get_teachers',
            handler: function(request, reply) {
                education_api.get_teachers(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询老师
        {
            method: "GET",
            path: '/search_teacher_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_teacher_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除老师
        {
            method: "POST",
            path: '/delete_teacher',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_teacher(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存老师
        {
            method: "POST",
            path: '/save_teacher',
            handler: function(request, reply) {
                var teachers = request.payload.teachers;
                teachers = JSON.parse(teachers);
                if (teachers.length==0) {
                    return reply({"success":false,"message":"teachers wrong","service_info":service_info});
                }

                var data = {"teachers":JSON.stringify(teachers)};
                education_api.save_teacher(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新年老师
        {
            method: "POST",
            path: '/update_teacher',
            handler: function(request, reply) {
                var teacher = request.payload.teacher;
                teacher = JSON.parse(teacher);
                if (!teacher.id||!teacher.name|| !teacher.code|| !teacher.age|| !teacher.sex|| !teacher.phone|| !teacher.state||!teacher.address|| !teacher.province|| !teacher.city|| !teacher.district|| !teacher.photo|| !teacher.type_id || !teacher.level) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {"teacher":JSON.stringify(teacher)};
                education_api.update_teacher(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询老师分类
        {
            method: "GET",
            path: '/get_teachers_types',
            handler: function(request, reply) {
                education_api.get_teachers_types(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询老师分类
        {
            method: "GET",
            path: '/search_type_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                education_api.search_type_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除老师分类
        {
            method: "POST",
            path: '/delete_teachers_type',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id wrong","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_teachers_type(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存老师分类
        {
            method: "POST",
            path: '/save_teachers_type',
            handler: function(request, reply) {
                var name = request.payload.name;
				var code = request.payload.code;
				var remark = request.payload.remark;

				if (!name || !code || !remark) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "name":name,
                    "code":code,
                    "remark":remark
                };
                education_api.save_teachers_type(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新老师分类
        {
            method: "POST",
            path: '/update_teachers_type',
            handler: function(request, reply) {
                var id = request.payload.id;
                var name = request.payload.name;
				var code = request.payload.code;
				var remark = request.payload.remark;

				if (!name || !code || !remark || !id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "id":id,
                    "name":name,
                    "code":code,
                    "remark":remark
                };
                education_api.update_teachers_type(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //查询可以添加到班级的学员
        {
            method: "GET",
            path: '/add_by_classId',
            handler: function(request, reply) {
                var class_id = request.query.class_id;
                if (!class_id) {
                    return reply({"success":false,"message":"class_id null"});
                }
                education_api.add_by_classId(class_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //班级添加学员
        {
            method: "POST",
            path: '/add_students',
            handler: function(request, reply) {
                var class_id = request.payload.class_id;
                var student_ids = request.payload.student_ids;
                if (!class_id || !student_ids) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }
                var data = {
                    "class_id" : class_id,
                    "student_ids" :student_ids
                };
                education_api.add_students(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除班级
        {
            method: "POST",
            path: '/delete_class_student',
            handler: function(request, reply) {
                var class_id = request.payload.class_id;
                var student_ids = request.payload.student_ids;
                if (!class_id || !student_ids) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }
                var data = {
                    "class_id" : class_id,
                    "student_ids" :student_ids
                };
                education_api.delete_class_student(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //考试信息列表
        {
            method: "GET",
            path: '/get_exams',
            handler: function(request, reply) {
                education_api.get_exams(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存考试
        {
            method: "POST",
            path: '/save_exam',
            handler: function(request, reply) {
                var exam = request.payload.exam;
                exam = JSON.parse(exam);

				if (!exam.name || !exam.code || !exam.level_id || !exam.class_id
                || !exam.lesson_id || !exam.state || !exam.starting_date || !exam.end_date) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "exam":JSON.stringify(exam)
                };
                education_api.save_exam(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除考试
        {
            method: "POST",
            path: '/delete_exam',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_exam(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询考试
        {
            method: "GET",
            path: '/search_exam_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
					return reply({"success":false,"message":"id null","service_info":service_info});
				}
                education_api.search_exam_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新考试
        {
            method: "POST",
            path: '/update_exam',
            handler: function(request, reply) {
                var exam = request.payload.exam;
                exam = JSON.parse(exam);

				if (!exam.name || !exam.code || !exam.level_id || !exam.class_id
                || !exam.lesson_id || !exam.state || !exam.starting_date || !exam.end_date || !exam.id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "exam":JSON.stringify(exam)
                };
                education_api.update_exam(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //考试记录信息列表
        {
            method: "GET",
            path: '/get_exams_records',
            handler: function(request, reply) {
                education_api.get_exams_records(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存考试记录
        {
            method: "POST",
            path: '/save_exam_record',
            handler: function(request, reply) {
                var exam_record = request.payload.exam_record;
                exam_record = JSON.parse(exam_record);

                if (!exam_record.exam_id || !exam_record.student_id || !exam_record.state || !exam_record.score) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "exam_record":JSON.stringify(exam_record)
                };
                education_api.save_exam_record(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除考试记录
        {
            method: "POST",
            path: '/delete_exam_record',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_exam_record(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询考试记录
        {
            method: "GET",
            path: '/search_record_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
					return reply({"success":false,"message":"id null","service_info":service_info});
				}
                education_api.search_record_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询考试记录
        {
            method: "GET",
            path: '/search_record_by_student',
            handler: function(request, reply) {
                var student_id = request.query.student_id;
				if (!student_id) {
					return reply({"success":false,"message":"student_id null","service_info":service_info});
				}
                education_api.search_record_by_student(student_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新考试记录
        {
            method: "POST",
            path: '/update_exam_record',
            handler: function(request, reply) {
                var exam_record = request.payload.exam_record;
                exam_record = JSON.parse(exam_record);

				if (!exam_record.exam_id || !exam_record.student_id || !exam_record.state || !exam_record.score || !exam_record.id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "exam_record":JSON.stringify(exam_record)
                };
                education_api.update_exam_record(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //学习记录信息列表
        {
            method: "GET",
            path: '/get_learning_records',
            handler: function(request, reply) {
                education_api.get_learning_records(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询学习记录
        {
            method: "GET",
            path: '/search_learning_record_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
					return reply({"success":false,"message":"id null","service_info":service_info});
				}
                education_api.search_learning_record_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存学习记录
        {
            method: "POST",
            path: '/save_learning_record',
            handler: function(request, reply) {
                var learning_record = request.payload.learning_record;
				learning_record = JSON.parse(learning_record);

                if (!learning_record.student_id || !learning_record.class_id || !learning_record.plan_id || !learning_record.level_id || !learning_record.lesson_id || !learning_record.hours || !learning_record.starting_date || !learning_record.end_date) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "learning_record":JSON.stringify(learning_record)
                };
                education_api.save_learning_record(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //反馈信息列表
        {
            method: "GET",
            path: '/get_feedbacks',
            handler: function(request, reply) {
                education_api.get_feedbacks(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //id查询反馈信息
        {
            method: "GET",
            path: '/search_feedback_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_feedback_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除反馈
        {
            method: "POST",
            path: '/delete_feedback',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_feedback(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存反馈
        {
            method: "POST",
            path: '/save_feedback',
            handler: function(request, reply) {
                var feedback = request.payload.feedback;
                feedback = JSON.parse(feedback);
                if (!feedback.student_id || !feedback.student_name ||
    			!feedback.feedback_person || !feedback.feedback_content ||
    			!feedback.state || !feedback.feedback_date) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "feedback":JSON.stringify(feedback)
                };
                education_api.save_feedback(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新反馈
        {
            method: "POST",
            path: '/update_feedback',
            handler: function(request, reply) {
                var feedback = request.payload.feedback;
                feedback = JSON.parse(feedback);
                if (!feedback.student_id || !feedback.student_name ||
    			!feedback.feedback_person || !feedback.feedback_content ||
    			!feedback.state || !feedback.feedback_date || !feedback.id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "feedback":JSON.stringify(feedback)
                };
                education_api.update_feedback(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //新教学计划信息列表
        {
            method: "GET",
            path: '/get_education_plans',
            handler: function(request, reply) {
                education_api.get_education_plans(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //新教学计划id查询
        {
            method: "GET",
            path: '/search_education_plan_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_education_plan_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除新教学计划
        {
            method: "POST",
            path: '/delete_education_plan',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_education_plan(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存新教学计划
        {
            method: "POST",
            path: '/save_education_plan',
            handler: function(request, reply) {
                var plan = request.payload.plan;
                plan = JSON.parse(plan);
                if (!plan.class_id|| !plan.name || !plan.code|| !plan.hours|| !plan.teacher_id|| !plan.assistant_id ||!plan.subject_id||!plan.starting_date|| !plan.end_date||!plan.classroom_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "plan":JSON.stringify(plan)
                };
                education_api.save_education_plan(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新反馈
        {
            method: "POST",
            path: '/update_education_plan',
            handler: function(request, reply) {
                var plan = request.payload.plan;
                plan = JSON.parse(plan);

                if (!plan.class_id|| !plan.name || !plan.code|| !plan.hours|| !plan.teacher_id|| !plan.assistant_id ||!plan.subject_id||!plan.starting_date|| !plan.end_date|| !plan.id ||!plan.classroom_id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "plan":JSON.stringify(plan)
                };
                education_api.update_education_plan(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //学科信息列表
        {
            method: "GET",
            path: '/get_subjects',
            handler: function(request, reply) {
                education_api.get_subjects(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //学科id查询
        {
            method: "GET",
            path: '/search_subject_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_subject_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除学科
        {
            method: "POST",
            path: '/delete_subject',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_subject(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存学科
        {
            method: "POST",
            path: '/save_subject',
            handler: function(request, reply) {
                var name = request.payload.name;
				var code = request.payload.code;
                if (!name||!code) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "name":name,
                    "code":code
                };
                education_api.save_subject(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新学科
        {
            method: "POST",
            path: '/update_subject',
            handler: function(request, reply) {
                var id = request.payload.id;
                var name = request.payload.name;
                var code = request.payload.code;

                if (!name || !code || !id) {
                    return reply({"success":false,"message":"params wrong","service_info":service_info});
                }

                var data = {
                    "id":id,
                    "name":name,
                    "code":code
                };
                education_api.update_subject(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //教室信息列表
        {
            method: "GET",
            path: '/get_classrooms',
            handler: function(request, reply) {
                education_api.get_classrooms(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //教室id查询
        {
            method: "GET",
            path: '/search_classroom_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_classroom_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除教室
        {
            method: "POST",
            path: '/delete_classroom',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_classroom(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存教室
        {
            method: "POST",
            path: '/save_classroom',
            handler: function(request, reply) {
                var name = request.payload.name;
				var code = request.payload.code;
				var location =  request.payload.location;

				if (!name || !code || !location) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "name":name,
                    "code":code,
                    "location":location
                };
                education_api.save_classroom(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新教室
        {
            method: "POST",
            path: '/update_classroom',
            handler: function(request, reply) {
                var id = request.payload.id;
                var name = request.payload.name;
				var code = request.payload.code;
				var location =  request.payload.location;

				if (!name || !code || !id || !location) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}


                var data = {
                    "id":id,
                    "name":name,
                    "code":code,
                    "location":location
                };
                education_api.update_classroom(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //时刻表信息列表
        {
            method: "GET",
            path: '/get_timetables',
            handler: function(request, reply) {
                education_api.get_timetables(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //时刻表id查询
        {
            method: "GET",
            path: '/search_timetable_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_timetable_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除时刻表
        {
            method: "POST",
            path: '/delete_timetable',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_timetable(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存时刻表
        {
            method: "POST",
            path: '/save_timetable',
            handler: function(request, reply) {
                var name = request.payload.name;
				var starting_time = request.payload.starting_time;
				var end_time =  request.payload.end_time;

				if (!name || !starting_time || !end_time) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "name":name,
                    "starting_time":starting_time,
                    "end_time":end_time
                };
                education_api.save_timetable(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新时刻表
        {
            method: "POST",
            path: '/update_timetable',
            handler: function(request, reply) {
                var id = request.payload.id;
                var name = request.payload.name;
				var starting_time = request.payload.starting_time;
				var end_time =  request.payload.end_time;

				if (!name || !starting_time || !end_time || !id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "id":id,
                    "name":name,
                    "starting_time":starting_time,
                    "end_time":end_time
                };
                education_api.update_timetable(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //课程表信息列表
        {
            method: "GET",
            path: '/get_schedules',
            handler: function(request, reply) {
                education_api.get_schedules(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //课程表id查询
        {
            method: "GET",
            path: '/search_schedule_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_schedule_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除课程表
        {
            method: "POST",
            path: '/delete_schedule',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_schedule(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存时刻表
        {
            method: "POST",
            path: '/save_schedule',
            handler: function(request, reply) {
                var schedule = request.payload.schedule;
				schedule = JSON.parse(schedule);

                if (!schedule.name|| !schedule.plan_id||!schedule.time_id|| !schedule.class_id|| !schedule.day) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "schedule":JSON.stringify(schedule)
                };
                education_api.save_schedule(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新时刻表
        {
            method: "POST",
            path: '/update_schedule',
            handler: function(request, reply) {
                var schedule = request.payload.schedule;
				schedule = JSON.parse(schedule);

				if (!schedule.name|| !schedule.plan_id||!schedule.time_id|| !schedule.class_id|| !schedule.day || !schedule.id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "schedule":JSON.stringify(schedule)
                };
                education_api.update_schedule(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //转升班信息列表
        {
            method: "GET",
            path: '/get_change_class_infos',
            handler: function(request, reply) {
                education_api.get_change_class_infos(function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //转升班id查询
        {
            method: "GET",
            path: '/search_change_class_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_change_class_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除转升班
        {
            method: "POST",
            path: '/delete_change_class',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id" : id
                };
                education_api.delete_change_class(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //保存转升班
        {
            method: "POST",
            path: '/save_change_class_info',
            handler: function(request, reply) {
                var change_infos = request.payload.change_infos;
                change_infos = JSON.parse(change_infos);

				if (!change_infos.class_id1 || !change_infos.class_id2 || !change_infos.student_ids.length>0 || !change_infos.type) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "change_infos":JSON.stringify(change_infos)
                };
                education_api.save_change_class_info(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //更新转升班
        {
            method: "POST",
            path: '/update_change_class_info',
            handler: function(request, reply) {
                var change_info = request.payload.change_info;
                change_info = JSON.parse(change_info);

				if (!change_info.class_id1 || !change_info.class_id2 || !change_info.student_id || !change_info.type|| !change_info.id) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}

                var data = {
                    "change_info":JSON.stringify(change_info)
                };
                education_api.update_change_class_info(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //根据班级id更新课程表
        {
            method: "POST",
            path: '/update_schedules_byClass_id',
            handler: function(request, reply) {
                var class_id = request.payload.class_id;
                var subArray = request.payload.subArray;

                var data = {
                    "subArray":subArray,
                    "class_id":class_id
                };
                education_api.update_schedules_byClass_id(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //升班
        {
            method: "POST",
            path: '/update_classAndStudents',
            handler: function(request, reply) {
                var class_id1 = request.payload.class_id1;
				var class_id2 = request.payload.class_id2;
				if (!class_id1||!class_id1) {
					return reply({"success":false,"message":"class_id null","service_info":service_info});
				}
                var data = {
                    "class_id1":class_id1,
                    "class_id2":class_id2
                };
                education_api.update_classAndStudents(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //转班
        {
            method: "POST",
            path: '/change_classAndStudents',
            handler: function(request, reply) {
                var class_id1 = request.payload.class_id1;
                var class_id2 = request.payload.class_id2;
                if (!class_id1||!class_id1) {
                    return reply({"success":false,"message":"class_id null","service_info":service_info});
                }
                var student_ids = request.payload.student_ids;
				student_ids = JSON.parse(student_ids);
                if (student_ids.length==0) {
                    return reply({"success":false,"message":"student_id null","service_info":service_info});
                }

                var data = {
                    "class_id1":class_id1,
                    "class_id2":class_id2,
                    "student_ids":JSON.stringify(student_ids)
                };
                education_api.change_classAndStudents(data,function(err,rows){
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
