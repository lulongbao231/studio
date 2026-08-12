# DESCRIPTION

显示一个折线图，包含以下部分：

-   标题
-   X 轴
-   Y 轴
-   图例
-   网格
-   一条或多条线

![Alt text](../images/line_chart_dashboard.png)

在图表开始时，线上没有任何点。要添加点，需要通过 `value` 输入传递数据。在该输入上每应用一次数据，就会添加一个点。然后应根据接收到的数据计算所有线上该点的 X 和 Y 值。例如，接收到的数据可以是一个结构体，其中包含每条线的 X 值和 Y 值。

# PROPERTIES

## Data [EMPTY]


## Default style

渲染 Widget 时使用的样式。

## X value

定义所添加点在 X 轴上的值。可以设置为 `Date.now()` 的当前时间或其他值，但需要注意确保每个新添加的点的值都在递增。

## Lines

定义 Y 轴上的一条或多条线。每条线必须指定以下内容：

-   `Label` – 在图例中显示的线的名称。
-   `Color` – 线的颜色。
-   `Value` – 所添加点在 Y 轴上的值。

## Title

图表的名称。

## Display mode bar

带有按钮的模式栏何时显示在图表右上角，可能的选项是：`Hover`、`Always` 和 `Never`。

## Show legend

如果我们想要显示图例，则应设置此项。

## Show grid

如果我们想要显示网格，则应设置此项。

## Show zero lines

如果我们想要显示零线，则应设置此项。

## Show X axis

如果我们想要显示 X 轴，则应设置此项。

## X axis tick suffix

如果指定，此字符串值将附加到 X 轴值之后。可使用它来设置 X 轴值的单位。

## X axis range option

这里有两个选项：

-   `Floating` – X 轴范围将根据所有点的 X 值自动选择。
-   `Fixed` – X 轴范围通过 `X axis range from` 和 `X axis range to` 项设置。

## X axis range from

如果为 `X axis range option` 选择了 `Fixed`，则 X 轴范围的下限由此项设置。

## X axis range to

如果为 `X axis range option` 选择了 `Fixed`，则 X 轴范围的上限由此项设置。

## Show Y axis

如果我们想要显示 Y 轴，则应设置此项。

## Y axis tick suffix

如果指定，此字符串值将附加到 Y 轴值之后。可使用它来设置 Y 轴值的单位。

## Y axis range option

这里有两个选项：

-   `Floating` – Y 轴范围将根据所有点的 Y 值自动选择。
-   `Fixed` – Y 轴范围通过 `Y axis range from` 和 `Y axis range to` 项设置。

## Y axis range from

如果为 `Y axis range option` 选择了 `Fixed`，则 Y 轴范围的下限由此项设置。

## Y axis range to

如果为 `Y axis range option` 选择了 `Fixed`，则 Y 轴范围的上限由此项设置。

## Max points

将显示的最大点数。

## Margin

手动选择 Widget 边框与 Widget 内图表之间的边距值。需要为 Title（显示在图表上方，因此应选择适当的 `Top` 边距）、X 轴（显示在图表下方，`Bottom` 边距）、Y 轴（显示在图表左侧，`Left` 边距）和图例（显示在图表右侧，`Right` 边距）留出空白区域。

## Marker

在此位置，将使用 `Marker` 样式在图表内显示一条垂直线。

## Marker style

用于渲染标记的样式。

# INPUTS

## reset

如果我们想要清除图表上的所有点，则必须向此输入发送一个信号。

## value

要添加到图表中的点的值被发送到的输入。当达到通过 `Max points` 项设置的最大点数时，最早添加的点将被删除。

# OUTPUTS [EMPTY]

# EXAMPLES

-   _仪表板部件演示_
