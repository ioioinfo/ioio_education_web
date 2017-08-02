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
      this.state={planItem:[],masterItem:[],levelItem:[]};
  }

  componentDidMount() {
var tableHeight = $(window).height()-112;
$(".student_view_wrap").css("height",tableHeight+"px");
var master_id;

$.ajax({
   url: "/get_lesson_plans",
   dataType: 'json',
   type: 'GET',
   data:{},
   success: function(data) {
    if(data.success){
      this.setState({planItem:data.rows});
      if (plan_id) {
        $("#plan_id").val(plan_id);
      }
    }

   }.bind(this),
   error: function(xhr, status, err) {
   }.bind(this)
});

$.ajax({
     url: "/get_teachers",
     dataType: 'json',
     type: 'GET',
     data:{},
     success: function(data) {
      if(data.success){
        this.setState({masterItem:data.rows});
        if (master_id) {
          $("#class_master").val(master_id);
        }
      }

     }.bind(this),
     error: function(xhr, status, err) {
     }.bind(this)
});

$.ajax({
       url: "/get_grades",
       dataType: 'json',
       type: 'GET',
       data:{},
       success: function(data) {
        if(data.success){
          this.setState({levelItem:data.rows});
          if(level_id){
            $("#level_id").val(level_id);
          }
        }

       }.bind(this),
       error: function(xhr, status, err) {
       }.bind(this)
  });

  $.ajax({
       url: "/search_class_byId",
       dataType: 'json',
       type: 'GET',
       data:{'id':id},
       success: function(data) {

          if(data.success){
            plan_id = data.rows[0].plan_id;
            var name = data.rows[0].name;
            var code = data.rows[0].code;
            var state = data.rows[0].state;
            var starting_date = data.rows[0].starting_date;
            var end_date = data.rows[0].end_date;
            var class_master = data.rows[0].class_master;
            master_id = data.rows[0].master_id;
            var remarks = data.rows[0].remarks;
            level_id = data.rows[0].level_id;
            $("#plan_id").val(plan_id);
            $("#code").val(code);
            $("#name").val(name);
            $("#starting_date").val(starting_date);
            $("#end_date").val(end_date);
            $("#class_master").val(master_id);
            $("#remarks").val(remarks);
            $("#state_up").html(state);
            $("#level_id").val(level_id);
          }

       }.bind(this),
       error: function(xhr, status, err) {
       }.bind(this)
    });
  }
  handleClick(e){
    var clas = new Object();

    var id = "1";
    plan_id = $("#plan_id").val();
    var name = $("#name").val();
    var code = $("#code").val();
    var state = $("#state").val();
    var starting_date = $("#starting_date").val();
    var end_date = $("#end_date").val();
    var class_master = $("#class_master").val();
    var master_id = $("#class_master").val();
    var remarks = $("#remarks").val();
    var level_id = $("#level_id").val();
    clas.id=id;
    clas.name=name;
    clas.code=code;
    clas.plan_id=plan_id;
    clas.starting_date=starting_date;
    clas.end_date=end_date;
    clas.state=state;
    clas.class_master=class_master;
    clas.master_id=master_id;
    clas.remarks=remarks;
    clas.level_id=level_id;

    $.ajax({
        url: "/update_class",
        dataType: 'json',
        type: 'POST',
        data: {"clas":JSON.stringify(clas)},
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
                <div className="weui-cell__hd"><label className="weui-label">开始时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input datetime1" type="text" placeholder="" id="starting_date"/>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">结束时间</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input datetime2" type="text" placeholder="" id="end_date"/>
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
                <div className="weui-cell__hd"><label className="weui-label">班主任</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="class_master">
                  {this.state.masterItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">计划列表</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="plan_id">
                    {this.state.planItem.map((item,index)  => (
                        <option key={index} value={item.id}>{item.name}</option>))
                    }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">名字</label></div>
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
                <div className="weui-cell__hd"><label className="weui-label">状态</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="state">
                      <option id="state_up"></option>
                      <option>未开始</option>
                      <option>已开班</option>
                      <option>已结束</option>
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">备注</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="remarks"/>
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
