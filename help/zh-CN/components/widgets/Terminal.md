# DESCRIPTION

显示一个终端窗口，用户可以通过它输入任意文本。输入文本时，字符将逐字符通过 `onData` 输出发送。还可以通过 Flow 使用 `Data` 属性将文本输入到终端中。

# PROPERTIES

## Data

在终端窗口中输入的文本。有必要添加类型为 `string` 或 `stream` 的流输入，并将该输入的名称填到此属性中。如果流输入的类型为 `string`，则有必要向该输入发送你希望在终端中输入的字符串——这可以多次进行，即每次在该输入收到字符串时，它都会被输入到终端中。如果流输入的类型为 `stream`，则 Terminal Widget 会侦听流上是否有新数据，当新数据出现时，它会将新数据写入终端——例如，通过这种方式可以将 `ExecuteCommand` 动作的 `stdout` 或 `stderr` 输出连接到 `Terminal` Widget 上。

## Default style

渲染 Widget 时使用的样式。

# INPUTS [EMPTY]

## clear

# OUTPUTS [EMPTY]

## onData

通过此输出，输入的文本将逐字符发送。

# EXAMPLES

* _仪表板部件演示_
