import React, {Component} from 'react';
import {Button, NavBar, InputItem, WhiteSpace, WingBlank, List, Radio} from 'antd-mobile';
import PropTypes from 'prop-types';

import Logo from '../logo';
import {Redirect} from "react-router-dom";

const Item = List.Item;

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }
  state = {
    username:'',
    password:'',
    rePassword:'',
    type:'laoban'
  }
  changeInput =(name, val)=>{
    this.setState({
      [name]: val
    })
  }
  registerUser = () => {
    const user = this.state;
    this.props.registerUser(user);
  }
  render() {
    const {type} = this.state;
    const {msg, url} = this.props.user;
    if (!msg && url){
      return <Redirect to={url}/>
    }
    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo/>
        <WingBlank>
          <form>
            {msg ? <p className="err-msg">{msg}</p> : ''}
            <List>
              <WhiteSpace/>
              <InputItem placeholder="请输入用户名" onChange={val => this.changeInput('username',val)}> 用户名：</InputItem>
              <WhiteSpace/>
              <InputItem placeholder="请输入密码" onChange={val => this.changeInput('password',val)} type="password"> 密码：</InputItem>
              <WhiteSpace/>
              <InputItem placeholder="再次输入密码"  onChange={val => this.changeInput('rePassword',val)}  type="password"> 确认密码：  </InputItem>
              <WhiteSpace/>
              <Item>
                用户类型：&nbsp;&nbsp;
                <Radio checked={type === 'dashen'} onChange={() => this.changeInput('type','dashen')}>大神</Radio >&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio checked={type === 'laoban'} onChange={() => this.changeInput('type','laoban')}>老板</Radio>
              </Item>
              <Button type="primary" onClick={this.registerUser}>注 册</Button>
              <Button onClick={()=>this.props.history.replace('/login')}>已有账户</Button>
            </List>
          </form>
        </WingBlank>

      </div>
    )
  }
}

export default Register