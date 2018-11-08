import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {NavBar, Grid, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Dashen from '../../containers/dashen';
import Laoban from '../../containers/laoban';
import Message from '../../containers/message';
import Personal from '../../containers/personal';
import NavFooter from '../../containers/nav-footer';
import Chat from '../../containers/chat';
import path from '../../untils/path'

class Main extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired
  }

  navList=[
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ];

  render() {
    //1、没有cookie
    const userId = Cookies('user_id');
    if (!userId){
      return <Redirect to="/login"/>
    }
    //2、有cookie 没有redux  更新用户的redux
    const {user} = this.props;
    if (!user.msg && !user._id){
      this.props.getUserInfo();
      return <Icon type='loading' size='lg' style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'}}/>;
    }
    //3有cookie 有redux
    //判断当亲路由
    const {pathname} = this.props.location;
    if ( pathname ==='/' ){
      return <Redirect to={path(user.type, user.header)}/>
    }
    const {navList} = this;
    //使用user.type判断
    if (user.type === 'laoban'){
      navList[1].hide = true;
    }else {
      navList[0].hide = true;
    }
    //判断是否在main路由 在的话底部不显示
    const navObj = navList.find( item => item.path === pathname);
    return (
      <div  className="main-content">
        {navObj ? <NavBar className="nav-bar-fixed">{navObj.title}</NavBar> :''}
        <div>
          <Switch>
            <Route path="/laobanInfo" component={LaobanInfo}/>
            <Route path="/dashenInfo" component={DashenInfo}/>
            <Route path="/dashen" component={Dashen}/>
            <Route path="/laoban" component={Laoban}/>
            <Route path="/message" component={Message}/>
            <Route path="/personal" component={Personal}/>
            <Route path="/chat/:userId" component={Chat}/>
          </Switch>
        </div>

        {navObj ? <NavFooter navList={this.navList}/> :''}
      </div>
    )
  }
}

export default Main