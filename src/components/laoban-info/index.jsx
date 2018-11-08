import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, InputItem, TextareaItem, List} from 'antd-mobile';
import PropTypes from 'prop-types';

import HeaderSelector from '../header-selector';

class LaobanInfo extends Component {
  static propTypes = {
    updateUserInfo : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired
  }
  state = {
    header:'',
    job:'',
    company:'',
    salary:'',
    info:''
  }
  changeInput =(name, val)=>{
    this.setState({[name]:val});
  }
  changeHeader = (data) =>{
    this.setState({header:data});
  }

  saveClick = ()=>{
    //异步请求
    const data = this.state;
    this.props.updateUserInfo({...data, type:'laoban'});
  }
  render() {
    const {msg, header, url} = this.props.user;
    if (header){
      return <Redirect to={url}/>
    } 
    return (
      <div>
        <HeaderSelector changeHeader={this.changeHeader}/>
        {msg ? <p className="err-msg">{msg}</p> : ''}
        <InputItem onChange={val => this.changeInput('job', val)}>招聘职位</InputItem>
        <InputItem onChange={val => this.changeInput('company', val)}>公司名称</InputItem>
        <InputItem onChange={val => this.changeInput('salary', val)}>职位薪资</InputItem>
        <TextareaItem title="职位要求" rows={3} onChange={val => this.changeInput('info', val)}/>
        <Button type="primary" onClick = {this.saveClick}>保存</Button>
      </div>
    )
  }
}

export default LaobanInfo