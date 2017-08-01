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
      this.state={item:{}};
      this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
      $.ajax({
             url: "/search_record_byId",
             dataType: 'json',
             type: 'GET',
             data:{'id':'2'},
             success: function(data) {
              if(data.success){
                var state = data.rows[0].state;
                var score = data.rows[0].score;
                var exam_name = data.rows[0].exam_name;
                var student_name = data.rows[0].student_name;
                $("#state").val(state);
                $("#score").val(score);
                $("#exam_name").val(exam_name);
                $("#student_name").val(student_name);
                this.setState({item:data.rows[0]});
              }

             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });
  }
  handleClick(e){
    var exam_record  = new Object();
    var id = this.state.item.id;
    var exam_id = this.state.item.exam_id;
    var student_id = this.state.item.student_id;
    var state = $("#state").val();
    var score = $("#score").val();
    exam_record.id=id;
    exam_record.exam_id=exam_id;
    exam_record.student_id=student_id;
    exam_record.state=state;
    exam_record.score=score;
    $.ajax({
        url: "/update_exam_record",
        dataType: 'json',
        type: 'POST',
        data: {'exam_record':JSON.stringify(exam_record)},
        success: function(data) {
            if (data.success) {
                alert("修改成功！");
            }else {
                alert("修改失败！");
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
                <div className="weui-cell__hd"><label className="weui-label">科目</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="exam_name"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">学生</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="student_name"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="state"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">分数</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input" type="text" id="score"/>
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
