# DESCRIPTION

此 Widget 允许我们通过移动滑块上的旋钮从列表中选择一个或两个值。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/slider.html)

# PROPERTIES

## Min

可以选的最小值。

## Min type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Min` 可以从表达式求值。

## Max

可以选的最大值。

## Max type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Max` 可以从表达式求值。

## Mode

滑块模式选项：

-   `NORMAL` – 普通滑块。
-   `SYMMETRICAL` – 从零值到当前值绘制指示器。需要负的最小值范围和正的最大值范围。
-   `RANGE` – 允许设置起始值（`Value left` 属性）和结束值（`Value` 属性）。

## Value left

如果选择了 `RANGE` 模式，则这是滑块上选中的起始值。

## Value left type

在 `Literal` 和 `Assignable` 之间选择。如果选择 `Assignable`，则 `Value left` 可以是用于存储所选起始值的变量。

## Preview value left

这是可选属性。如果指定，则工程编辑器中 Slider 的左侧值（如果选择了 `RANGE` 模式）将是此值。

## Value

滑块上选中的值。如果选择了 `RANGE` 模式，则这是滑块上选中的结束值。

## Value type

在 `Literal` 和 `Assignable` 之间选择。如果选择 `Assignable`，则 `Value` 可以是用于存储所选值的变量。

## Preview value

这是可选属性。如果指定，则工程编辑器中 Slider 的值将是此值。

## Enable animation

如果启用，则值的变化将被动画化。动画的持续时间由样式属性（"Miscellaneous" 部分）控制：LVGL 8.4 中为 "Anim time"，LVGL 9.1 中为 "Anim duration"。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _仪表板部件演示_
