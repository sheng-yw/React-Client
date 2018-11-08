import {connect} from 'react-redux';

import Personal from '../components/personal';
import {reqSuccess} from '../redux/action-creater';

export default connect(
  state =>({user: state.user}),
  {
    reqSuccess
  }
)(Personal);