# DESCRIPTION

Scale（刻度盘）允许你拥有一个具有范围并可自定义样式分段的线性刻度。

[更多信息](https://docs.lvgl.io/master/widgets/scale.html)

# PROPERTIES

## Scale mode

定义刻度的位置和方向。

## Min value

刻度范围的最小值。

## Min value type

定义 `Min value` 将作为 Literal 还是 Expression 提供。

## Max value

刻度范围的最大值。

## Max value type

定义 `Max value` 将作为 Literal 还是 Expression 提供。

## Angle range

刻度以度为单位的角度跨度。例如，`270` 表示刻度跨越 270 度。

## Rotation

相对于 0 度位置的偏移（以度为单位）。

## Rotation type

定义 `Rotation` 将作为 Literal 还是 Expression 提供。

## Total tick count

设置刻度总数。

## Major tick every

配置每 Nth 个刻度出现一个主刻度。

## Post draw

如果启用，刻度将在子对象绘制之后绘制。当刻度将指针作为子对象并且刻度应绘制在指针之上时，这可能很有用。

## Draw ticks on top

如果启用，刻度将绘制在主直线或圆弧之上。

## Show labels

如果应绘制标签，则设置为 true。

## Label texts

逗号分隔的自定义标签文本列表，用于替代自动生成的数字标签。

## Main styles

主直线/圆弧样式属性的节标题。

## Main line width

主直线以像素为单位的宽度。仅对直线刻度模式（`HORIZONTAL_TOP`、`HORIZONTAL_BOTTOM`、`VERTICAL_LEFT`、`VERTICAL_RIGHT`）可见。

## Main line color

主直线的颜色。仅对直线刻度模式可见。

## Main line opacity

主直线的透明度（0-255）。仅对直线刻度模式可见。

## Main arc width

主圆弧以像素为单位的宽度。仅对圆形刻度模式（`ROUND_INNER`、`ROUND_OUTER`）可见。

## Main arc color

主圆弧的颜色。仅对圆形刻度模式可见。

## Main arc opacity

主圆弧的透明度（0-255）。仅对圆形刻度模式可见。

## Main arc rounded

如果启用，主圆弧的两端将是圆形的。仅对圆形刻度模式可见。

## Main arc image

用作主圆弧图像来源的位图。仅对圆形刻度模式可见。

## Minor ticks styles

小刻度样式属性的节标题。

## Minor ticks length

小刻度以像素为单位的长度。

## Minor ticks width

小刻度以像素为单位的宽度。

## Minor ticks color

小刻度的颜色。

## Minor ticks opacity

小刻度的透明度（0-255）。

## Major ticks styles

主刻度样式属性的节标题。

## Major ticks length

主刻度以像素为单位的长度。

## Major ticks width

主刻度以像素为单位的宽度。

## Major ticks color

主刻度的颜色。

## Major ticks opacity

主刻度的透明度（0-255）。

## Labels styles

标签样式属性的节标题。

## Labels text color

标签文本的颜色。

## Labels text opacity

标签文本的透明度（0-255）。

## Labels text font

用于标签文本的字体。可以是内置的 LVGL 字体，也可以是工程中定义的自定义字体。

## Sections

刻度分段列表。每个分段定义刻度的一个范围并具有自定义样式。分段可以有自己的最小值/最大值，以及该范围内主直线/圆弧、小刻度、主刻度和标签的自定义样式。也可以通过 `Use style` 属性将为 Scale Widget 创建的样式分配给分段。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _Scale_
