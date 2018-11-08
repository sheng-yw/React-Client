import io from 'socket.io-client';

import {REQ_SUCCESS, ERR_MSG, REQ_USER_LIST, REQ_CHAT_LIST,
  REQ_CHAT_LIST_ERR,REQ_USER_LIST_ERR, ADD_CHAT_TO_LIST,
  UPDATE_READE_COUNT, UPDATE_READE_COUNT_ERR} from './action-types';
import {reqRegister, reqLogin, updateUser, getUser, getUserList, getChatList, updateReadMessage} from '../api';
import path from '../untils/path';
import {USER_NAME_ERR, COMPANY_ERR, DASHEN_INFO_ERR, JOB_ERR,
  LAOBAN_INFO_ERR, PASSWORD_ERR, REPASSWORD_ERR, REQ_ERR, SALARY_ERR, HEADER_ERR} from './err-msg';

export const reqSuccess = (data) => ({type:REQ_SUCCESS, data});
export const errMsg = (data) => ({type:ERR_MSG, data});
export const reqUserList = (userList) => ({type:REQ_USER_LIST, data: userList});
export const reqUserListErr = (data) => ({type:REQ_USER_LIST_ERR, data});
export const reqChatList = (chatList)=>({type:REQ_CHAT_LIST, data: chatList});
export const reqChatListErr = (data)=>({type:REQ_CHAT_LIST_ERR, data});
export const addChatToList = (data)=>({type:ADD_CHAT_TO_LIST, data});
export const updateReadeCount = (data)=>({type:UPDATE_READE_COUNT, data});
export const updateReadeCountErr = (data)=>({type:UPDATE_READE_COUNT_ERR, data});



//异步函数发送请求  注册用户
export const registerUser=(user)=>{
  const {username, password, rePassword} = user;
  if (!username){
    return errMsg({msg:USER_NAME_ERR});
  } else if (!password){
    return errMsg({msg:PASSWORD_ERR});
  } else if (password !== rePassword) {
    return errMsg({msg:REPASSWORD_ERR});
  }
  return dispatch =>{
    reqRegister(user)
      .then(res =>{
        const {code, data} = res.data;
        if (code === 0){
          const url = path(user.type, '');
          dispatch(reqSuccess({...data, url:url, msg:''}));
        }else {
          dispatch(errMsg({msg:data}));
        }
      })
      .catch(err =>{
        console.log(err);
        dispatch(errMsg({msg:REQ_ERR}));
      })
  }
}
//处理登录的请求
export const loginUser = (user) =>{
  const {username, password} = user;
  if(!username){
    return errMsg({msg:USER_NAME_ERR});
  } else if (!password) {
    return errMsg({msg: PASSWORD_ERR});
  }
  return dispatch =>{
    reqLogin(user)
      .then(res =>{
        const {code, data} = res.data;
        if (code === 0){
          const url = path(data.type, data.header);
          dispatch(reqSuccess({...data, url:url}));
          getChatMessageList(dispatch);
        }else {
          dispatch(errMsg({msg:data}));
        }
      })
      .catch(err =>{
        dispatch(errMsg({msg:REQ_ERR}));
      })
  }
}
//修改用户信息
export const updateUserInfo=(user)=>{
  const {header, job, salary, type, company, info} = user;
  if (!header){
    return errMsg({msg:HEADER_ERR});
  } else if (!job){
    return errMsg({msg:JOB_ERR});
  } else if (!info){
    return errMsg({msg: type==='laoban' ? LAOBAN_INFO_ERR:DASHEN_INFO_ERR});
  }
  if (type === 'laoban'){
    if (!salary){
      return errMsg({msg:SALARY_ERR});
    }else if (!company){
      return errMsg({msg: COMPANY_ERR})
    }
  }
  return dispatch =>{
    updateUser(user)
      .then(res=>{
        const {code, data} = res.data;
        if (code === 0){
          const url = path(user.type, user.header);
          dispatch(reqSuccess({...data, url:url, msg:''}));
        }else {
          dispatch(errMsg({msg:data}));
        }
      })
      .catch(err =>{
        dispatch(errMsg({msg:REQ_ERR}));
      })
  }
}
//获取用户信息 根据cookieid
export const getUserInfo =()=>{
  return dispatch =>{
    getUser()
      .then(res=>{
        const {code,data} = res.data;
        if (code === 0){
          const url = path(data.type, data.header);
          dispatch(reqSuccess({...data, url:url}));
        }else {
          dispatch(errMsg({msg:data}));
        }
      })
      .catch(err=>{
      dispatch(errMsg({msg:REQ_ERR}));
    })
  }
}

export const getUserListInfo = (type)=>{
  return dispatch =>{
    getUserList(type)
      .then(res=>{
        const {code,data} = res.data;
        if (code === 0){
          dispatch(reqUserList(data));
          getChatMessageList(dispatch);
        }else {
          dispatch(reqUserListErr({msg:data}));
        }
      })
      .catch(err=>{
        dispatch(reqUserListErr({msg:REQ_ERR}));
      })
  }
}
// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:5000');

export const sendMessage = data =>{
  return dispatch =>{
    // 引入客户端io

    // 向服务器发送消息
    socket.emit('sendMsg', data)
    console.log('浏览器端向服务器发送消息:')
  }
}
//获取聊天列表
export const chatMsgs = () =>{
  return dispatch =>{
    getChatMessageList(dispatch);
  }
}

function getChatMessageList(dispatch) {
  //调用此方法就是准备聊天 绑定监听事件  保证只绑定一次
  // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
  if (!socket.isFirst) {
    socket.isFirst = true;
    socket.on('receiveMsg', function (data) {
      console.log('浏览器端接收到消息:', data)
      //调用dispatch修改redux中状态
      dispatch(addChatToList(data))
    });
  }
  getChatList()
    .then( res=>{
      const {code,data} = res.data;
      if (code === 0){
        dispatch(reqChatList(data));
      } else {
        dispatch(reqChatListErr({msg:data}));
      }
    })
    .catch( err =>{
      dispatch(reqChatListErr({msg:REQ_ERR}));
    } )
}

//改变聊天信息列表为已读状态
export const updateReadMessageSYNC = to => {
  return dispatch =>{
    updateReadMessage({to})
      .then(res=>{
        const {code,data} = res.data;
        if (code === 0){
          dispatch(updateReadeCount({data,to}));
        } else {
          dispatch(updateReadeCountErr({msg:data}));
        }
      })
      .catch(err =>{
        console.log(err);
        dispatch(updateReadeCountErr({msg:REQ_ERR}));
      })
  }
}