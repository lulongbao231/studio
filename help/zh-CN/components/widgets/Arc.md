# DESCRIPTION

Arc 由背景弧和前景弧组成。前景（指示器）可以通过触摸调整。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/arc.html)

# PROPERTIES

## Range min

可由 `Value` 属性选择的最小值。

## Range min type

定义 `Range min` 将作为 Literal 还是 Expression 提供。

## Range max

可由 `Value` 属性选择的最大值。

## Range max type

定义 `Range max` 将作为 Literal 还是 Expression 提供。

## Value

在 `Range min` 和 `Range max` 给定的范围内，设置前景（指示器）弧相对于背景弧大小的值。

## Value type

定义 `Value` 将作为 Literal 还是 Expression 提供。

## Preview value

这是可选属性。如果指定，则工程编辑器中 Arc 的值将为此值。仅在 `Value type` 设置为 `Expression` 时可用。

## Mode

Arc 可以是以下模式之一：

-   `NORMAL` – 指示器弧从最小值绘制到当前值。
-   `REVERSE` – 指示器弧从最大值逆时针绘制到当前值。
-   `SYMMETRICAL` – 指示器弧从中点绘制到当前值。

## Bg start angle

背景弧的起始角度。零度位于对象的中间右侧（3 点钟方向），角度沿顺时针方向递增。角度应在 `[0, 360]` 范围内。

## Bg start angle type

定义 `Bg start angle` 将作为 Literal 还是 Expression 提供。

## Preview bg start angle

这是可选属性。如果指定，则工程编辑器中 Arc 的背景起始角度将为此值。仅在 `Bg start angle type` 设置为 `Expression` 时可用。

## Bg end angle

背景弧的结束角度。零度位于对象的中间右侧（3 点钟方向），角度沿顺时针方向递增。角度应在 `[0, 360]` 范围内。

## Bg end angle type

定义 `Bg end angle` 将作为 Literal 还是 Expression 提供。

## Preview bg end angle

这是可选属性。如果指定，则工程编辑器中 Arc 的背景结束角度将为此值。仅在 `Bg end angle type` 设置为 `Expression` 时可用。

## Rotation

相对于 0 度位置的偏移。

## Rotation type

定义 `Rotation` 将作为 Literal 还是 Expression 提供。

## Preview rotation

这是可选属性。如果指定，则工程编辑器中 Arc 的旋转角度将为此值。仅在 `Rotation type` 设置为 `Expression` 时可用。

## Use start/end angle

启用后，弧将直接由起始角度和结束角度控制，而不是由范围内的值控制。`Range min`、`Range max`、`Value` 和 `Mode` 属性将被隐藏，而显示 `Start angle` 和 `End angle` 属性。

## Show note about use angle

显示一条说明，指导如何使弧不可调整：将旋钮的不透明度（在 Miscellaneous 样式部分中）设置为 0，并使弧不可点击（取消勾选"Clickable"标志）。仅在启用 `Use start/end angle` 时可见。

## Start angle

前景（指示器）弧的起始角度。零度位于对象的中间右侧（3 点钟方向），角度沿顺时针方向递增。角度应在 `[0, 360]` 范围内。仅在启用 `Use start/end angle` 时可见。

## Start angle type

定义 `Start angle` 将作为 Literal 还是 Expression 提供。

## Preview start angle

这是可选属性。如果指定，则工程编辑器中 Arc 的起始角度将为此值。仅在 `Start angle type` 设置为 `Expression` 时可用。

## End angle

前景（指示器）弧的结束角度。零度位于对象的中间右侧（3 点钟方向），角度沿顺时针方向递增。角度应在 `[0, 360]` 范围内。仅在启用 `Use start/end angle` 时可见。

## End angle type

定义 `End angle` 将作为 Literal 还是 Expression 提供。

## Preview end angle

这是可选属性。如果指定，则工程编辑器中 Arc 的结束角度将为此值。仅在 `End angle type` 设置为 `Expression` 时可用。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _Arc_
-   _LVGL 部件演示_
-   _智能家居_
