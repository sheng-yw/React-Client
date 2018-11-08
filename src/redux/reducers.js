import {combineReducers} from 'redux'
import {REQ_SUCCESS, ERR_MSG, REQ_USER_LIST,
  REQ_CHAT_LIST, REQ_CHAT_LIST_ERR,REQ_USER_LIST_ERR,
  ADD_CHAT_TO_LIST, UPDATE_READE_COUNT, UPDATE_READE_COUNT_ERR} from './action-types'
import Cookies from 'js-cookie';
const initUserState = {
  type: '',
  url: '',
  username:'',
  header: ''
}

function user(preState = initUserState, action={}){
  switch (action.type) {
    case REQ_SUCCESS:
      return action.data;
    case ERR_MSG:
      return action.data;
    default :
      return preState;
  }
}
const initUserList = [];

function userList(preState = initUserList, action){
  switch (action.type) {
    case REQ_USER_LIST:
      return action.data;
    case REQ_USER_LIST_ERR:
      return action.data;
    default :
      return preState;
  }
}

const initChatList = {
  chatList:[],
  users:{},
  unReadCount:0
}
function chatMessage(preState = initChatList, action){
  const userId = Cookies.get('user_id');
  switch (action.type) {
    case REQ_CHAT_LIST:
      //计算总的未读数
      const count = action.data.chatList.reduce((pre, current)=>{
        const num = (current.to === userId && current.reade === false) ? 1 :0;
        return pre+num;
      },0);
      return{...action.data, unReadCount : count};
    case REQ_CHAT_LIST_ERR:
      return action.data;
    case ADD_CHAT_TO_LIST:
      return {
        users: preState.users,
        chatList:[...preState.chatList,action.data],
        unReadCount:0
      };
    case UPDATE_READE_COUNT:
      const {to,data} = action.data;
      const newList = preState.chatList.map(item=>{
        if (item.from === to && item.to === userId ){
          item.reade = true;
          return item
        }
        return item;
      });
      const newCount = preState.unReadCount - data.n;
      return {users:preState.users,chatList:newList,unReadCount:newCount};
    case UPDATE_READE_COUNT_ERR:
      return action.data;
    default :
      return preState;
  }
}

export default combineReducers({
  user,
  userList,
  chatMessage
})

