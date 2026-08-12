# DESCRIPTION

使用与仪器 _History_（历史记录）面板中相同的 Widget 显示折线图。

# PROPERTIES

## Data [EMPTY]


## Default style

渲染 Widget 时使用的样式。

## Chart mode

可用以下模式：

- `Single chart` – 显示单个图表。
- `Multiple charts` – 显示多个图表。
- `EEZ DLOG` – 显示由 EEZ DLOG 文件格式给定的图表。
- `Instrument History Item` – 显示仪器历史记录中的图表。

## Chart data

如果 `Chart mode` 设置为 `Single chart`，则应在此设置包含将显示在图表中的样本的字符串、数组或 blob。如果 `Chart mode` 设置为 `EEZ DLOG`，则应在此设置 EEZ DLOG 文件的内容（例如，可以使用 `FileRead` 动作读取，请参阅 _EEZ Chart_ 示例）。

当 `Chart mode` 为 `Multiple charts` 或 `Instrument History item` 时，不使用此属性。

## Format

`Data` 属性的格式。可能的值：

- `"float"` – "Chart data" 必须是包含 32 位小端浮点数的 blob，或 `array:float`
- `"double"` – "Chart data" 必须是包含 64 位小端浮点数的 blob，或 `array:float`
- `"rigol-byte"` – "Chart data" 必须是包含 8 位无符号整数的 blob
- `"rigol-word"` – "Chart data" 必须是包含 16 位无符号整数的 blob
- `"csv"` – "Chart data" 必须是 CSV 字符串，取第一列

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Sampling rate

采样率或每秒样本数（SPS）。

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Unit name

显示在 Y 轴上的单位。X 轴始终是时间。

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Color

图表中线的颜色。

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Label

图表标签：

![Alt text](../images/add_to_instrument_history_label.png)

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Offset

公式 `offset + sample_value * scale` 中使用的偏移值，该公式将样本值转换为图表中 Y 轴上的样本位置。

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Scale

显示样本时，使用公式 `offset + sample_value * scale`。

此属性仅在 `Chart mode` 为 `Single chart` 时使用。

## Charts

当 `Chart mode` 设置为 `Multiple charts` 时的图表定义列表。每个定义包含以下属性：

- `Chart data`
- `Format`
- `Sampling rate`
- `Unit`
- `Color`
- `Label`
- `Offset`
- `Scale`

这些属性与选择 `Single chart` 模式时相应属性的含义相同。

## History item ID

此 ID 通过 `AddToInstrumentHistory` 动作的 `id` 输出获得。

此属性仅在 `Chart mode` 为 `Instrument History Item` 时使用。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _折线图_
* _EEZ Chart_
* _Rigol 波形数据_
