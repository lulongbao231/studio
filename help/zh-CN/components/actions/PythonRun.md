# DESCRIPTION

运行一个 Python 脚本，并将运行脚本的句柄发送到 `handle` 输出。如果我们想要停止正在运行的 Python 脚本，则在 `PythonEnd` Action 中使用此句柄；如果我们想要从 Flow 向 Python 脚本发送消息，则在 `PythonSendMessage` Action 中使用此句柄。这是必需的，因为可以在某个时间点启动多个脚本，并通过此句柄确定正在运行的脚本。

# PROPERTIES

## Script source option

Python 脚本的来源可以通过三种方式指定：

-   内联脚本（Inline script）
-   内联脚本作为表达式（Inline script as expression）
-   脚本文件（Script file）

## Inline script

如果为 `Script source option` 选择了 `Inline script`，则应在此处输入脚本的源代码。

## Inline script as expression

如果为 `Script source option` 选择了 `Inline script as expression`，则在此处需要输入一个表达式，当求值时将返回包含脚本源代码的字符串。

## Script file

如果为 `Script source option` 选择了 `Script file`，则应在此处输入 `.py` 文件的文件路径。

## Python path

python 命令的完整路径。如果 python 命令已经在系统路径中，则可以将其设置为空字符串，即 `""`。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## handle

返回在 _PythonEnd_ 和 _PythonSendMessage_ Actions 中使用的运行脚本的句柄。

## message

在正在运行的 Python 脚本中打印到 `stdout` 的所有内容都将通过此输出发送。通过这种方式，Python 脚本向 Flow 发送消息；如果 Flow 想要向 Python 脚本发送消息，则应使用 _PythonSendMessage_ Action。

# EXAMPLES

- _图表_
