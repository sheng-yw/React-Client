import React, {Component} from 'react';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component {

  static propTypes = {
    user : PropTypes.object.isRequired,
    reqSuccess: PropTypes.func.isRequired
  }
  logout = ()=>{
    Modal.alert('退出登录', '你确认退出登录?', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: () => {
          //退出登录
          //清除cookie
          Cookies.remove('user_id');
          //清空redux状态
          this.props.reqSuccess({});
          //路由跳转到登录页面
          this.props.history.replace('/login');
        }}
    ])
  }
  render() {
    const {user} = this.props;
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/avatars/${user.header}.png`)} style={{width: 50}} alt="header"/>}
          title={user.username}
          message={user.company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {user.job}</Brief>
            <Brief>简介: {user.info}</Brief>
            {user.salary ? <Brief>薪资: {user.salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default Personal;