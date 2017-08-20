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
      this.addClick=this.addClick.bind(this);
      this.addClick=this.addClick.bind(this);
      this.handleChange=this.handleChange.bind(this);
      // 初始化一个空对象
      this.state = {tabthitems:[],tabtritems:[],tabthitems1:[],tabtritems1:[],allNum:0,everyNum:20,thisPage:1,sort:{name:"",dir:""},tdstates : {"checked":false,"1":false},classItem:[]};
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
      $(".page_wrap").css("display","none");
      var tableHeight = $(window).height()-195;
      $(".tableHeight").css("height",tableHeight+"px");
      $(".arrow_right_style").css("height",tableHeight+"px");
      $(".arrow_right_style").css("line-height",tableHeight+"px");
      this.loadData({"table":"1"});
      this.loadData({"table":"2"});
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

  }
  setPage(thisPage) {
      this.loadData({thisPage:thisPage});
  }
  handleSort(sort){
      this.loadData({sort:sort});
  }


  addClick(e){
    var student_ids = new Array();
    $(".tabthitems_wrap td [name=checkbox]").each(function(index){
      if($(this).is(":checked")){
        var id = $(this).attr("data-id");
        student_ids.push(id);
      }
    })
    var class_id1='1';
    $.ajax({
        url: "/change_classAndStudents",
        dataType: 'json',
        type: 'POST',
        data: {"class_id1":class_id1,"class_id2":newId,"student_ids":JSON.stringify(student_ids)},
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

  handleChange(e){
    newId = $('#class_id').val();
    this.loadData({"table":"1"});
    this.loadData({"table":"2"});
  }
  render() {
    return (
      <div className="admin_right col-xs-12 col-sm-8 col-md-10 overflow_auto">
        <AdminRightTop/>
        <div className="admin_creat overflow_hidden">
          <div className="weui-cell turn_class_select_style pull-right">
              <div className="weui-cell__hd"><label className="weui-label">班级</label></div>
              <div className="weui-cell__bd student_view_input_style student_view_input_style_public">
                <select className="weui-input " type="text" placeholder="" id="class_id" onChange={this.handleChange}>
                <option value="">请选择要转的班级</option>
                {this.state.classItem.map((item,index)  => (
                    <option key={index} value={item.id}>{item.name}</option>))
                }
                </select>
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
              <span className=""><a href={"student_view?id="+id}  className="btn btn-info btn-xs operate_announce">查 看</a></span>
              </td>
          );
        }else if (this.props.thitem.type=="checked" || this.props.thitem.type=="check") {
          return (
            <td>
              <input type="checkbox" name="checkbox" data-id={id} onChange={handleChange}/>
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
