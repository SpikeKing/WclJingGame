/**
 * 简单的井字游戏联系
 * https://github.com/facebook/react-native
 * @flow
 */

var Main = require('./main.js'); // 主页

// 引入模块
import React, {
  AppRegistry
} from 'react-native';

//var React = require('react-native');
//var {
//  AppRegistry
//  } = React;

AppRegistry.registerComponent('WclJingGame', () => Main);
