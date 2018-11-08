import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//开发工具  浏览器中查看redux状态  上线手动去除
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));