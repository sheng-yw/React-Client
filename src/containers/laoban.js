import {connect} from 'react-redux';

import Laoban from '../components/laoban';
import {getUserListInfo} from '../redux/action-creater'

export default connect(
  state =>({userList: state.userList}),
  {getUserListInfo}
)(Laoban);