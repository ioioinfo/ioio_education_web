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
      this.state={item:{}};
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
      $.ajax({
           url: "/search_timetable_byId",
           dataType: 'json',
           type: 'GET',
           data:{'id':id},
           success: function(data) {
              if(data.success){
                var time1 = data.rows[0].starting_time;
                var time2 = data.rows[0].end_time;
                $(".time_val1").val(time1);
                $(".time_val2").val(time2);

                this.setState({item:data.rows[0]});
              }
           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
        });
  }

  handleClick(e){
    var starting_time = $(".time_val1").val();
    var end_time = $(".time_val2").val();
    var name = this.state.item.name;
    var id = this.state.item.id;
    $.ajax({
        url: "/update_timetable",
        dataType: 'json',
        type: 'POST',
        data: {'starting_time':starting_time,'end_time':end_time,'name':name,'id':id},
        success: function(data) {
            if (data.success) {
              alert("修改成功");
            }else {
              alert("修改失败");
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

        <div className="course_time_wrap">
          <div>
            <span className="course_time_span">
              <input className="datetime1 course_time_input time_val1" type="text" />
            </span>
            -
            <span className="course_time_span">
              <input className="datetime1 course_time_input time_val2" type="text" />
            </span>
            <button className="course_time_add_button" onClick={this.handleClick}>修改</button>
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
