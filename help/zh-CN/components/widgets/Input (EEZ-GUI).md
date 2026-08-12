# DESCRIPTION

当我们想要输入数字或文本时使用此 Widget。为使此 Widget 正常工作，工程必须定义一个用于输入文本的页面和一个用于输入数字的页面。请参阅 _示例_ 下列出的某些示例，了解这些页面是如何定义的。

# PROPERTIES

## Data

用于存储所输入数字或文本的变量。

## Default style

渲染 Widget 时使用的样式。

## Input type

选择输入的是 `Number` 还是 `Text`。

## Min

如果 `Input type` 设置为 `Number`，则此数字表示需要输入的最小数字；如果设置为 `Text`，则此属性表示需要输入的最少字符数。

## Max

如果 `Input type` 设置为 `Number`，则此数字表示需要输入的最大数字；如果设置为 `Text`，则此属性表示需要输入的最大字符数。

## Precision

如果 `Input type` 设置为 `Number`，则此属性定义所输入数字的精度。如果输入了精度更高（更多小数位）的数字，则该数字将被四舍五入到此精度。例如，如果我们将其设置为 `0.01`，则该数字将四舍五入到两位小数。

## Unit

如果 `Input type` 设置为 `Number`，则此属性定义将使用的单位，即打印在数值右侧的单位。

## Password

如果 `Input type` 设置为 `Text` 且输入的是密码，则应启用此属性，这样输入密码时显示的是 `*` 而不是字符。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
* _stm32f469i-disco-eez-flow-demo_
