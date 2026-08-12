# DESCRIPTION

对设置的表达式求值，如果为 `true`，则 Flow 执行通过 `Yes` 输出继续，否则通过 `No` 输出继续。这两个输出中至少有一个必须通过连线连接到某个输入。

默认情况下，当此动作添加到 Flow 时，会添加一个 `Value` 输入，并测试它是 `true` 还是 `false`。如果我们想要测试其他表达式，则应在属性的 Flow 部分中删除该输入，并输入我们想要的表达式。

# PROPERTIES

## Value

其结果被测试的表达式。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## Yes

如果表达式的值为 `true`，则用于继续 Flow 执行的输出。

## No

如果表达式的值为 `false`，则用于继续 Flow 执行的输出。

# EXAMPLES [EMPTY]
