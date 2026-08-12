# DESCRIPTION

使用通过属性定义的连接参数创建并初始化一个 Serial 连接对象。必须先执行此 Action，之后必须调用 _SerialConnect_ Action。

# PROPERTIES

## Connection

要创建并初始化的 `object:SerialConnection` 类型的连接对象。

## Port

串口名称。

## Baud rate

串口速度。

## Data bits

串口数据位。允许的值为 `5`、`6`、`7` 或 `8`。

## Stop bits

串口停止位。允许的值为 `1` 或 `2`。

## Parity

串口校验位。允许的值为 `"none"`、`"even"`、`"mark"`、`"odd"` 或 `"space"`。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES [EMPTY]
