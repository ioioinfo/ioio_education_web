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
           url: "/search_learning_record_byId",
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
              var hours = data.rows[0].hours;
              var starting_date = data.rows[0].starting_date;
              var end_date = data.rows[0].end_date;
              $("#hours").val(hours);
              $("#starting_date").val(starting_date);
              $("#end_date").val(end_date);

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
                <div className="weui-cell__hd"><label className="weui-label">开始时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="starting_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">结束时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="end_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">时长(H)</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="hours"/>
                </div>
            </div>

            <div className="student_view_button_xiugai">
              <span className="weui-btn weui-btn_primary">保 存</span>
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
