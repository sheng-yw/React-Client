import React, {Component} from 'react';
import { Card } from 'antd-mobile';
import PropTypes from 'prop-types';

import UserMessage from '../user-message';
class Laoban extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
    getUserListInfo: PropTypes.func.isRequired
  }
  componentDidMount =()=>{
    this.props.getUserListInfo({type: 'dashen'});
  }
  render() {
    const {userList} = this.props;
    return (
      <div >
        {
          userList.map( (item, index) => <UserMessage item={item} key={index}/> )
        }
      </div>)
  }
}

export default Laoban