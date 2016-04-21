/**
 * Created by wangchenlong on 16/4/20.
 */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Component
  } = React;

var {width, height} = require('Dimensions').get('window');
var SIZE = 4;
var CELL_SIZE = Math.floor(width * .2);
var CELL_PADDING = Math.floor(CELL_SIZE * .05);
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * .75);

class BoardView extends Component {
//var BoardView = React.createClass({

  constructor(props) {
    super(props);
    var tilt = new Array(SIZE * SIZE);
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    this.state = {tilt};
  }


//con() {
//  var tilt = new Array(SIZE * SIZE);
//  for (var i = 0; i < tilt.length; i++) {
//    tilt[i] = new Animated.Value(0);
//  }
//  return {tilt};
//}

  render() {
    return (
      <View style={styles.container}>
        {this.renderTiles()}
      </View>
    );
  }

  renderTiles() {
    var result = [];
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col;
        var letter = String.fromCharCode(65 + key);
        var tilt = this.state.tilt[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        });
        var position = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          transform: [{perspective: CELL_SIZE * 8},
            {rotateX: tilt}]
        };
        result.push(this.renderTile(key, position, letter));
      }
    }
    return result;
  }

  renderTile(id, position, letter) {
    return (
      //<TouchableOpacity
      <Animated.View
        key={id}
        style={[styles.tile, position]}
        onStartShouldSetResponder={() => this.clickTile(id)}>
        <Text style={styles.letter}>{letter}</Text>
      </Animated.View>
      //</TouchableOpacity>
    );
  }

  clickTile(id) {
    //alert(id);
    console.log(id);
    var tilt = this.state.tilt[id];
    tilt.setValue(1);
    Animated.timing(tilt, {
      toValue: 0,
      duration: 250,
      easing: Easing.quad
    }).start();
  }
}

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent'
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent'
  }
});

module.exports = BoardView;