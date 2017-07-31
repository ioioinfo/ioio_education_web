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
      this.setPage=this.setPage.bind(this);
      this.handleSort=this.handleSort.bind(this);
      this.loadData=this.loadData.bind(this);
      this.delect=this.delect.bind(this);
      this.addClick=this.addClick.bind(this);
      this.addClick=this.addClick.bind(this);
      // 初始化一个空对象
      this.state = {tabthitems:[],tabtritems:[],tabthitems1:[],tabtritems1:[],allNum:0,everyNum:20,thisPage:1,sort:{name:"",dir:""},tdstates : {"checked":false,"1":false}};
  }
  loadData(params1) {
      var params = {thisPage:this.state.thisPage,sort:this.state.sort};
      $.extend(params,params1);

      getTableData(params,function(data) {
          $.extend(data,params1);
          this.setState(data);
      }.bind(this));
  }
  componentDidMount() {
      var tableHeight = $(window).height()-181;
      $(".tableHeight").css("height",tableHeight+"px");
      $(".arrow_right_style").css("height",tableHeight+"px");
      $(".arrow_right_style").css("line-height",tableHeight+"px");
      this.loadData({"table":"1"});
      this.loadData({"table":"2"});
  }
  setPage(thisPage) {
      this.loadData({thisPage:thisPage});
  }
  handleSort(sort){
      this.loadData({sort:sort});
  }

  delect(e){
    var students = [];
    $(".tabthitems1_wrap td [name=checkbox]").each(function(){
      if($(this).is(":checked")){
        var id = $(this).attr("data-id");
        students.push(id);
      }

    })
    $.ajax({

        url: "/delete_class_student",
        dataType: 'json',
        type: 'POST',
        data: {"class_id":"1","student_ids":JSON.stringify(students)},
        success: function(data) {
            if (data.success) {
              $(".tabthitems1_wrap td [name=checkbox]").prop("checked",false);
              this.loadData({"table":"1"});
              this.loadData({"table":"2"});
            }else {
                alert("删除失败！");
            }
        }.bind(this),
        error: function(xhr, status, err) {
        }.bind(this)
    });

  }

  addClick(e){
    var student_ids = new Array();
    $(".tabthitems_wrap td [name=checkbox]").each(function(index){
      if($(this).is(":checked")){
        var id = $(this).attr("data-id");
        student_ids.push(id);
      }
    })

    $.ajax({
        url: "/add_students",
        dataType: 'json',
        type: 'POST',
        data: {"class_id":"1","student_ids":JSON.stringify(student_ids)},
        success: function(data) {
            if (data.success) {
              $(".tabthitems_wrap td [name=checkbox]").prop("checked",false);
              this.loadData({"table":"1"});
              this.loadData({"table":"2"});
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
                    <p  className="button_style_delect text_align_center" onClick={this.delect} ><i className="fa fa-trash fa-fw admin_creat_button "></i>&nbsp; 删 除</p>
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
        <div className="col-xs-12 col-md-5 tabthitems_wrap">
          <Table tabthitems={this.state.tabthitems} tabtritems={this.state.tabtritems} sort={this.state.sort} onSort={this.handleSort} tdstates={this.state.tdstates}  checkTd={checkTd} />
          <PageTab setPage={this.setPage} allNum={this.state.allNum} everyNum={this.state.everyNum} thisPage={this.state.thisPage} />
        </div>
        <div  className="col-xs-12 col-md-2 arrow_right_style">
          <i className="fa fa-arrow-right fa-fw cursor_pointer" onClick={this.addClick}></i>
        </div>
        <div className="col-xs-12 col-md-5 tabthitems1_wrap">
          <Table tabthitems={this.state.tabthitems1} tabtritems={this.state.tabtritems1} sort={this.state.sort} onSort={this.handleSort} tdstates={this.state.tdstates}   checkTd={checkTd} />
          <PageTab setPage={this.setPage} allNum={this.state.allNum} everyNum={this.state.everyNum} thisPage={this.state.thisPage} />
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

//判断特殊列
var checkTd = function(defaultTd) {

    var props = this.props;
    var id = props.item[props.thitem.name];

    var handleChange = function(e){
    }.bind(this);

        if(this.props.thitem.type=="operation"){
          return (
              <td>
              <span className=""><a href="borrow_books_view"  className="btn btn-info btn-xs operate_announce">查 看</a></span>
              </td>
          );
        }else if (this.props.thitem.type=="checked" || this.props.thitem.type=="check") {
          return (
            <td>
              <input type="checkbox" name="checkbox" data-id={id} onChange={handleChange}/>
            </td>
          );
        }else if (this.props.thitem.type=="level") {
          return (
            <td>
              {this.props.item[this.props.thitem.name].name}
            </td>
          );
        }else {
        return defaultTd;
    }
};

// 返回到页面
ReactDOM.render(
    <AdminIndex/>,
    document.getElementById("admin")
);
