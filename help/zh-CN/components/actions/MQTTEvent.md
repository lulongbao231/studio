# DESCRIPTION

使用此 Action，我们可以添加一个或多个可以由 MQTT 连接接收的事件处理程序。执行此 Action 后，可以调用 _MQTTConnect_ Action。

# PROPERTIES

## Connection

要处理其事件的 MQTT 服务器连接。

## Event handlers

要处理的事件列表。对于列表中的每个项，都需要选择 `Event`、`Handler type`，以及可选的 `Action`。`Event` 是我们想要处理的事件类型，可能的值有：

-   `Connect` – 在连接或重新连接成功的情况下发送。
-   `Reconnect` – 在连接被终止后尝试重新连接时发送。
-   `Close` – 在连接被终止后发送。
-   `Disconnect` – 当代理收到断开连接数据包时发送。
-   `Offline` – 当客户端离线时发送。
-   `End` – 执行 _MQTTDisconnect_ Action 时发送。
-   `Error` – 当客户端无法连接或发生解析错误时发送。
-   `Message` – 当客户端收到服务器针对我们之前使用 _MQTTSubscribe_ Action 订阅的主题发布的报文时发送。通过输出发送 `struct:$MQTTMessage` 类型的数据，这是一个具有以下成员的系统结构体：
    -   `topic` – 报文所发布的主题名称。
    -   `payload` – 收到的消息内容。

`Handler type` 可以是 `Flow` 或 `Action`。如果选择 `Flow`，则将添加一个输出，如果发送事件，则 Flow 执行通过该输出继续。如果选择 `Action`，则还必须设置 `Action`，即收到事件时执行的用户动作的名称。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _MQTT_
