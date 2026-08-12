# DESCRIPTION

创建并初始化一个 MQTT 连接对象，其连接参数通过属性定义。
必须先执行此 Action，之后必须调用 _MQTTEvent_ Action。

# PROPERTIES

## Connection

将创建并初始化的 `object:MQTTConnection` 类型的连接对象。

## Protocol

连接使用的协议。可能的值是 `"mqtt"`，或用于安全连接的 `"mqtts"`。

## Host

要连接的 MQTT 服务器名称。

## Port

连接将使用的端口号。默认是 `1883`。

## User name

用于连接授权的用户名。如果不使用，可以留空。

## Password

用于连接授权的用户密码。如果不使用，可以留空。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

- _MQTT_
