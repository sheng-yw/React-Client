import {connect} from 'react-redux';

import Login from '../components/login';
import {loginUser} from '../redux/action-creater'

export default connect(
  state =>({user: state.user}),
  {
    loginUser
  }
)(Login);