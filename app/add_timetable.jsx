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
      this.handleClick=this.handleClick.bind(this);
      this.handleClick1=this.handleClick1.bind(this);
      // 初始化一个空对象
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
  }
  handleClick(e){
    var time1 = $(".time_val1").val();
    var time2 = $(".time_val2").val();
    var timeObject = new Object();
    timeObject.time1=time1;
    timeObject.time2=time2;
    time.push(timeObject);
    $(".course_time_infor").append("<p class='time_style' onClick=\"remove(this)\">"+time1+"<span class='time_style_line'>"+"</span>"+time2+"</p>");
  }
  handleClick1(e){
    var state = true;
    for (var i = 0; i < time.length; i++) {
      var starting_time = time[i].time1;
      var end_time = time[i].time2;
      $.ajax({
          url: "/save_timetable",
          dataType: 'json',
          type: 'POST',
          data: {'starting_time':starting_time,'end_time':end_time,'name':'n'},
          success: function(data) {
              if (data.success) {
              }else {
                state=false;
              }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });

    }
    if(!state){
      alert("添加失败");
    }else {
      alert("添加成功");
    }
  }

  render() {
    return (
      <div className="admin_right col-xs-12 col-sm-8 col-md-10 overflow_auto">
        <AdminRightTop/>

        <div className="course_time_wrap">
          <div>
            <span className="course_time_span">
              <input className="datetime1 course_time_input time_val1" type="text" />
            </span>
            -
            <span className="course_time_span">
              <input className="datetime1 course_time_input time_val2" type="text" />
            </span>
            <button className="course_time_add_button" onClick={this.handleClick}>添加</button>
          </div>
          <div className="course_time_infor">

          </div>
          <div className="student_view_button_xiugai">
            <span className="weui-btn weui-btn_primary" onClick={this.handleClick1}>创 建</span>
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
