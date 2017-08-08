var React = require('react');
var ReactDOM = require('react-dom');


var AdminLeft = require('nav');

class AdminIndex extends React.Component {
  render() {
    return (
      <div className="admin_index">
        <AdminLeft/>
        <AdminRight/>
      </div>
    );
  }
};



// 右边
class AdminRight extends React.Component {
  constructor(props) {
      super(props);
      // 初始化一个空对象
      this.handleClick=this.handleClick.bind(this);
      this.state={teacherItem:[],masterItem:[],subjectItem:[],classItem:[],classroomsItem:[]};
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");

          $.ajax({
                 url: "/get_grades",
                 dataType: 'json',
                 type: 'GET',
                 data:{},
                 success: function(data) {
                  if(data.success){
                    this.setState({levelItem:data.rows});
                  }

                 }.bind(this),
                 error: function(xhr, status, err) {
                 }.bind(this)
            });

            // 班级
          $.ajax({
                 url: "/get_classes",
                 dataType: 'json',
                 type: 'GET',
                 data:{},
                 success: function(data) {
                  if(data.success){
                    this.setState({classItem:data.rows});
                  }

                 }.bind(this),
                 error: function(xhr, status, err) {
                 }.bind(this)
            });

            $.ajax({
                   url: "/get_teachers",
                   dataType: 'json',
                   type: 'GET',
                   data:{},
                   success: function(data) {
                    if(data.success){
                      this.setState({teacherItem:data.rows});
                    }

                   }.bind(this),
                   error: function(xhr, status, err) {
                   }.bind(this)
              });

              $.ajax({
                     url: "/get_subjects",
                     dataType: 'json',
                     type: 'GET',
                     data:{},
                     success: function(data) {
                      if(data.success){
                        this.setState({subjectItem:data.rows});
                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });
              $.ajax({
                     url: "/get_classrooms",
                     dataType: 'json',
                     type: 'GET',
                     data:{},
                     success: function(data) {
                      if(data.success){
                        this.setState({classroomsItem:data.rows});
                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });



  }
  handleClick(e){
    var plan = new Object();
    var class_id = $("#class_id").val();
    var classroom_id = $("#classroom_id").val();
    var name = $("#name").val();
    var code = $("#code").val();
    var hours = $("#hours").val();
    var teacher_id = $("#teacher_id").val();
    var subject_id = $("#subject_id").val();
    var starting_date = $("#starting_date").val();
    var end_date = $("#end_date").val();
    var assistant_id = '1';
    plan.class_id=class_id;
    plan.name=name;
    plan.classroom_id=classroom_id;
    plan.code=code;
    plan.hours=hours;
    plan.teacher_id=teacher_id;
    plan.subject_id=subject_id;
    plan.starting_date=starting_date;
    plan.end_date=end_date;
    plan.assistant_id=assistant_id;
    $.ajax({
        url: "/save_education_plan",
        dataType: 'json',
        type: 'POST',
        data: {'plan':JSON.stringify(plan)},
        success: function(data) {
            if (data.success) {
                alert("添加成功！");
            }else {
                alert("添加失败！"+data.message);
            }
        }.bind(this),
        error: function(xhr, status, err) {
        }.bind(this)
    });

  }
  render() {
    return (
      <div className="admin_right col-xs-12 col-sm-8 col-md-10 overflow_auto">
        <AdminRightTop/>

        <div className="student_view_wrap">
          <div className="student_view_infor">

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">编号</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="code"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">开班时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input" type="text" id="starting_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">放假时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="end_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">班级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="class_id">
                  <option value="">请选择班级</option>
                  {this.state.classItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">教室</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="classroom_id">
                  <option value="">请选择教室</option>
                  {this.state.classroomsItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">老师</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="teacher_id">
                  <option value="">请选择老师</option>
                  {this.state.teacherItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">科目</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="subject_id">
                  <option value="">请选择课程</option>
                  {this.state.subjectItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">计划名字</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="name"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">课时</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="hours"/>
                </div>
            </div>

            <div className="student_view_button_xiugai">
              <span className="weui-btn weui-btn_primary" onClick={this.handleClick}>保 存</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

// 右边 头部
class AdminRightTop extends React.Component {
  render() {
    return (
      <div className="admin_index_top ">
        <a className="admin_index_header"><i className="fa fa-user-o fa-fw"></i>&nbsp; 请登录</a>
        <a className="admin_index_exit"><i className="fa fa-power-off fa-fw"></i>&nbsp; 退出</a>
      </div>
    );
  }
};


// 返回到页面
ReactDOM.render(
    <AdminIndex/>,
    document.getElementById("admin")
);
