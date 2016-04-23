/**
 * Created by wangchenlong on 16/4/20.
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Component
  } = React;

// 网格页
var BoardView = require('./boardview.js');

// 主页
class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
          <BoardView/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62'
  }
});

module.exports = Main;
