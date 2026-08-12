# DESCRIPTION

发送 HTTP 请求并返回响应。

# PROPERTIES

## Method

使用的 HTTP 方法：GET、POST、PUT、PATCH、DELETE、HEAD、OPTIONS、CONNECT 或 TRACE。

## Url

请求的 url。

## Headers

发送到服务器的标头列表。每个项都应设置一个标头名称和一个字符串值。

## Body

如果选择了 POST、PUT 或 PATCH 方法，则发送到服务器的消息正文。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## status

响应的[状态码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。

## result

收到的响应的消息正文。

# EXAMPLES

- _简单 HTTP_
