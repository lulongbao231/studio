# DESCRIPTION

用于显示文本的 Widget。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/label.html)

# PROPERTIES

## Text

要显示的文本。

## Text type

这里我们可以选择 `Text` 属性是否将由表达式计算。

## Preview value

这是可选属性。如果指定，则工程编辑器中 Label 的内容将是此值，而不是在 Text 属性中输入的表达式的值。

## Long mode

如果为 `Width` 和 `Height` 选择了 `content`，则此选项无效，因为 Widget 的尺寸将自动设置为容纳全部文本；但如果 Widget 的尺寸是手动设置的（`px` 或 `%`），则此选项用于定义文本在不适合 Widget 边界时被拆分的方式之一：

-   `WRAP` – 对过长的行进行换行。如果 `Height` 设置为 `content`，则会扩展高度，否则文本将被裁剪（默认）。
-   `DOT` – 用点替换标签右下角的最后 3 个字符。
-   `SCROLL` – 如果文本比标签宽，则水平来回滚动。如果文本比标签高，则垂直滚动。只滚动一个方向，水平滚动具有更高优先级。
-   `SCROLL_CIRCULAR` – 如果文本比标签宽，则水平连续滚动。如果比标签高，则垂直滚动。只滚动一个方向，水平滚动具有更高优先级。
-   `CLIP` – 直接裁剪标签外部的文本部分。

## Recolor

如果启用，则我们可以在文本中使用命令对文本的部分进行重新着色。例如："Write a #ff0000 red# word"。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES [EMPTY]
