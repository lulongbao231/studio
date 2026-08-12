# DESCRIPTION

此 Widget 用于显示图像。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/img.html)

# PROPERTIES

## Image

要显示的位图的名称。

## Change pivot point (default is center)

如果启用，则指定图像枢轴点的 X 和 Y 坐标。

## Pivot X

旋转中心的 X 位置。如果留空，则旋转中心位于 Widget 的中间。

## Pivot Y

旋转中心的 Y 位置。如果留空，则旋转中心位于 Widget 的中间。

## Scale

缩放系数。将系数设置为 `256` 以禁用缩放。较大的值放大图像（例如 `512` 为两倍大小），较小的值缩小图像（例如 `128` 为一半大小）。也支持小数缩放，例如 `281` 表示放大 10%。

## Rotation

旋转角度，角度具有 0.1 度的精度，因此 45.8° 应设置为 `458`。图像绕由 `Pivot X` 和 `Pivot Y` 属性定义的中心点旋转。

## Inner align

默认情况下，图像 Widget 的宽度和高度会根据图像源自动调整大小。如果设置了 Widget 的宽度或高度为较大值，则此 inner_align 属性说明如何在 Widget 内对齐图像源。

## Size mode

控制图像在 Widget 内的尺寸处理方式（仅限 LVGL 8.x）。

- **VIRTUAL**（默认）：Widget 的尺寸自动调整以匹配图像源的尺寸。
- **REAL**：无论 Widget 的尺寸如何，图像都以其实际尺寸显示。

## Value

刻度上的指针值。仅当 Image widget 用作 Scale widget 的子项时（刻度指针模式），此属性才可见。

## Value type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Value` 可以从表达式求值。此属性仅在刻度指针模式下可见。

## Preview value

这是可选属性。如果指定，则工程编辑器中 Image 的指针值将是此值。仅当 `Value type` 设置为 `Expression` 时可用。此属性仅在刻度指针模式下可见。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _LVGL 部件演示_
