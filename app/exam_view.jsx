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
      this.state={lessonItem:[],classItem:[],levelItem:[],item:{}};
      this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
      // 年龄
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
        // 课程
        $.ajax({
               url: "/get_lessons",
               dataType: 'json',
               type: 'GET',
               data:{},
               success: function(data) {
                if(data.success){
                  this.setState({lessonItem:data.rows});
                }

               }.bind(this),
               error: function(xhr, status, err) {
               }.bind(this)
          });

          $.ajax({
                 url: "/search_exam_byId",
                 dataType: 'json',
                 type: 'GET',
                 data:{'id':'1'},
                 success: function(data) {
                  if(data.success){
                    var name = data.rows[0].name;
                    var level_id = data.rows[0].level_id;
                    var class_id = data.rows[0].class_id;
                    var lesson_id = data.rows[0].lesson_id;
                    var state = data.rows[0].state;
                    var starting_date = data.rows[0].starting_date;
                    var end_date = data.rows[0].end_date;
                    $("#name").val(name);
                    $("#level_id").val(level_id);
                    $("#grade_leader").val(class_id);
                    $("#lesson_id").val(lesson_id);
                    $("#state").val(state);
                    $("#starting_date").val(starting_date);
                    $("#end_date").val(end_date);
                    this.setState({item:data.rows[0]});
                  }

                 }.bind(this),
                 error: function(xhr, status, err) {
                 }.bind(this)
            });
  }
  handleClick(e){
    var exam = new Object();
    var id = this.state.item.id;
    var code = this.state.item.code;
    var name = $("#name").val();
    var level_id = $("#level_id").val();
    var class_id = $("#grade_leader").val();
    var lesson_id = $("#lesson_id").val();
    var state = $("#state").val();
    var starting_date = $("#starting_date").val();
    var end_date = $("#end_date").val();
    exam.id=id;
    exam.code=code;
    exam.name=name;
    exam.level_id=level_id;
    exam.class_id=class_id;
    exam.lesson_id=lesson_id;
    exam.state=state;
    exam.starting_date=starting_date;
    exam.end_date=end_date;
    $.ajax({
        url: "/update_exam",
        dataType: 'json',
        type: 'POST',
        data: {'exam':JSON.stringify(exam)},
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
                <div className="weui-cell__hd"><label className="weui-label">年级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="level_id">
                  {this.state.levelItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">班级</label></div>
                <div className="weui-cell__bd student_view_input_style" >
                  <select className="weui-input " type="text" placeholder="" id="grade_leader">
                  {this.state.classItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">科目</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="name"/>
                </div>
            </div>


            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">课程</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="lesson_id">
                  {this.state.lessonItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="state"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">开始时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input" type="text" id="starting_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">结束时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="end_date"/>
                </div>
            </div>

            <div className="student_view_button_xiugai">
              <span className="weui-btn weui-btn_primary" onClick={this.handleClick}>修 改</span>
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
