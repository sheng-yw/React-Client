import React, {Component} from 'react'
import {List, Badge} from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const Item = List.Item;
const Brief = Item.Brief;



class Message extends Component {
  static propTypes ={
    chatMsgs: PropTypes.func.isRequired
  }
  componentDidMount = ()=>{
    this.props.chatMsgs();
  }

  getChatList =()=>{
    //获取与此用户相关的聊天记录
    const userId = Cookies.get('user_id');
    const {chatList, users} = this.props.chatMessage;
    const {type} = this.props.user;
    //对聊天信息排序
    chatList.sort((next, current)=>{
      return   Date.parse(next.create_time) -Date.parse(current.create_time);
    });
    const cloneUsers = JSON.parse(JSON.stringify(users));
    chatList.forEach( item=>{
      //显示我要有几个对话框
      const toUserId = item.from === userId ? item.to : item.from;
      if ( !cloneUsers[toUserId].count && !cloneUsers[toUserId].chatList) {
        cloneUsers[toUserId].count = 0;
        cloneUsers[toUserId].chatList = [];
      }
      //未读的信息数
      if ( item.reade === false && item.to===userId){
        cloneUsers[toUserId].count =  cloneUsers[toUserId].count+1;
      }
      cloneUsers[toUserId].chatList.push(item);

    });
    const messageList = Object.values(cloneUsers);
    return messageList.map(item=>{
      if (item.chatList){
        const chatListSize = item.chatList.length - 1;
        return (<Item key={item._id} extra={<Badge text={item.count} />}
                            thumb={require(`../../assets/avatars/${item.header}.png`)}
                            arrow={item.username}
                            onClick = {()=>this.props.history.push(`/chat/${item._id}`)}
          >
          {item.chatList[chatListSize].content}
          <Brief>{item.username}</Brief>
        </Item>)
      }
    })
  }
  render() {
    const newList = this.getChatList();
    return (
      <List>
        {
          newList
        }

      </List>
    )
  }
}

export default Message