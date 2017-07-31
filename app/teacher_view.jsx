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
      this.state = {item:{},typeItem:[]};
      this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
      var type_id;
      $.ajax({
           url: "/get_teachers_types",
           dataType: 'json',
           type: 'GET',
           data:{},
           success: function(data) {
              if(data.success){
                this.setState({typeItem:data.rows});
                $("#type_id").val(type_id);
              }

             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });

      $.ajax({
           url: "/search_teacher_byId",
           dataType: 'json',
           type: 'GET',
           data:{'id':'1'},
           success: function(data) {
              if(data.success){
                var id = data.rows[0].id;
                var name = data.rows[0].name;
                var code = data.rows[0].code;
                var age = data.rows[0].age;
                var sex = data.rows[0].sex;
                var phone = data.rows[0].phone;
                var state = data.rows[0].state;
                var address = data.rows[0].address;
                var province = data.rows[0].province;
                var city = data.rows[0].city;
                var district = data.rows[0].district;
                var address_detail = province + city + district + address;
                var photo = data.rows[0].photo;
                type_id = data.rows[0].type_id;
                $("#name").val(name);
                $("#code").val(code);
                $("#age").val(age);
                $("#sex").val(sex);
                $("#phone").val(phone);
                $("#state_up").html(state);
                $("#address").val(address_detail);
                $("#photo").val(photo);
                $("#type_id").val(type_id);
                this.setState({item:data.rows[0]});
              }

             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });


  }
  handleClick(e){
    var teacher = new Object();
    var id = this.state.item.id;
    var level = 1;
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
    var type_id = Number($("#type_id").val());
    var is_master = 0;
    var is_leader = 0;
    teacher.id=id;
    teacher.level=level;
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
    teacher.type_id=type_id;
    teacher.is_master=is_master;
    teacher.is_leader=is_leader;

    $.ajax({
        url: "/update_teacher",
        dataType: 'json',
        type: 'POST',
        data: {"teacher":JSON.stringify(teacher)},
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
                    <input className="weui-input " type="text" placeholder="" id="sex"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">手机</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="phone"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="state">
                      <option id="state_up"></option>
                      <option>未就职</option>
                      <option>已就职</option>
                      <option>已离职</option>
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">职位</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="type_id">
                    {this.state.typeItem.map((item,index)  => (
                        <option key={index} value={item.id}>{item.name}</option>))
                    }
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
