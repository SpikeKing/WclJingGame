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

var BoardView = require('./boardview.js');

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
  },
  tile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333333',
    fontSize: 80
  }
});

module.exports = Main;
