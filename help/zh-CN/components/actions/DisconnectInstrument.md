# DESCRIPTION

发起与仪器的异步断开连接，即此 Action 不会等待与仪器断开连接后才退出到 `seqout`，而是立即退出。我们可以使用 `instrument_variable.isConnected` 检查是否已断开连接。例如，我们可以在 _Watch_ Action 中监视此表达式，以捕获与仪器断开连接的时机。

# PROPERTIES

## Instrument

要断开连接的仪器对象。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES [EMPTY]
