import {connect} from 'react-redux';

import NavFooter from '../components/nav-footer';
import {withRouter} from "react-router-dom";

export default withRouter(connect(
  state=>({unReadCount: state.chatMessage.unReadCount})
)(NavFooter));