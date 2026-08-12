# DESCRIPTION

发起与服务器连接的终止，将通过 `Close` 事件确认，然后是 `End` 事件。

# PROPERTIES

## Connection

将要终止与其通信的 MQTT 服务器连接的名称。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。Flow 执行立即通过此输出继续，并在后台尝试与服务器断开连接。

# EXAMPLES

- _MQTT_
