var React = require('react');
var ReactDOM = require('react-dom');


var AdminLeft = require('nav');
var Table = require('Table');
var PageTab = require('PageTab');;

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
      this.state = {};
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
        <Course/>
      </div>
    );
  }
};

// 右边 头部
class Course extends React.Component {
  constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {planItems:[],timeItems:[]};
  }
  componentDidMount() {
    $.ajax({
           url: "/get_education_plans",
           dataType: 'json',
           type: 'GET',
           data:{},
           success: function(data) {
            if(data.success){
              this.setState({planItems:data.rows});
            }

           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
      });

      $.ajax({
             url: "/get_schedules",
             dataType: 'json',
             type: 'GET',
             data:{},
             success: function(data) {
              if(data.success){
                this.setState({timeItems:data.time_map});
              }

             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });
  }
  render() {
    return (
      <div className="course_view">
        <ul className="course_view_ul course_view_ul_title">
          <li>时间</li><li>周一</li><li>周二</li><li>周三</li>
          <li>周四</li><li>周五</li><li>周六</li><li>周日</li>
        </ul>
        {this.state.timeItems.map((item,index)  => (
          <CourseLine key={index} item={item} index={index} timeItems={this.state.timeItems} planItems={this.state.planItems}/>))
        }
      </div>
    );
  }
};

// 右边 头部
class CourseLine extends React.Component {
  componentDidMount(){
    var planId1 = this.props.item.v["星期一"].plan_id;
    var planId2 = this.props.item.v["星期二"].plan_id;
    var planId3 = this.props.item.v["星期三"].plan_id;
    var planId4 = this.props.item.v["星期四"].plan_id;
    var planId5 = this.props.item.v["星期五"].plan_id;
    var planId6 = this.props.item.v["星期六"].plan_id;
    var planId7 = this.props.item.v["星期天"].plan_id;
    $("#planId1").val(planId1);
    $("#planId2").val(planId2);
    $("#planId3").val(planId3);
    $("#planId4").val(planId4);
    $("#planId5").val(planId5);
    $("#planId6").val(planId6);
    $("#planId7").val(planId7);

  }
  render() {


    return (
      <ul className="course_view_ul">
        <li>{this.props.item.time}</li>
        <li>
          <span className="course_view_ul_li_span">
            <select className="weui-input" id="planId1">
              <option value="">待选择</option>
              {this.props.planItems.map((item,index)  => (
                <option key={index} value={item.id}>{item.name}</option>))
              }
            </select>
          </span>
        </li>
        <li><span className="course_view_ul_li_span">
          <select className="weui-input" id="planId2">
            <option value="">待选择</option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li><span className="course_view_ul_li_span">
          <select className="weui-input" id="planId3">
            <option value="">待选择</option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li><span className="course_view_ul_li_span">
          <select className="weui-input" id="planId4">
            <option value="">待选择</option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li><span className="course_view_ul_li_span">
          <select className="weui-input" id="planId5">
            <option value="">待选择</option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li><span className="course_view_ul_li_span">
          <select className="weui-input" id="planId6">
            <option value="">待选择</option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li><span className="course_view_ul_li_span">
          <select className="weui-input" id="planId7">
            <option value="">待选择</option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
      </ul>
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
