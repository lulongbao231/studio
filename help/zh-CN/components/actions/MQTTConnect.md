# DESCRIPTION

此 Action 发起与 MQTT 服务器的连接，如果连接成功，将发送一个 Connect 事件；如果发生错误，则发送一个 Error 事件。如果发生错误或曾经建立的连接被中断，则将尝试定期重新连接，直到重新建立连接，这将通过发送 Reconnect 事件来报告。所有这一切都在后台异步进行，直到调用 MQTTDisconnect，任何状态变化都将通过一个事件来报告，该事件可以通过 _MQTTEvent_ Action 处理。

# PROPERTIES

## Connection

将用于与服务器建立连接的 MQTT 连接名称。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。Flow 执行立即通过此输出继续，并在后台尝试与服务器建立连接。

# EXAMPLES

- _MQTT_
