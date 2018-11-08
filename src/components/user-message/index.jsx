import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace} from "antd-mobile";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const Header = Card.Header;
const Body = Card.Body;
class UserMessage extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }
  goMessage =()=>{

  }
  render() {
    const {company, job, salary, header, username, info, _id} = this.props.item;
    return (
      <WingBlank>
        <div onClick={()=> this.props.history.push(`/chat/${_id}`)}>
          <WhiteSpace/>
            <Card >
              <Header
                thumb={require(`../../assets/avatars/${header}.png`)}
                extra={username}
              />
              <Body>
                <div>职位: {job}</div>
                {company?<div>公司：{company}</div>:''}
                {salary?<div>公司：{salary}</div>:''}
                <div>描述：{info}</div>
              </Body>
            </Card>
        </div>
      </WingBlank>
    )
  }
}

export default withRouter(UserMessage);