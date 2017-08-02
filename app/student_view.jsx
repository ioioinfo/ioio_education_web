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
      this.state = {item:{},levelItem:[]};
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


      $.ajax({
             url: "/search_student_byId",
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
                  var level_id = data.rows[0].level_id;
                  var photo = data.rows[0].photo;
                  $("#name").val(name);
                  $("#code").val(code);
                  $("#age").val(age);
                  $("#sex").val(sex);
                  $("#phone").val(phone);
                  $("#state").val(state);
                  $("#address").val(district);
                  $("#photo").val(photo);
                  this.setState({item:data.rows[0]});
                }

             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });

  }
  handleClick(e){
    var obj = new Object();

    var id = this.state.item.id;
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
    obj.id=id;
    obj.name=name;
    obj.code=code;
    obj.age=age;
    obj.sex=sex;
    obj.phone=phone;
    obj.state=state;
    obj.address=address;
    obj.province=province;
    obj.city=city;
    obj.district=district;
    obj.level_id=level_id;
    obj.photo=photo;
    console.log(obj);

    $.ajax({
        url: "/update_student",
        dataType: 'json',
        type: 'POST',
        data: {"student":JSON.stringify(obj)},
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
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="state"/>
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
