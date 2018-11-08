import {connect} from 'react-redux';

import LaobanInfo from '../components/laoban-info';
import {updateUserInfo} from '../redux/action-creater'

export default connect(
  state =>({user: state.user}),
  {updateUserInfo}
)(LaobanInfo);