import React, {Component} from 'react';

import logo from './job.png';
import './index.less';

class Logo extends Component {

  render() {

    return (
      <div className="logo-container">
        <img className="logo-img" src={logo} alt="logo"/>
      </div>
    )
  }
}

export default Logo