import {connect} from 'react-redux';

import Dashen from '../components/dashen';
import {getUserListInfo} from '../redux/action-creater';

export default connect(
  state =>({userList: state.userList}),
  {getUserListInfo}
)(Dashen);