import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore.js';
import AsyncApp from './AsyncApp.jsx';

//fonticons is quite a big bundle, i'm using it for dev
import fontIcons from  'font-awesome/scss/font-awesome.scss';
import stylesheet from '../scss/app.scss';

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}