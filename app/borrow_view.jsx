var React = require('react');
var ReactDOM = require('react-dom');



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

// 左边 导航
class AdminLeft extends React.Component {
  render() {
    return (
      <div className="admin_left col-xs-6 col-sm-4 col-md-2">
        <div className="admin_logo">
          <span className="admin_index_logo">IOIO后台</span><br/>
          <span className="admin_index_name">佑佑信息科技</span>
        </div>
        <AdminLeftNav/>
      </div>
    );
  }
};


// 左边 导航
class AdminLeftNav extends React.Component {
  constructor(props) {
      super(props);
      this.state={navitem:[]};
      this.handleClick=this.handleClick.bind(this);
  }
  handleClick(e){
    var index= $(e.target).data("role");
    var second_nav = "nav_second"+index;
    $("#"+second_nav).slideToggle(400);
  }
  componentDidMount() {
    var navitem = [{icon:"fa fa-home fa-fw",navname:"首页",snav:[{icon:"fa fa-home fa-fw",navname:"首页"},{icon:"fa fa-home fa-fw",navname:"首页"},{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-minus-square-o fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"},{icon:"fa fa-home fa-fw",navname:"首页"},{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-tags fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-television fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-users fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-window-close-o fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-automobile fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"}]},
              {icon:"fa fa-train fa-fw",navname:"功能菜单一",snav:[{icon:"fa fa-home fa-fw",navname:"首页"}]}]
              this.setState({navitem:navitem});
  }
  render() {
    return (
      <div className="admin_index_nav">
        {this.state.navitem.map((item,index) => (
            <div className="nav_public  font_color" key={index} href="#" >
                <div className="nav_public_first" data-role={index} onClick={this.handleClick}>
                  <i className={item.icon}></i>&nbsp; {item.navname}
                </div>
                <p className="nav_second" id={"nav_second"+index}>
                  {item.snav.map((item,index) => (
                    <a key={index} className="nav_public_in nav_public_second font_color" href="#">
                      <i className={item.icon}></i>&nbsp; {item.navname}
                    </a>))
                  }
                </p>

            </div>))
        }

      </div>
    );
  }
};

// 右边
class AdminRight extends React.Component {
  render() {
    return (
      <div className="admin_right col-xs-12 col-sm-8 col-md-10">
        <AdminRightTop/>
        <AdminRightBotton/>
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

// 右边 详情
class AdminRightBotton extends React.Component {
  render() {
    return (
      <div className="admin_index_botton ">
        <div className="borrow_view">
          <div className="row">
            <div className="borrow_view_img col-xs-12 col-sm-4 col-md-4">
              <img className="borrow_bookimg" src="images/no_picture.png" alt="" />
            </div>
            <div className="borrow_view_control col-xs-12 col-sm-7 col-sm-offset-1 col-md-7 col-md-offset-1">
              <p><span>书名：西游记</span></p>
              <p><span>作者：吴承恩</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


// 返回到页面
ReactDOM.render(
    <AdminIndex/>,
    document.getElementById("admin")
);
