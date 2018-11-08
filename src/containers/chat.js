import {connect} from 'react-redux';

import {sendMessage,chatMsgs,updateReadMessageSYNC} from '../redux/action-creater';
import Chat from '../components/chat';
export default connect(
  state=>({user: state.user, chatMessage: state.chatMessage}),
  {sendMessage,chatMsgs, updateReadMessageSYNC}
)(Chat)