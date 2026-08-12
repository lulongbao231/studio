# DESCRIPTION

绑定到 TCP 端口并监听传入的连接。

# PROPERTIES

## Port

我们要绑定到的端口。

## IP Address

我们要绑定到的地址。

## Max. Connections

允许的最大活动传入连接数。

# INPUTS

## seqin

一个标准顺序输入。

## end

停止监听并从端口解除绑定。将触发 `close` 输出。

# OUTPUTS

## seqout

一个标准顺序输出。

## connection

传入连接的套接字被发送到的输出。

## close

当监听停止时将触发。

# EXAMPLES

-   _TCP CLient_
-   _TCP Server_
