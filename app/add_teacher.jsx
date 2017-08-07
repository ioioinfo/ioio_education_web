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
      this.state={levelItem:[]};
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

  }
  handleClick(e){
    var teacher = {};

    var name = $("#name").val();
    var code = $("#code").val();
    var age = $("#age").val();
    var sex = $("#sex").val();
    var phone = $("#phone").val();
    var state = $("#state").val();
    var photo = "无";
    var address = "无";
    var province = "无";
    var city = "无";
    var district = $("#address").val();
    var level= $("#level").val();
    var is_master = 0;
    var is_leader = 0;
    teacher.name=name;
    teacher.code=code;
    teacher.age=age;
    teacher.sex=sex;
    teacher.phone=phone;
    teacher.state=state;
    teacher.address=address;
    teacher.province=province;
    teacher.city=city;
    teacher.district=district;
    teacher.photo=photo;
    teacher.level=level;
    teacher.is_master=is_master;
    teacher.is_leader=is_leader;
    teacher.type_id=0;
    console.log(teacher);

    $.ajax({
        url: "/save_teacher",
        dataType: 'json',
        type: 'POST',
        data: {"teachers":JSON.stringify([teacher])},
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
                <div className="weui-cell__hd"><label className="weui-label">姓名</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="name"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">编号</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="code"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">年龄</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="age"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">性别</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <select className="weui-input " type="text" placeholder="" id="sex">
                      <option>男</option>
                      <option>女</option>
                    </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">手机</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="phone"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">等级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <input className="weui-input " type="text" placeholder="" id="level"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <select className="weui-input " type="text" placeholder="" id="state">
                    <option>未就职</option>
                    <option>已就职</option>
                    <option>已离职</option>
                    </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">地址</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="address"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">照片</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="photo"/>
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
