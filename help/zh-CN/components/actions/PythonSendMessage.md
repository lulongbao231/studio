# DESCRIPTION

从 Flow 向正在运行的 Python 脚本发送消息。

# PROPERTIES

## Handle

在 _PythonRun_ 动作执行期间获得的句柄，用于确定我们想要向哪个脚本发送消息，因为可以同时执行多个脚本。

## Message

要发送的消息。

# INPUTS

## seqin

一个标准顺序输入。

## handle

句柄也可以通过此输入传递。如果句柄以其他方式获得，例如通过 `Handle` 属性从变量中获得，则可以在"Flow - Inputs"部分中删除此输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

- _图表_
