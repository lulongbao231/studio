# DESCRIPTION

Line（线条）对象能够在一组点之间绘制直线。

[更多信息](https://docs.lvgl.io/master/widgets/line.html)

# PROPERTIES

## Points

以以下形式给出的点的列表：`x1,y1 x2, y2 x3, y3 ...`，例如：`0,0 50,50 100,0 150,50 200,0`

## Invert Y

默认情况下，y == 0 的点位于对象顶部。在某些情况下这可能与直觉相反，因此可以通过此属性反转 y 坐标。在这种情况下，y == 0 将是对象的底部。默认情况下 y 反转是禁用的。

## Needle length

指针线条的长度，以像素为单位。仅当 Line widget 用作 Scale widget 的子项时（刻度指针模式），此属性才可见。

## Value

刻度上的指针值。仅当 Line widget 用作 Scale widget 的子项时（刻度指针模式），此属性才可见。

## Value type

在 `Literal` 和 `Expression` 之间选择。如果选择 `Expression`，则 `Value` 可以从表达式求值。此属性仅在刻度指针模式下可见。

## Preview value

这是可选属性。如果指定，则工程编辑器中 Line 的指针值将是此值。仅当 `Value type` 设置为 `Expression` 时可用。此属性仅在刻度指针模式下可见。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _Scale_
