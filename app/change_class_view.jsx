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
      this.state={classItem:[]};
  }

  componentDidMount() {
      var tableHeight = $(window).height()-112;
      $(".student_view_wrap").css("height",tableHeight+"px");
        // 班级
        $.ajax({
           url: "/get_classes",
           dataType: 'json',
           type: 'GET',
           data:{},
           success: function(data) {
            if(data.success){
              this.setState({classItem:data.rows});
            }

           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
      });

      $.ajax({
         url: "/search_change_class_byId",
         dataType: 'json',
         type: 'GET',
         data:{'id':'1'},
         success: function(data) {
          if(data.success){
            var class_id1 = data.rows[0].class_id1;
            var class_id2 = data.rows[0].class_id2;
            var type = data.rows[0].type;
            $("#class_id1").val(class_id1);
            $("#class_id2").val(class_id2);
            $("#type").val(type);
            this.setState({item:data.rows[0]});
          }

         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
    });
  }
  handleClick(e){
    var id = this.state.item.id;
    var change_info  = new Object();
    var student_id = '1';
    var class_id1 = $("#class_id1").val();
    var class_id2 = $("#class_id2").val();
    var type = $("#type").val();
    change_info.id=id;
    change_info.class_id1=class_id1;
    change_info.class_id2=class_id2;
    change_info.type=type;
    change_info.student_id=student_id;

    $.ajax({
        url: "/update_change_class_info",
        dataType: 'json',
        type: 'POST',
        data: {'change_info':JSON.stringify(change_info)},
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
                <div className="weui-cell__hd"><label className="weui-label">原班级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="class_id1">
                  <option value="">请选择班级</option>
                  {this.state.classItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">现班级</label></div>
                <div className="weui-cell__bd student_view_input_style">
                  <select className="weui-input " type="text" placeholder="" id="class_id2">
                  <option value="">请选择班级</option>
                  {this.state.classItem.map((item,index)  => (
                      <option key={index} value={item.id}>{item.name}</option>))
                  }
                  </select>
                </div>
            </div>

            <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">类型</label></div>
                <div className="weui-cell__bd student_view_input_style">
                    <select className="weui-input" id="type">
                      <option>请选择类型</option>
                      <option>转班</option>
                      <option>升班</option>
                    </select>
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
