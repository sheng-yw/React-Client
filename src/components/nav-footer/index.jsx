import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;
class NavFooter extends Component {
  static propTypes = {
    navList : PropTypes.array.isRequired,
    unReadCount : PropTypes.number.isRequired
  }

  render() {
    //获取当前的路径名
    const {pathname} = this.props.location;
    const {navList} = this.props;
    const newNavList = navList.filter( item => !item.hide);
    return (
      <div  clasName="nav-footer-fixed">
        <TabBar>
          {
            newNavList.map((item,index)=>{
            return <Item title={item.title} key={index}
                    icon={{uri:require(`./images/${item.icon}.png`)}}
                    selectedIcon={{uri:require(`./images/${item.icon}-selected.png`)}}
                    selected = {pathname === item.path}
                    onPress={()=>this.props.history.replace(item.path)}
                    badge={item.path === '/message'? this.props.unReadCount : 0}
              />
            })
          }
        </TabBar>
      </div>
    )
  }
}

export default NavFooter;