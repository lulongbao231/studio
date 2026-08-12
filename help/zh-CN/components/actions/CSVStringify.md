# DESCRIPTION

将 Flow 值转换为 CSV 字符串，并发送到 `result` 输出。

# PROPERTIES

## Input

将转换为 CSV 字符串的 Flow 值。

## Delimiter

定义用于分隔 CSV 记录内字段的字符。默认分隔符是 `","`。

## Header

如果设置为 `True`，则第一条记录将包含列名。

## Quoted

如果设置为 `True`，则所有非空字段都将加引号，即使没有任何需要引号的字符。

# INPUTS

## seqin

一个标准顺序输入。

## input

要转换为 CSV 字符串的 Flow 值通过此输入接收。如果不需要此输入，可以将其删除（在 Flow - inputs 列表中删除），即如果我们想要解析通过 `Input` 属性设置的任意表达式求值而获得的字符串。

# OUTPUTS

## seqout

一个标准顺序输出。

## result

构造的 CSV 字符串通过此输出发送。

# EXAMPLES

- _CSV_
