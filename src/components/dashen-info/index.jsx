import React, {Component} from 'react';
import {Button, InputItem, TextareaItem} from 'antd-mobile';
import PropTypes  from 'prop-types';

import HeaderSelector from '../header-selector';
import {updateUserInfo} from "../../redux/action-creater";
import {Redirect} from "react-router-dom";

class DashenInfo extends Component {
  static propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired
  }
  state = {
    job: '',
    info: '',
    header: ''
  }
  changeInput =(name, val)=>{
    this.setState(
      {
        [name]: val
      }
    );
  }
  saveClick = ()=>{
    const data = this.state;
    this.props.updateUserInfo({...data,type:'dashen'});
  }
  changeHeader =(header)=>{
    this.setState({
      header
    })
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
        <InputItem onChange={val=>this.changeInput('job',val)}>求职岗位</InputItem>
        <TextareaItem title="个人介绍" rows={3} onChange={val=>this.changeInput('info',val)}/>
        <Button type="primary" onClick = {this.saveClick}>保存</Button>
      </div>
    )
  }
}

export default DashenInfo