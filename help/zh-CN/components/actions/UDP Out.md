# DESCRIPTION

此动作向指定的 UDP 主机和端口发送消息。

# PROPERTIES

## Send a

发送 UDP、Multicast（组播）或 Broadcast（广播）消息的选项。

## To port

消息被发送到的端口。

## Address

消息被发送到的地址。

## Group

如果选择了 Multicast 模式，请指定您想要加入的组播组。

## Local interface

为组播组指定本地网络接口。如果未指定此选项，操作系统将选择一个接口并为其添加成员资格。

## Ipv

使用 IPV4 或 IPV6 地址。

## Bind to

绑定到随机或固定端口的选项。

## Outport

如果选择了固定端口选项，则使用此属性指定固定端口。

## Payload

要发送的消息负载。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _UDP CLient_
-   _UDP Server_
