import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes  from 'prop-types';

class HeaderSelector extends Component {

  static propTypes = {
    changeHeader : PropTypes.func.isRequired
  }
  state = {
    header :''
  }
  headerChange = ({icon, text}) =>{
    this.setState({header:icon});
    this.props.changeHeader(text);
  }
  render() {
    const data = Array.from(new Array(20)).map((_val, i) => ({
      icon: require(`../../assets/avatars/头像${i+1}.png`),
      text: `头像${i+1}`,
    }));
    const {header} = this.state;
    const content = header?<div>请选择头像<img src={header}/></div> : '请选择头像';
    return (
      <div>
        <List  renderHeader={() => content}>
        <Grid data={data} columnNum={5} onClick={this.headerChange}/>
        </List>
      </div>
    )
  }
}

export default HeaderSelector;