# DESCRIPTION

此 Widget 通过 `Data` 属性以条和文本（如果选择）的形式显示默认值。另外，如果设置了，它还会在默认位置（`Threshold1` 和 `Threshold2`）显示两条线，例如用来标记某些临界值。

# PROPERTIES

## Data

这是 `[Min, Max]` 范围内的值，将为其渲染条和文本。

## Default style

渲染 Widget 时使用的样式。

## Orientation

定义 Widget 的方向，可用的选项如下：

- `Left right` – 随着通过 `Data` 设置的值从 Min 增加到 Max，图表内的条也从左侧向右侧增长。
- `Right left` – 条从右向左增长
- `Top bottom` – 条从上向下增长
- `Bottom top` – 条从下向上增长

## Display value

勾选后，`Data` 值也将以文本形式显示。

## Threshold1

`[Min, Max]` 范围内的可选值，将在其位置用默认样式（`Threshold1`）绘制一条线。它用于在条形图内标记某个临界/重要的值。

## Threshold2

`[Min, Max]` 范围内的可选值，将在其位置用默认样式（`Threshold2`）绘制一条线。它用于在条形图内标记某个临界/重要的值。

## Min

`Data` 可以包含的最小值。

## Max

`Data` 可以包含的最大值。

## Refresh rate

与 `DisplayData` Widget 的情况类似，它定义了文本刷新的速度。

## Text style

用于渲染 Widget 内文本的样式。

## Threshold1 style

用于渲染 `Threshold1` 值的样式。

## Threshold2 style

用于渲染 `Threshold2` 值的样式。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
