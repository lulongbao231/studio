# DESCRIPTION

使用此 Action，我们可以添加一个或多个可以由 TCP 套接字接收的事件处理程序。

# PROPERTIES

## Socket

我们想要在其上监听事件的套接字对象。

## Event handlers

要处理的事件列表。对于列表中的每个项，都需要选择 `Event`、`Handler type`，以及可选的 `Action`。`Event` 是我们想要处理的事件类型，可能的值有：

-   `Ready` – 当套接字准备就绪可以使用时发出。
-   `Data` – 当收到数据时发出。
-   `Close` – 当套接字完全关闭时发出。
-   `End` – 当套接字的另一端发出传输结束信号时发出，从而结束套接字的可读侧。
-   `Error` – 当发生错误时发出。在紧随此事件之后将直接调用 'close' 事件。
-   `Timeout` – 如果套接字因不活动而超时则发出。这只是通知套接字已空闲。用户必须手动断开连接。

`Handler type` 可以是 `Flow` 或 `Action`。如果选择 `Flow`，则将添加一个输出，如果发送事件，则 Flow 执行通过该输出继续。如果选择 `Action`，则还必须设置 `Action`，即收到事件时执行的用户动作的名称。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _TCP CLient_
-   _TCP Server_
