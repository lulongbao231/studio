# DESCRIPTION

文本区域（Text Area）是带有标签和光标的 Widget。可以对其进行添加文本或字符。长行会被换行，当文本变得足够长时，文本区域可以滚动。

支持单行模式和密码模式。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/textarea.html)

# PROPERTIES

## Text

要显示的文本。

## Text type

这里我们可以选择 `Text` 项由表达式计算。

## Placeholder

可以指定占位符文本——当 `Text` 区域为空时显示。

## One line mode

如果启用，则 `Text` 区域配置为单行模式。在此模式下，高度自动设置以只显示一行，换行符被忽略，并禁用自动换行。

## Password mode

此选项启用密码模式。默认情况下，如果字体中存在 `•`（圆点，U+2022）字符，则在输入一段时间后或输入新字符时，已输入的字符会转换为该字符。如果字体中不存在 `•`，则将使用 `\*`。

## Accepted characters

我们可以使用此属性设置接受的字符列表。其他字符将被忽略。

## Max text length

可以使用此属性限制最大字符数。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _LVGL 部件演示_
