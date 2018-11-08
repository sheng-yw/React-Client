import {connect} from 'react-redux';

import Main from '../components/main';
import {getUserInfo} from '../redux/action-creater';
export default connect(
  state=>({user: state.user}),
  {
    getUserInfo
  }
)(Main);