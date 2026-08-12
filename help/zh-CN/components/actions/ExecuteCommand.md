# DESCRIPTION

此动作用于执行外部命令（即程序），该命令可以位于 PATH 中，也可以指定命令的完整路径。

# PROPERTIES

## Command

命令的名称，即要执行的命令的完整文件路径。

## Arguments

传递给命令的字符串参数数组。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## stdout

`stdout` 的 `stream` 值通过此输出发送。该 `stream` 值可以使用 _CollectStream_ Action 收集为字符串，重定向到 _Terminal_ Widget，使用 _RegExp_ Action 解析等。

## stderr

`stderr` 的 `stream` 值通过此输出发送。该 `stream` 值可以使用 _CollectStream_ Action 收集为字符串，重定向到 _Terminal_ Widget，使用 _RegExp_ Action 解析等。

## finished

如果命令成功完成，则 Flow 执行通过此输出继续。如果发生错误，则会抛出一个错误，如果启用了 `Catch error`，则可以捕获该错误。

# EXAMPLES

- _正则流_
