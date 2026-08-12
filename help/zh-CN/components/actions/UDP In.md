# DESCRIPTION

使用此动作输出在指定 UDP 端口上收到的消息。

# PROPERTIES

## Listen for

选择 UDP 或 Multicast（组播）模式。

## Group

如果选择了 Multicast 模式，请指定您想要加入的组播组。

## Local interface

为组播组指定本地网络接口。如果未指定此选项，操作系统将选择一个接口并为其添加成员资格。

## On port

我们想要从中接收消息的端口。

## Using

使用 IPV4 或 IPV6 地址。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## message

收到的消息被发送到的输出。消息的类型是具有以下字段的 `struct:$UDPMessage`：

-   `payload`：作为 `blob` 收到的消息负载，使用 `Blob.toString()` 转换为字符串值。
-   `address`：远程 IP 地址
-   `port`：远程 IP 端口

# EXAMPLES

-   _UDP CLient_
-   _UDP Server_
