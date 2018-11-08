import {connect} from 'react-redux';

import Message from '../components/message';
import {chatMsgs} from '../redux/action-creater';

export default connect(
  state =>({chatMessage: state.chatMessage,user:state.user}),
  {chatMsgs}
)(Message);