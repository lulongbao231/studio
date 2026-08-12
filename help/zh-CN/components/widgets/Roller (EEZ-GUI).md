# DESCRIPTION

此 Widget 允许我们通过基于触摸的滚动从列表中选择一个选项。

# PROPERTIES

## Data

用于存储在 `[Min, Max]` 范围内所选值的变量。

## Default style

渲染 Widget 背景时使用的样式。

## Min

可以选的最小值。

## Max

可以选的最大值。

## Text

为每个可能被选中的值而在 Widget 中显示的文本。

示例：将 Data 设置为 `selected_option`（类型为 `integer`），将 Min 设置为 `0`，将 Max 设置为 `Array.length(TEXTS) - 1`，其中 `TEXTS` 是类型为 `array:string`、` Default value` 设置为 `["Option 1", "Option 2", "Option 3", ...]` 的变量，然后我们可以将此属性设置为 `TEXTS[selected_option]`。

## Selected value style

用于渲染所选值的样式。

## Unselected value style

用于渲染其他（未选中的）值的样式。

# INPUTS

## clear

如果我们想要重置选择（即选择第一个选项），则需要向此输入发送一个信号。

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
