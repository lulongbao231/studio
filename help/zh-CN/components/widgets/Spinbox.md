# DESCRIPTION

此部件仍在开发中，这意味着你可以将它添加到工程中，Studio 将生成其创建所需的全部代码；但除此之外的任何功能，你都需要在自定义代码中实现，例如在调用 `ui_init()` 之后。

[更多信息](https://docs.lvgl.io/master/widgets/spinbox.html)

# PROPERTIES

## Digit count

不包括小数分隔符和正负号的数字位数

## Separator position

小数点前的数字位数

## Min

可以选的最小值。

## Max

可以选的最大值。

## Rollover

启用/禁用循环模式。如果在启用循环的情况下达到最小值或最大值，则该值将变为另一个极限值。如果禁用循环，则该值将保持在最小值或最大值处。

## Step

将光标设置到递增/递减时要更改的特定数字。例如，位置 '1' 将光标设置到最低有效数字。只能设置 10 的倍数，例如不能设置 3。

## Step type

在 `Literal` 和 `Assignable` 之间选择。如果选择 `Assignable`，则 `Step` 可以是用于存储所选步长的变量。

## Value

Spinbox 上选中的值。

## Value type

在 `Literal` 和 `Assignable` 之间选择。如果选择 `Assignable`，则 `Value` 可以是用于存储所选值的变量。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _Spinbox_
