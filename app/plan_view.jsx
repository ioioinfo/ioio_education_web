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
      var level_id;
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
                   url: "/search_plan_byId",
                   dataType: 'json',
                   type: 'GET',
                   data:{"id":"1"},
                   success: function(data) {
                    if(data.success){
                      var name = data.rows[0].name;
                      var code = data.rows[0].code;
                      level_id = data.rows[0].level_id;
                      $("#name").val(name);
                      $("#code").val(code);
                      $("#level_id").val(level_id);
                      this.setState({item:data.rows[0]});
                    }

                   }.bind(this),
                   error: function(xhr, status, err) {
                   }.bind(this)
              });




  }
  handleClick(e){
    var id = this.state.item.id;
    var name = $("#name").val();
    var code = $("#code").val();
    var level_id = $("#level_id").val();

    $.ajax({
        url: "/save_plan",
        dataType: 'json',
        type: 'POST',
        data: {"id":id,"name":name,"code":code,"level_id":level_id},
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
                <div className="weui-cell__hd"><label className="weui-label">编号</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="code"/>
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
                <div className="weui-cell__hd"><label className="weui-label">名字</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <input className="weui-input " type="text" placeholder="" id="name"/>
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
