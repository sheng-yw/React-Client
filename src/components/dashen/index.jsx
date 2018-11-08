import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UserMessage from '../user-message';
class Dashen extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
    getUserListInfo: PropTypes.func.isRequired
  }
  componentDidMount =()=>{
    this.props.getUserListInfo({type: 'laoban'});
  }
  render() {
    const {userList} = this.props;
    return (
      <div>
        {
          userList.map( (item, index) => <UserMessage item={item} key={index}/> )
        }
      </div>)
  }
}

export default Dashen;