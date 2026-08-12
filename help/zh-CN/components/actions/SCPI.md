# DESCRIPTION

在选定的仪器上执行一个或多个 SCPI 命令或查询。当所有命令/查询执行完成时，Flow 执行通过 `seqout` 输出继续。

# PROPERTIES

## Instrument

在其上执行命令/查询的仪器对象。此属性仅在 _Dashboard_ 工程中仪器远程连接时存在，即可以同时与多个仪器保持打开连接。如果是 _EEZ-GUI_ 工程，则此属性不存在，因为我们始终使用执行 Flow 的设备并向其发送 SCPI 命令。

## Scpi

SCPI 命令/查询列表。每条命令/查询必须以单独的行输入。也可以在命令/查询内插入 Flow 表达式，该表达式必须用两个花括号括起来。这是取自 _BB3 Dashboard_ 示例的一个例子，它在 SCPI 命令中使用了 Flow 表达式：

![Alt text](../images/scpi_command_expression.png)

另外，在上面的示例中添加了一个 Flow `Catch Error`，用于捕获 SCPI 组件执行期间的错误。

对于 SCPI 查询，必须指定结果发送的位置，我们有两个选项：

-   将结果发送到 Flow 输出。需要使用此组件属性中的"Flow - Outputs"部分添加一个新输出，在那里需要写入：`output_name=query?`。这里有一个取自 _BB3 Dashboard_ 示例的例子：

![Alt text](../images/scpi_query_output.png)

-   将结果保存到变量。结果保存在变量中，这样查询的写法如下：`variable_name=query?` 或 `{assignable_expression}=query?`。
    当存储到（例如）结构体成员或数组中时，使用第二种形式。下面是两种形式的示例，同样取自 _BB3 Dashboard_ 示例：

    -   在此示例中，`SYSTem:CPU:FIRMware?` 查询的结果保存在 `fw_ver` 变量中。由于它是第一种（简单）形式，变量名称不应括在花括号内。

        ![Alt text](../images/scpi_query_variable.png)

    -   在此示例中，执行了四个 SCPI 查询。结果保存在类型为 `array:struct:Slot` 的 slots 变量中，其中 slots 是一个具有 `u_min`、`u_max`、`i_min` 和 `i_max` 成员的结构体。这里使用第二种形式，可赋值表达式必须括在花括号中。这里我们还有一个在查询本身中使用表达式 `{ch_idx}` 的示例。

        ![Alt text](../images/scpi_query_expression.png)

## Timeout (ms)

等待查询结果的毫秒数。如果在该时间内结果没有返回，则生成一个 Timeout 错误，该错误可以通过 `@Error` 输出处理（如果启用了 `Catch error`）。如果设置为 `null`，则使用仪器 _Connect_（连接）对话框中的超时设置。

## Delay (ms)

发送新的 SCPI 命令或查询之前必须经过的最短毫秒数。如果设置为 `null`，则使用仪器 _Connect_（连接）对话框中的延迟设置。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _BB3 Dashboard_
-   _Plotly_
-   _Rigol 波形数据_
-   _屏幕截图_
