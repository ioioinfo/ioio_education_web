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
      // 初始化一个空对象
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
  }
  handleClick(e){
    var time1 = $(".time_val1").val();
    var time2 = $(".time_val2").val();
    $(".course_time_infor").append("<p class='time_style' onClick=\"remove(this)\">"+time1+"<span class='time_style_line'>"+"</span>"+time2+"</p>");
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
