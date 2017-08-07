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
                    {icon:"fa fa-plus-square fa-fw",navname:"教师详情",a:"teacher_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加教师",a:"add_teacher",snav:[]},
                    
                    {icon:"fa fa-building-o fa-fw",navname:"班级列表",a:"index",snav:[]},
                    {icon:"fa fa-user-plus fa-fw",navname:"班级学员列表",a:"add_class_student",snav:[]},
                    {icon:"fa fa-bookmark fa-fw",navname:"班级详情",a:"class_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加班级",a:"add_class",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"科目列表",a:"lessons_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加科目",a:"add_lessons",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"科目详情",a:"lesson_view",snav:[]},
                    
                    {icon:"fa fa-book fa-fw",navname:"计划列表",a:"plan_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加计划",a:"add_plan",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"计划详情",a:"plan_view",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"回访列表",a:"feedbacks_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"回访详情",a:"feedbacks_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加回访",a:"add_feedbacks",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"学习记录列表",a:"record_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"学习记录详情",a:"record_view",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"学习任务列表",a:"task_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加学习任务",a:"add_lessons",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"学习任务详情",a:"task_view",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"年级列表",a:"grade_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加年级",a:"add_grade",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"年级详情",a:"grade_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"老师类型",a:"teacher_type_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加老师类型",a:"add_teacher_type",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"老师类型详情",a:"teacher_type_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"考试信息列表",a:"exam_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"考试信息详情",a:"exam_view",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"成绩列表",a:"exam_record_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加成绩",a:"add_exam_record",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"成绩详情",a:"exam_record_view",snav:[]},
                    
                    {icon:"fa fa-plus-square fa-fw",navname:"课程表详情",a:"course_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"教室列表",a:"classroom_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加教室",a:"add_classroom",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"教室详情",a:"classroom_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"课程时段列表",a:"timetable_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"添加课程时段",a:"add_timetable",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"课程时段修改",a:"timetable_view",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"升转班列表",a:"change_class_list",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"升转班添加",a:"add_change_class",snav:[]},
                    {icon:"fa fa-plus-square fa-fw",navname:"升转班查看",a:"change_class_view",snav:[]},
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
