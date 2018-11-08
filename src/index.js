import React from "react";
import ReactDom from 'react-dom';
import {HashRouter, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import Register from "./containers/register";
import Login from "./containers/login";
import store from './redux/store';
import Main from './containers/main'

import './assets/index.less';

ReactDom.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route component={Main}/>
      </Switch>
    </HashRouter>
  </Provider>

),document.getElementById('root'))