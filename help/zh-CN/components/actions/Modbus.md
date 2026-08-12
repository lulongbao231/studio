# DESCRIPTION

此动作用于向 Modbus 服务器发送 Modbus 命令。如果读取线圈，则读取的值将通过输出 `values` 以 `array:boolean` 类型的值传递；如果是寄存器，则通过输出 `values` 传递 `array:integer` 类型的值。

# PROPERTIES

## Connection

用于发送 Modbus 命令的串行连接。

## Server address

一个介于 0 和 255 之间的数字，用于在串行连接上选择 Modbus 服务器。

## Command

要发送的命令：

-   01 (0x01) 读取线圈（Read Coils）
-   02 (0x02) 读取离散输入（Read Discrete Inputs）
-   03 (0x03) 读取保持寄存器（Read Holding Registers）
-   04 (0x04) 读取输入寄存器（Read Input Registers）
-   05 (0x05) 写单个线圈（Write Single Coil）
-   06 (0x06) 写单个寄存器（Write Single Register）
-   15 (0x0F) 写多个线圈（Write Multiple Coils）
-   16 (0x10) 写多个寄存器（Write Multiple Registers）

## Register address

单次写入的寄存器地址：05 (0x05) 写单个线圈或 06 (0x06) 写单个寄存器。

## Starting register address

多次读取和写入时的第一个寄存器地址。

## Quantity of registers

多次读取和写入时的寄存器数量。

## Coil value

单次写入期间发送的线圈值（`boolean`）（即使用 05 (0x05) 写单个线圈时）。

## Register value

单次写入期间发送的寄存器值（`integer`）（即使用 06 (0x06) 写单个寄存器时）。

## Coil values

执行多次写入时的线圈值（`array:boolean` 类型）。

## Register values

执行多次写入时的寄存器值（`array:integer` 类型）。

## Timeout (ms)

等待服务器响应的最长时间。以毫秒为单位设置。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES [EMPTY]
