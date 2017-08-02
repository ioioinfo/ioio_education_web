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
      this.state={levelItem:[]};
      this.handleClick=this.handleClick.bind(this);
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
    var student = new Object();
    var students = new Array();

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
    var level_id = $("#level_id").val();

    var myreg = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
    if(!myreg.test(phone)){
        alert('请输入有效的手机号码！');
        return false;
    }
    student.name=name;
    student.code=code;
    student.age=age;
    student.sex=sex;
    student.phone=phone;
    student.state=state;
    student.address=address;
    student.province=province;
    student.city=city;
    student.district=district;
    student.level_id=level_id;
    student.photo=photo;
    console.log(student);
    students.push(student)

    $.ajax({
        url: "/save_student",
        dataType: 'json',
        type: 'POST',
        data: {"students":JSON.stringify(students)},
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
        <div className="admin_creat overflow_hidden">
            <div className="">
              <div className="col-xs-12 col-sm-8 col-md-8">
                <div className="row">
                  <div className="admin_creat_butto_wrap col-xs-12 col-sm-3 col-md-2 cursor_pointer">
                    <p  className="button_style_delect text_align_center"><i className="fa fa-trash fa-fw admin_creat_button "></i>&nbsp; 删 除</p>
                  </div>
                  <div className="admin_creat_butto_wrap col-xs-12 col-sm-3 col-md-2 cursor_pointer">
                    <p  className="button_style_new text_align_center"><i className="fa fa-plus fa-fw admin_creat_button "></i>&nbsp; 新 建</p>
                  </div>
                </div>

              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div  className="row">
                  <span className="admin_creat_search  col-xs-8 col-sm-8 col-md-8">
                    <input className="admin_creat_input" type="search" placeholder="请输入关键字" />
                  </span>
                  <button className="admin_creat_button_search col-xs-4 col-sm-4 col-md-4 button_style_search cursor_pointer">搜 索</button>
                </div>
              </div>

            </div>
        </div>

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
                <div className="weui-cell__hd"><label className="weui-label">年级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                <select className="weui-input " type="text" placeholder="" id="level_id">
                <option value="">请选择年级</option>
                {this.state.levelItem.map((item,index)  => (
                    <option key={index} value={item.id}>{item.name}</option>))
                }
                </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <select className="weui-input " type="text" placeholder="" id="state">
                      <option>未报名</option>
                      <option>已报名</option>
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
