import {connect} from 'react-redux';

import Register from '../components/register';
import {registerUser} from '../redux/action-creater'

export default connect(
  state =>({user: state.user}),
  {
    registerUser
  }
)(Register);