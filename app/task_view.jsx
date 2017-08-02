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
      this.state={item:{}, planItem:[],teacherItem:[],levelItem:[]};
  }

  componentDidMount() {
      var plan_id = "";
      var lesson_id = "";
      var level_id = "";
      var student_id = "";
      var class_id = "";
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");

        $.ajax({
           url: "/search_task_byId",
           dataType: 'json',
           type: 'GET',
           data:{'id':id},
           success: function(data) {
            if(data.success){
              plan_id = data.rows[0].plan_id;
              student_id = data.rows[0].student_id;
              level_id = data.rows[0].level_id;
              class_id = data.rows[0].class_id;
              lesson_id = data.rows[0].lesson_id;
              var state = data.rows[0].state;
              var progress_rate = data.rows[0].progress_rate;
              var current_hours = data.rows[0].current_hours;
              var total_hours = data.rows[0].total_hours;
              $("#state").val(state);
              $("#progress_rate").val(progress_rate);
              $("#current_hours").val(current_hours);
              $("#total_hours").val(total_hours);

              // 年级
              $.ajax({
                     url: "/search_grade_byId",
                     dataType: 'json',
                     type: 'GET',
                     data:{'id':level_id},
                     success: function(data) {
                      if(data.success){
                        $("#level_id").val(data.rows[0].name);
                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });
              // 课程
              $.ajax({
                     url: "/search_lesson_byId",
                     dataType: 'json',
                     type: 'GET',
                     data:{'id':lesson_id},
                     success: function(data) {
                      if(data.success){
                        $("#lesson_id").val(data.rows[0].name);
                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });
              // 学生
              $.ajax({
                     url: "/search_student_byId",
                     dataType: 'json',
                     type: 'GET',
                     data:{'id':student_id},
                     success: function(data) {
                      if(data.success){
                        if(data.rows.length>0){
                          $("#student_id").val(data.rows[0].name);
                        }else {
                          $("#student_id").val();
                        }

                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });
              // 计划、
              $.ajax({
                     url: "/search_plan_byId",
                     dataType: 'json',
                     type: 'GET',
                     data:{'id':plan_id},
                     success: function(data) {
                      if(data.success){
                        $("#plan_id").val(data.rows[0].name);
                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });
              // 班级
              $.ajax({
                     url: "/search_class_byId",
                     dataType: 'json',
                     type: 'GET',
                     data:{'id':class_id},
                     success: function(data) {
                      if(data.success){
                        $("#class_id").val(data.rows[0].name);
                      }

                     }.bind(this),
                     error: function(xhr, status, err) {
                     }.bind(this)
                });
              this.setState({item:data.rows[0]});
            }

           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
        });



  }
  handleClick(e){
    var id = this.state.item.id;
    var name = $("#name").val();
    var code = $("#code").val();
    var level_id = $("#level_id").val();
    var teacher_id = $("#teacher_id").val();
    var plan_id = $("#plan_id").val();
    var hours = $("#hours").val();

    $.ajax({
        url: "/update_lesson",
        dataType: 'json',
        type: 'POST',
        data: {"id":id,"name":name,"code":code,"level_id":level_id,"hours":hours,"plan_id":plan_id,"teacher_id":teacher_id},
        success: function(data) {
            if (data.success) {
                alert("添加成功！");
            }else {
                alert("添加失败！");
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
                <div className="weui-cell__hd"><label className="weui-label">课程</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="lesson_id"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">年级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input " type="text" placeholder="" id="level_id"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">班级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input " type="text" placeholder="" id="class_id"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">计划</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input " type="text" placeholder="" id="plan_id"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">学生</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input " type="text" placeholder="" id="student_id"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input " type="text" placeholder="" id="state"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">任务进度(H)</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="progress_rate"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">已完成(H)</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="current_hours"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">总时长(H)</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="total_hours"/>
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
