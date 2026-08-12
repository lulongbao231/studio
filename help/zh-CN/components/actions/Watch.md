# DESCRIPTION

在 Flow 执行的整个持续时间内，此动作在后台对默认表达式求值，如果结果发生变化，则将其转发到数据输出。在开始时（Flow 启动时）会对表达式求值并转发到数据输出，之后仅在发生某些变化时才转发。

# PROPERTIES

## Expression

要计算的表达式。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## changed

所计算表达式的值在开始时传递一次，之后仅在结果发生某些变化时传递。

# EXAMPLES [EMPTY]
