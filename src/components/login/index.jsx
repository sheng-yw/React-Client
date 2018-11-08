import React, {Component} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'

import Logo from '../logo';

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }
  state = {
    username:'',
    password:''
  }
  changeInput =(name, val)=>{
    this.setState({
      [name]: val
    })
  }
  userLogin =() =>{
    const user = this.state;
    this.props.loginUser(user);
  }
  render() {
    const {msg,url} = this.props.user;
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
              <Button type="primary" onClick={this.userLogin}>登 录</Button>
              <Button onClick={()=> this.props.history.replace('/register')}>去注册</Button>
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}

export default Login