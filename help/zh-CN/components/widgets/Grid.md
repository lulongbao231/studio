# DESCRIPTION

当你想要在网格内多次显示同一个 Widget 时，使用此 Widget。此 Widget 下面有一个子 Widget，它显示的次数取决于 `Data` 属性。

根据 `Grid flow` 属性，被乘的 Widget 可以先按行填充：

![Alt text](../images/grid_row_flow.png)

...或按列填充：

![Alt text](../images/grid_column_flow.png)

如果被乘的 Widget 始终具有相同的内容，那就不太有用了，因此有一个系统变量 `$index` 告诉我们 Widget 的渲染顺序。该变量从零开始，也就是说当它的值为 0 时渲染第一个 Widget，值为 1 时渲染第二个 Widget，依此类推。然后可以在子 Widget 属性的表达式中使用该 `$index`，通过这种方式可以让每个渲染出的 Widget 具有不同的内容（例如，上面显示的内容是这样创建的：我们为 `Text` Widget 定义了显示的文本由以下表达式计算得出：`"Widget #" + $index`）。

# PROPERTIES

## Data

确定子 Widget 将被乘多少次，即网格中的元素数量。此属性的值可以是整数，此时它就是元素数量；如果此属性的值是数组，则列表中的元素数量等于该数组中的元素数量。

对于 _EEZ-GUI_ 工程，此属性的值也可以是 `struct:$ScrollbarState`。`ScrollBar` Widget 使用相同的结构，可以通过 `struct:$ScrollbarState` 变量连接到 `Grid` Widget，从而在列表元素总数大于 `Grid` Widget 内可容纳的元素数量时启用列表滚动。

关于 `struct:$ScrollbarState` 系统结构的更多信息，请参阅 `ScrollBar` Widget 文档。

## Default style

渲染 Widget 背景时使用的样式。

## Item widget [EMPTY]


## Grid flow

定义网格的填充方式。如果我们希望逐行填充，则需要选择 `Row`。如果我们希望逐列填充，则选择 `Column`。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _eez-gui-widgets-demo_
-   _Tetris_
