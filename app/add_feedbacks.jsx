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
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
  }
  handleClick(e){
    var feedback = new Object();
    var student_id = $("#student_id").val();
    var feedback_date = $("#feedback_date").val();
    var student_name = $("#student_name").val();
    var feedback_person = $("#feedback_person").val();
    var feedback_content = $("#feedback_content").val();
    var state = $("#state").val();
    feedback.student_id=student_id;
    feedback.feedback_date=feedback_date;
    feedback.student_name=student_name;
    feedback.feedback_person=feedback_person;
    feedback.feedback_content=feedback_content;
    feedback.state=state;
    $.ajax({
        url: "/save_feedback",
        dataType: 'json',
        type: 'POST',
        data: {'feedback':JSON.stringify(feedback)},
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
                <div className="weui-cell__hd"><label className="weui-label">学员id</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="student_id"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="feedback_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">姓名</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="student_name"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">回访员</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="feedback_person"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                <select className="weui-input " type="text" placeholder="" id="state">
                    <option>未回访</option>
                    <option>已完成</option>
                </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">回访内容</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <textarea className="weui-input "id="feedback_content"></textarea>
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
