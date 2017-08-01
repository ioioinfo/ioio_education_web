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
                return reply.view("class_view");
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
            path: '/plan_list',
            handler: function(request, reply) {
                return reply.view("plan_list");
            },
        },
        //添加计划
        {
            method: 'GET',
            path: '/add_plan',
            handler: function(request, reply) {
                return reply.view("add_plan");
            },
        },

        //计划详情
        {
            method: 'GET',
            path: '/plan_view',
            handler: function(request, reply) {
                return reply.view("plan_view");
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
                return reply.view("student_view");
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

        //添加班级
        {
            method: 'GET',
            path: '/teacher_view',
            handler: function(request, reply) {
                return reply.view("teacher_view");
            },
        },

        //添加班级
        {
            method: 'GET',
            path: '/add_teacher',
            handler: function(request, reply) {
                return reply.view("add_teacher");
            },
        },

        //课程列表
        {
            method: 'GET',
            path: '/lessons_list',
            handler: function(request, reply) {
                return reply.view("lessons_list");
            },
        },

        //添加课程
        {
            method: 'GET',
            path: '/add_lessons',
            handler: function(request, reply) {
                return reply.view("add_lessons");
            },
        },

        //课程详情
        {
            method: 'GET',
            path: '/lesson_view',
            handler: function(request, reply) {
                return reply.view("lesson_view");
            },
        },

        //学习任务列表
        {
            method: 'GET',
            path: '/task_list',
            handler: function(request, reply) {
                return reply.view("task_list");
            },
        },

        //学习任务列表
        {
            method: 'GET',
            path: '/add_task',
            handler: function(request, reply) {
                return reply.view("add_task");
            },
        },

        //学习任务详情
        {
            method: 'GET',
            path: '/task_view',
            handler: function(request, reply) {
                return reply.view("task_view");
            },
        },

        //学习记录列表
        {
            method: 'GET',
            path: '/record_list',
            handler: function(request, reply) {
                return reply.view("record_list");
            },
        },

        //学习记录详情
        {
            method: 'GET',
            path: '/record_view',
            handler: function(request, reply) {
                return reply.view("record_view");
            },
        },


          //回访记录列表
          {
              method: 'GET',
              path: '/feedbacks_list',
              handler: function(request, reply) {
                  return reply.view("feedbacks_list");
              },
          },

          //添加回访
          {
              method: 'GET',
              path: '/add_feedbacks',
              handler: function(request, reply) {
                  return reply.view("add_feedbacks");
              },
          },

          //添加回访
          {
              method: 'GET',
              path: '/feedbacks_view',
              handler: function(request, reply) {
                  return reply.view("feedbacks_view");
              },
          },

          //年级列表
          {
              method: 'GET',
              path: '/grade_list',
              handler: function(request, reply) {
                  return reply.view("grade_list");
              },
          },

          //年级添加
          {
              method: 'GET',
              path: '/add_grade',
              handler: function(request, reply) {
                  return reply.view("add_grade");
              },
          },

          //年级详情
          {
              method: 'GET',
              path: '/grade_view',
              handler: function(request, reply) {
                  return reply.view("grade_view");
              },
          },

          //老师类型列表
          {
              method: 'GET',
              path: '/teacher_type_list',
              handler: function(request, reply) {
                  return reply.view("teacher_type_list");
              },
          },

          //添加老师类型
          {
              method: 'GET',
              path: '/add_teacher_type',
              handler: function(request, reply) {
                  return reply.view("add_teacher_type");
              },
          },

          //老师类型详情
          {
              method: 'GET',
              path: '/teacher_type_view',
              handler: function(request, reply) {
                  return reply.view("teacher_type_view");
              },
          },

          //考试信息列表
          {
              method: 'GET',
              path: '/exam_list',
              handler: function(request, reply) {
                  return reply.view("exam_list");
              },
          },

          //考试信息添加
          {
              method: 'GET',
              path: '/add_exam',
              handler: function(request, reply) {
                  return reply.view("add_exam");
              },
          },

          //考试信息详情
          {
              method: 'GET',
              path: '/exam_view',
              handler: function(request, reply) {
                  return reply.view("exam_view");
              },
          },

          //考试成绩列表
          {
              method: 'GET',
              path: '/exam_record_list',
              handler: function(request, reply) {
                  return reply.view("exam_record_list");
              },
          },

          //添加考试成绩
          {
              method: 'GET',
              path: '/add_exam_record',
              handler: function(request, reply) {
                  return reply.view("add_exam_record");
              },
          },

          //考试成绩详情
          {
              method: 'GET',
              path: '/exam_record_view',
              handler: function(request, reply) {
                  return reply.view("exam_record_view");
              },
          },




    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
