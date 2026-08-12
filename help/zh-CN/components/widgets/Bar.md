# DESCRIPTION

条（bar）对象有背景和其上的指示器。指示器的宽度根据条的当前值设置。

如果对象的宽度小于其高度，则可以创建垂直条。

不仅可以设置条的结束值，还可以设置起始值，这会改变指示器的起始位置。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/bar.html)

# PROPERTIES

## Min

`Value` 和 `Value start` 可以包含的最小值。

## Min type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Min` 可以从表达式求值。

## Max

`Value` 和 `Value start` 可以包含的最大值。

## Max type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Max` 可以从表达式求值。

## Mode

条模式选项：

-   `NORMAL` – 普通条。
-   `SYMMETRICAL` – 从零值到当前值绘制指示器。需要负的最小值范围和正的最大值范围。
-   `RANGE` – 允许设置起始值（`Value start` 属性）和结束值（`Value` 属性）。

## Value

条上的结束值。

## Value type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Value` 可以从表达式求值。

## Preview value

这是可选属性。如果指定，则工程编辑器中条的值将是此值。仅当 `Value type` 设置为 `Expression` 时可用。

## Value start

如果选择了 `RANGE` 模式，则这是条上的起始值。

## Value start type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Value start` 可以从表达式求值。

## Preview value start

这是可选属性。如果指定，则工程编辑器中条的起始值将是此值。仅当 `Value start type` 设置为 `Expression` 且 `Mode` 设置为 `RANGE` 时可用。

## Enable animation

如果启用，则值的变化将被动画化。动画的持续时间由样式属性（"Miscellaneous" 部分）控制：LVGL 8.4 中为 "Anim time"，LVGL 9.1 中为 "Anim duration"。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _仪表板部件演示_
