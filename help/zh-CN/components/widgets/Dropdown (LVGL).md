# DESCRIPTION

下拉列表允许用户从列表中选择一个值。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/dropdown.html)

# PROPERTIES

## Options

选项列表。

## Options type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Literal`，则 `Options` 每行输入一个选项。如果选择 `Expression`，则从 `Options` 表达式求值选项，该表达式必须是 `array:string` 类型。

## Selected

所选选项的从零开始的索引。

## Selected type

在 `Literal` 和 `Assignable` 之间选择。如果选择 `Assignable`，则 `Options` 可以是用于存储所选选项从零开始索引的变量。

## Direction

列表可以出现在任意一侧。如果列表在垂直方向上超出屏幕，它将对齐到边缘。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _仪表板部件演示_
