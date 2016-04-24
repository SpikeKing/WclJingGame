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

// 屏幕的长宽
var {width, height} = require('Dimensions').get('window');

var SIZE = 4; // 每行四个

var CELL_SIZE = Math.floor(width * .2); // 每个单元格占1/5
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 间距是单元格1/20
var BORDER_RADIUS = CELL_PADDING * 2; // 圆角为1/10

var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2; // 单元格的实际显示宽度
var LETTER_SIZE = Math.floor(TILE_SIZE * .75); // 字体大小是宽度的3/4

class BoardView extends Component {
  /**
   * 构造器, 初始化翘起状态
   * @param props 状态
   */
  constructor(props) {
    super(props);
    var tilt = new Array(SIZE * SIZE); // 翘起
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    this.state = {tilt};
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTiles()}
      </View>
    );
  }

  /**
   * 渲染每个小方块, 设置参数, 把参数发送至renderTile.
   *
   * @returns {Array} 渲染数组
   */
  renderTiles() {
    var result = [];
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col; // 字母顺序
        var letter = String.fromCharCode(65 + key); // 对于字母

        // 翘起变化的差值
        var tilt = this.state.tilt[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        });

        // 位置
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

  /**
   * 渲染小方块
   * @param id 唯一属性
   * @param position 位置
   * @param letter 字母
   * @returns {XML} 单个小方块页面
   */
  renderTile(id, position, letter) {
    return (
      <Animated.View
        key={id}
        style={[styles.tile, position]}
        onStartShouldSetResponder={() => this.clickTile(id)}>
        <Text style={styles.letter}>{letter}</Text>
      </Animated.View>
    );
  }

  /**
   * 点击事件
   * @param id 位置
   */
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