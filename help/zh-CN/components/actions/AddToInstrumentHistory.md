# DESCRIPTION

用于向仪器的 _History_（历史记录）视图添加新项。目前仅支持添加图表项或 Widget（Tabulator、Plotly 或 LineChart）。

例如在 _Rigol 波形数据_ 示例中我们使用了此 Action：

![Alt text](../images/add_to_instrument_history_action.png)

它用于添加图表，添加成功后图表将如下显示（测试信号采集示例）：

![Alt text](../images/add_to_instrument_history_history.png)

# PROPERTIES

## Instrument

将向其中添加项的仪器 _History_。

## Item type

要添加的项类型。可以是 `"Chart"` 或 `"Widget"`。

## Chart description

显示在仪器 _History_ 中的图表描述：

![Alt text](../images/add_to_instrument_history_description.png)

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart data

包含将显示在图表中的样本的字符串或 blob。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart sampling rate

采样率或每秒样本数（SPS）。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart offset

公式 `offset + sample_value * scale` 中使用的偏移值，该公式将样本值转换为图表中 Y 轴上的样本位置。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart scale

显示样本时，使用公式 `offset + sample_value * scale`。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart format

`Chart data` 的格式。可能的值：

-   `"float"` – "Chart data" 必须是包含 32 位小端浮点数的 blob。
-   `"double"` – "Chart data" 必须是包含 64 位小端浮点数的 blob。
-   `"rigol-byte"` – "Chart data" 必须是包含 8 位无符号整数的 blob。
-   `"rigol-word"` – "Chart data" 必须是包含 16 位无符号整数的 blob。
-   `"csv"` – "Chart data" 必须是 CSV 字符串，取第一列。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart unit

显示在 Y 轴上的单位。X 轴始终是时间。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart color

选择深色背景时图表中线的颜色。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart color inverse

选择浅色背景时图表中线的颜色。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart label

图表标签：

![Alt text](../images/add_to_instrument_history_label.png)

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart major subdivision horizontal

![Alt text](../images/add_to_instrument_history_major_subdivision_horizontal.png)

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart major subdivision vertical

![Alt text](../images/add_to_instrument_history_major_subdivision_vertical.png)

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart minor subdivision horizontal

![Alt text](../images/add_to_instrument_history_minor_subdivision_horizontal.png)

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart minor subdivision vertical

![Alt text](../images/add_to_instrument_history_minor_subdivision_vertical.png)

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart horizontal scale

定义默认图表视图中 X 轴缩放因子的数字。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Chart vertical scale

定义默认图表视图中 Y 轴缩放因子的数字。

此属性仅在 `Item type` 为 `Chart` 时可用。

## Widget

对 Tabulator、Plotly 或 LineChart Widget 的引用。请参阅 `Output widget handle` 属性以了解如何获取此引用。

此属性仅在 `Item type` 为 `Widget` 时可用。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## id

所添加历史记录项的 ID。例如，我们可以使用 `Chart` Widget 中的此数据在仪表板内显示图表历史记录项。

# EXAMPLES

-   _Rigol 波形数据_
