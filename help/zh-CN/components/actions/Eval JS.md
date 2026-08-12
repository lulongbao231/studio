# DESCRIPTION

它对一个 JavaScript 表达式求值，并通过 `result` 输出发送结果。

# PROPERTIES

## Expression

要计算的 JavaScript 表达式。写在花括号内的 EEZ Flow 表达式可以插入到表达式内的多个位置。
例如，在 JavaScript 表达式 `Math.random() * {num_items}` 中，`{num_items}` 是一个 Flow 表达式，即它从 Flow 中取得 `num_items` 变量的值，然后将其交给 JavaScript 去计算完整的表达式。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## result

通过此输出发送 JavaScript 表达式求值的结果。默认情况下，输出的 `Type` 设置为 `any`，因此最好将其更改为特定类型。

# EXAMPLES [EMPTY]
