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

module.exports = {
    entry: {
        index: './app/index.jsx',
        class_view: './app/class_view.jsx',
        student_list: './app/student_list.jsx',
        class_student_list: './app/class_student_list.jsx',
        teacher_list: './app/teacher_list.jsx',
        teacher_view: './app/teacher_view.jsx',
        plan_list: './app/plan_list.jsx',
        add_plan: './app/add_plan.jsx',
        plan_view: './app/plan_view.jsx',
        student_view: './app/student_view.jsx',
        add_student: './app/add_student.jsx',
        add_class: './app/add_class.jsx',
        add_teacher: './app/add_teacher.jsx',
        lessons_list: './app/lessons_list.jsx',
        add_lessons: './app/add_lessons.jsx',
        lesson_view: './app/lesson_view.jsx',
        task_list: './app/task_list.jsx',
        add_task: './app/add_task.jsx',
        task_view: './app/task_view.jsx',
        record_list: './app/record_list.jsx',
        record_view: './app/record_view.jsx',
        feedbacks_list: './app/feedbacks_list.jsx',
        add_feedbacks: './app/add_feedbacks.jsx',
        feedbacks_view: './app/feedbacks_view.jsx',
        grade_list: './app/grade_list.jsx',
        add_grade: './app/add_grade.jsx',
        grade_view: './app/grade_view.jsx',
        teacher_type_list: './app/teacher_type_list.jsx',
        add_teacher_type: './app/add_teacher_type.jsx',
        teacher_type_view: './app/teacher_type_view.jsx',
        exam_list: './app/exam_list.jsx',
        add_exam: './app/add_exam.jsx',
        exam_view: './app/exam_view.jsx',
        exam_record_list: './app/exam_record_list.jsx',
        add_exam_record: './app/add_exam_record.jsx',
        exam_record_view: './app/exam_record_view.jsx',
        exam_record_view: './app/exam_record_view.jsx',
        course_time:'./app/course_time.jsx',
        course_view:'./app/course_view.jsx',
        classrome_list:'./app/classrome_list.jsx',
        add_classrome:'./app/add_classrome.jsx',
        classrome_view:'./app/classrome_view.jsx',
        timetable_list:'./app/timetable_list.jsx',
        add_timetable:'./app/add_timetable.jsx',
        timetable_view:'./app/timetable_view.jsx',
    },
    output: {
        path: __dirname,
        filename: './public/js/app/[name].js'
    },
    resolve: {
        modules: [__dirname, '../node_modules','components'],
        alias: {

        },
        extensions: ['.js','.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
   }
};
