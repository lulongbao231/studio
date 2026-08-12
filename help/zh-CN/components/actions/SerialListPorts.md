# DESCRIPTION

获取系统上检测到的串口列表，并通过 `ports` 输出发送。

# PROPERTIES

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## ports

端口列表以 `array:$SerialPort` 类型的值发送到此输出。系统结构体 `$SerialPort` 具有以下成员：

- `manufacturer`：_string_。连接到端口的设备制造商的名称。
- `serialNumber`：_string_。端口序列号。
- `path`：_string_。串口路径，在 _SerialInit_ Action 中使用。

# EXAMPLES [EMPTY]
