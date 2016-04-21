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
        var position = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING
        };
        result.push(this.renderTile(key, position, letter));
      }
    }
    return result;
  }

  renderTile(id, position, letter) {
    return (
      <TouchableOpacity
        key={id}
        onPress={() => this.clickTile(id)}>
        <View style={[styles.tile, position]}>
          <Text style={styles.letter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  clickTile(id) {
    //alert(id);
    console.log(id);
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