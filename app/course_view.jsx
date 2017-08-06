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
      this.handleClick=this.handleClick.bind(this);
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
  handleClick(e){
    tar();
  }
  render() {
    return (
      <div>
        <div className="course_view">
          <ul className="course_view_ul course_view_ul_title">
            <li>时间</li><li>周一</li><li>周二</li><li>周三</li>
            <li>周四</li><li>周五</li><li>周六</li><li>周日</li>
          </ul>
          {this.state.timeItems.map((item,index)  => (
            <CourseLine key={index} item={item} index={index} timeItems={this.state.timeItems} planItems={this.state.planItems}/>))
          }
        </div>
        <p className="course_view_button">
          <button onClick={this.handleClick}>修 改</button>
        </p>
      </div>
    );
  }
};

// 右边 头部
class CourseLine extends React.Component {
  componentDidMount(){
    var index = this.props.index;
    var planId1 = this.props.item.v["星期一"].plan_id;
    var planId2 = this.props.item.v["星期二"].plan_id;
    var planId3 = this.props.item.v["星期三"].plan_id;
    var planId4 = this.props.item.v["星期四"].plan_id;
    var planId5 = this.props.item.v["星期五"].plan_id;
    var planId6 = this.props.item.v["星期六"].plan_id;
    var planId7 = this.props.item.v["星期天"].plan_id;

    $(function(){
      $("#course_view_ul"+index+" .planId1").val(planId1);
      $("#course_view_ul"+index+" .planId2").val(planId2);
      $("#course_view_ul"+index+" .planId3").val(planId3);
      $("#course_view_ul"+index+" .planId4").val(planId4);
      $("#course_view_ul"+index+" .planId5").val(planId5);
      $("#course_view_ul"+index+" .planId6").val(planId6);
      $("#course_view_ul"+index+" .planId7").val(planId7);
    });

    tar=function(){
      var Uls = $('.course_view_ul_list');
      var time = new Array();
      var subArray = new Array();

      for (var i = 0;i < Uls.length; i++) {
        var t = $("#course_view_li_time"+i).html();
        var subObject = new Object();
        var schedules = new Object();
        var id = $("#course_view_li_time"+i).data("sole");
        time.push(t);
        var h = time[i];
        var val1 = $("#course_view_ul"+i+" .planId1").val();
        var val2 = $("#course_view_ul"+i+" .planId2").val();
        var val3 = $("#course_view_ul"+i+" .planId3").val();
        var val4 = $("#course_view_ul"+i+" .planId4").val();
        var val5 = $("#course_view_ul"+i+" .planId5").val();
        var val6 = $("#course_view_ul"+i+" .planId6").val();
        var val7 = $("#course_view_ul"+i+" .planId7").val();
        schedules.val1=val1;schedules.val2=val2;schedules.val3=val3;
        schedules.val4=val4;schedules.val5=val5;schedules.val6=val6;
        schedules.val7=val7;
        subObject.schedules=schedules;
        subObject.h=h;
        subObject.id=id;
        subArray.push(subObject);

      }
      $.ajax({
          url: "/update_schedules_byClass_id",
          dataType: 'json',
          type: 'POST',
          data: {"class_id":clss_id,"subArray":JSON.stringify(subArray)},
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

  }
  render() {
    return (
      <ul className="course_view_ul course_view_ul_list" id={"course_view_ul"+this.props.index}>
        <li id={"course_view_li_time"+this.props.index} data-sole={this.props.item.time_id}>{this.props.item.time}</li>
        <li id="">
          <span className="course_view_ul_li_span">
            <select className="weui-input planId1" id="">
              <option value=""></option>
              {this.props.planItems.map((item,index)  => (
                <option key={index} value={item.id}>{item.name}</option>))
              }
            </select>
          </span>
        </li>
        <li id=""><span className="course_view_ul_li_span">
          <select className="weui-input planId2" id="">
            <option value=""></option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li id=""><span className="course_view_ul_li_span">
          <select className="weui-input planId3" id="">
            <option value=""></option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li id=""><span className="course_view_ul_li_span">
          <select className="weui-input planId4" id="">
            <option value=""></option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li id=""><span className="course_view_ul_li_span">
          <select className="weui-input planId5" id="">
            <option value=""></option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li id=""><span className="course_view_ul_li_span">
          <select className="weui-input planId6" id="">
            <option value=""></option>
            {this.props.planItems.map((item,index)  => (
              <option key={index} value={item.id}>{item.name}</option>))
            }
          </select>
        </span></li>
        <li id=""><span className="course_view_ul_li_span">
          <select className="weui-input planId7" id="">
            <option value=""></option>
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
