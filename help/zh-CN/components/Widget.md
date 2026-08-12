# PROPERTIES

## Left

组件相对于页面或父组件的 X 坐标。以像素为单位设置。

提示：设置该属性（以及 `Top`、`Width` 和 `Height` 属性）的值时，可以使用简单的数学表达式。当我们输入一个表达式并按回车后，该表达式会被求值，求值结果会作为该属性的值。表达式中允许使用 `+`、`-`、`*` 和 `/` 运算符。也可以使用括号。

此类数学表达式的示例：`18 + 36`、`50 + 32 * 6`、`(100 - 32) / 2`。

## Top

组件相对于页面或父组件的 Y 坐标。以像素为单位设置。

## Width

组件的宽度。以像素为单位设置。

## Height

组件的高度。以像素为单位设置。

## Absolute pos.

组件相对于页面的绝对位置。此属性为只读。

## Resizing

如果该 Widget 所在的页面启用了“缩放以适应”（Scale to fit）选项，则可以使用此选项来控制缩放页面时 Widget 的位置和尺寸如何计算：

![Alt text](./images/widget_resizing.png)

使用 _Pin to edge_（固定到边缘）选项，可以在勾选 _Scale to fit_ 选项导致 Widget 原始尺寸改变时，固定 Widget 相对页面的上、右、下、左边。例如，如果我们选择了 _Pin to top edge_（固定到上边缘），那么页面顶边与 Widget 顶边之间的距离将始终保持不变，也就是说 Top 位置的值不会改变。如果未选择 _Pin to top edge_，则 Top 位置会随页面高度的缩放而按比例缩放。

使用 _Fix size_（固定尺寸）选项，可以固定 Widget 的宽/高，即如果选择此选项，宽/高将始终保持不变；如果未选择，宽/高将随页面高度的缩放而按比例缩放。

注意：如果同时选择了 _Pin to left edge_（固定到左边缘）和 _Pin to right edge_（固定到右边缘），则 _Fix width_（固定宽度）选项会被禁用；反过来，如果选择了 _Fix width_，则 _Pin to left edge_ 和 _Pin to right edge_ 都不能同时选择，因为两者无法同时满足。_Pin to top edge_、_Pin to bottom edge_ 与 _Fix width_ 同理。

## Visible

如果计算出的表达式为 true，则 Widget 可见；为 false 则隐藏。可以留空，此时 Widget 始终可见。

## Style ui [EMPTY]

## Hide "Widget is outside of its parent" warning

当我们想隐藏“Widget is outside of its parent”（Widget 位于其父级之外）警告信息时勾选。

## Locked [EMPTY]

## Hidden in editor [EMPTY]

## Timeline [EMPTY]

## Keyframe editor [EMPTY]

## Tab title

如果此 Widget 是带有 _Docking Manager_（停靠管理器）布局的容器的子项，请使用此属性设置包含该 Widget 的标签页标题。

## Event handlers

事件处理器定义列表。执行期间，Widget 可能产生某些事件（例如在触摸屏上于 Widget 内按下并释放时会产生 `CLICKED` 事件），通过此列表我们可以指定事件的处理方式。每个事件处理器都需要定义以下属性：

-   `Event` – 被处理的事件，例如 `CLICKED`。
-   `Handler type` – 有两个选项：`Flow` 或 `Action`。如果选择 `Flow`，则会添加一个用于处理该事件的流输出；如果选择 `Action`，则需要指定事件处理期间将执行哪个 User action。
-   `Action` - 如果 `Handler type` 设置为 `Action`，则需要在此输入在所选事件处理期间将执行的 User action 的名称。

## Output widget handle

如果启用，则会添加一个名为 `@Widget` 的新输出。运行时，在 Widget 创建后，会通过该输出发送一个类型为 `widget` 的值。当 Flow 的其它部分需要引用该 Widget 时，可以使用此值。一个例子是：当 `Item type` 属性选择 `Plotly` 时的 `AddToInstrumentHistory` 动作组件。此时需要将 `Plotly widget` 属性设置为对 LineChart Widget 的引用。
