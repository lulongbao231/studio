# DESCRIPTION

与 `Text` Widget 类似，但它有一些额外的选项，通过 `Display option` 和 `Refresh rate` 属性设置。

# PROPERTIES

## Data

一个表达式，计算时会被转换为字符串并显示在 Widget 内部。

## Default style

渲染 Widget 时使用的样式。

## Focused style

Widget 处于聚焦状态时用于渲染的样式。

## Display option

如果计算出的 `Data` 是浮点数，则我们可以使用此属性选择显示浮点数的哪一部分：

- `All` – 显示整个浮点数
- `Integer` – 仅显示数字的整数部分
- `Fraction` – 仅显示数字的小数部分

## Refresh rate

此属性定义该 Widget 内容刷新的频率。以毫秒为单位设置。如果 `Data` 以很高的频率变化，并且该 Widget 的内容以该频率更新（例如 Refresh rate 设置为 `0`），则会难以看清内容，因此建议提高 Refresh rate，例如设为 200 毫秒。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
