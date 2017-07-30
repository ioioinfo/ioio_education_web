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
        play_list: './app/play_list.jsx',
        student_view: './app/student_view.jsx',
        add_student: './app/add_student.jsx',
        add_class: './app/add_class.jsx',
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
