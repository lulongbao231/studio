# DESCRIPTION

此 Widget 显示具有不同样式的文本片段。它允许组合多个文本片段（spans），并为每个片段设置单独的格式。

[更多信息](https://docs.lvgl.io/master/widgets/spangroup.html)

# PROPERTIES

## Mode

文本换行和布局模式（仅限 LVGL 8.4.0 和 9.2.2）：

- `FIXED`（默认）– 文本以固定方式布局，不换行。
- `EXPAND` – 文本扩展以填充可用空间。
- `BREAK` – 文本换行为多行。

## Overflow

处理文本溢出 Widget 边界的方式：

- `CLIP`（默认）– 溢出的文本被裁剪。
- `ELLIPSIS` – 溢出的文本被替换为省略号（"…"）。

## Indent

文本布局的缩进，以像素为单位。

## Max lines

要显示的最大行数。使用 `-1` 允许无限行。

## Align

文本在 Widget 内的对齐方式（仅限 LVGL 8.4.0 和 9.2.2）：

- `AUTO`（默认）– 根据语言方向自动对齐。
- `LEFT` – 文本左对齐。
- `CENTER` – 文本居中对齐。
- `RIGHT` – 文本右对齐。

## Spans

文本片段数组。每个片段可以有自己的文本内容以及单独的样式（颜色、字体、装饰、字/行间距、不透明度）。

# INPUTS

# OUTPUTS

# EXAMPLES [EMPTY]
