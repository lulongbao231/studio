# DESCRIPTION

当你想要多次显示同一个 Widget 时，使用此 Widget。此 Widget 下面有一个子 Widget，它显示的次数取决于 `Data` 属性。被乘的 Widget 可以先按行或按列填充：

如果被乘的 Widget 始终具有相同的内容，那就不太有用了，因此有一个系统变量 `$index` 告诉我们 Widget 的渲染顺序。该变量从零开始，也就是说当它的值为 0 时渲染第一个 Widget，值为 1 时渲染第二个 Widget，依此类推。然后可以在子 Widget 属性的表达式中使用该 `$index`，通过这种方式可以让每个渲染出的 Widget 具有不同的内容（例如，`Text` Widget 可以显示取自数组变量的字符串：`country_cities [$index].country`）。

# PROPERTIES

## Data

确定子 Widget 将被乘多少次，即列表中的元素数量。此属性的值可以是整数，此时它就是元素数量；如果此属性的值是数组，则列表中的元素数量等于该数组中的元素数量。

对于 _EEZ-GUI_ 工程，此属性的值也可以是 `struct:$ScrollbarState`。`ScrollBar` Widget 使用相同的结构，可以通过 `struct:$ScrollbarState` 变量连接到 `List` Widget，从而在列表元素总数大于 `List` Widget 内可容纳的元素数量时启用列表滚动。

关于 `struct:$ScrollbarState` 系统结构的更多信息，请参阅 `ScrollBar` Widget 文档。

## Default style

渲染 Widget 背景时使用的样式。

## Item widget [EMPTY]


## List type

定义垂直或水平方向。

## Gap

两个网格元素之间以像素为单位的距离。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _eez-gui-widgets-demo_
-   _CSV_
-   _JSON_
-   _MQTT_
-   _简单 HTTP_
-   _图表_
-   _正则字符串_
-   _多语言_
