/*
对话聊天的路由组件
 */
import React, {Component} from 'react';
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const Item = List.Item;

export default class Chat extends Component {
  static propTypes = {
    sendMessage : PropTypes.func.isRequired,
    chatMsgs: PropTypes.func.isRequired,
    chatMessage: PropTypes.object.isRequired,
    updateReadMessageSYNC: PropTypes.func.isRequired
  }
  state = {
    content:'',
    isShow: false
  }
  sendMessage = () =>{
    const {content} = this.state;
    const to = this.props.match.params.userId;
    const from = Cookies.get('user_id');
    this.props.sendMessage({from, to, content});
    this.setState({content:''});
  }
  componentWillMount(){
    const emojis = ['🙈', '🙉', '🙊', '❤','🙈', '🙉', '🙊','🙈', '🙉', '🙊',
      '🙈', '🙉', '🙊','🙈', '🙉', '🙊', '❤','🙈', '🙉', '🙊','🙈', '🙉', '🙊',
      '🙈', '🙉', '🙊','🙈', '🙉', '🙊', '❤','🙈', '🙉', '🙊','🙈', '🙉', '🙊',
      '🙈', '🙉', '🙊']
    this.emojis = emojis.map(value =>({text:value}));
    window.scrollTo(0,document.body.scrollHeight);
  }
  componentDidMount (){
    this.props.chatMsgs();
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentDidUpdate(){
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentWillUnmount(){
    //改变已读状态
    const to = this.props.match.params.userId;
    this.props.updateReadMessageSYNC(to);
  }
  emojisIsShow=()=>{
    const isShow = !this.state.isShow
    this.setState({isShow});
    if (isShow){
      setTimeout(()=>{
        //解决bug 点击显示不完整  等组件都加载完成在让他显示
        window.dispatchEvent(new Event('resize'));
      },0)
    }
  }
  render() {
    //获取聊天记录
    const {users, chatList} = this.props.chatMessage;
    const to = this.props.match.params.userId;
    const from = Cookies.get('user_id');
    const user = users[to];
    if (!user){
      //显示主组件的loading效果
      return null;
    }
    const chat_id = [from,  to].sort().join('_');
    let messageList = chatList.filter(item=> item.chat_id === chat_id);
    messageList.sort((a,b)=> Date.parse(a.create_time) - Date.parse(b.create_time));
    return (
      <div id='chat-page'>
        <NavBar className="nav-bar-fixed" icon={<Icon type="left" onClick={()=> this.props.history.goBack()}/>}>{user.username}</NavBar>
        <List>
          {
            messageList.map( (item, index)=>{
              if (item.to === from){
                return (<Item thumb={require(`../../assets/avatars/${user.header}.png`)} key={index}>
                  {item.content}
                </Item>)
              } else {
                return (<Item
                  key={index}
                  className='chat-me'
                  extra='我'
                >
                  {item.content}
                </Item>)
              }
            })
          }

        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={val=>this.setState({content:val})}
            extra={
              <div>
                <span onClick={()=> this.emojisIsShow()}>🙉</span>
                <span onClick={this.sendMessage}>发送</span>
              </div>

            }
            value = {this.state.content}
            onFocus={() => this.setState({isShow: false})}
          />
          {this.state.isShow?<Grid data={this.emojis} isCarousel
                                   columnNum={8}
                                   carouselMaxRow={4}
                                   onClick={_el => this.setState({content:this.state.content+_el.text})} />:null}

        </div>
      </div>
    )
  }
}