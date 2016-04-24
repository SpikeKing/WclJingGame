# React Native 实例 - 网格游戏

> 欢迎Follow我的GitHub: https://github.com/SpikeKing

通过编写**React Native**实例, 理解代码逻辑, 熟悉编程规范. 本文介绍**网格游戏**, 从中可以学习绘制**数组拼接页面**, 创建**动画视图**的使用方式. 多做多练多思考.

---

## 主页

引入**主页(Main)**, 使用``registerComponent``把主页注册入项目.

``` js
var Main = require('./main.js'); // 主页

// 引入模块
import React, {
  AppRegistry
} from 'react-native';

AppRegistry.registerComponent('WclJingGame', () => Main);
```

也可以使用变量(var)的形式引入模块.

``` js
var React = require('react-native');
var {
  AppRegistry
  } = React;
```

**主页(Main)**只是过渡, 显示**网格页面(BoardView)**. 主页一般管理导航信息, 处理页面的切换.

``` js
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
```

---

## 网格页

设置页面常量, 参照屏幕的宽和高设置单元格的大小.

``` js
// 屏幕的长宽
var {width, height} = require('Dimensions').get('window');

var SIZE = 4; // 每行四个

var CELL_SIZE = Math.floor(width * .2); // 每个单元格占1/5
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 间距是单元格1/20
var BORDER_RADIUS = CELL_PADDING * 2; // 圆角为1/10

var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2; // 单元格的实际显示宽度
var LETTER_SIZE = Math.floor(TILE_SIZE * .75); // 字体大小是宽度的3/4
```

> 获取屏幕宽高, ``require('Dimensions').get('window')``.

**构造器(constructor)**, 初始化**翘起(tilt)动画**的起始状态.

``` js
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
}
```

循环渲染每个小方块. 设置三个参数, key序号, position位置, letter字母. 把这三个参数传递至renderTile方法, 渲染页面, 并返回.

``` js
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
```

渲染小方块. ``key``表示数组页面的唯一值; ``style``样式使用position设置位置; ``onStartShouldSetResponder``是**动画页面(Animated.View)**的点击效果.

``` js
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
```

> 使用style的位置属性``position: 'absolute'``.

点击小方块的动画, 使用``Animated.timing``方法, 添加初始值和效果, 调用``start()``开始.

```js
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
```

效果

![Demo](https://raw.githubusercontent.com/SpikeKing/WclJingGame/master/article/jing-game-demo.png)

---

通过**网格游戏实例**学习**React Native**的**数组拼接页面**和**动画视图**, 多做多练是学习唯一途径.

> 参考我的朋友[Zhen Wang](http://blog.zmxv.com/)的文章.

OK, that's all! Enjoy it!
