# PROPERTIES

## Name

Widget 名称。我们在工程内通过名称引用 Widget，例如在 LVGL 动作中。每个 Widget 必须在整个工程内选择唯一的名称。此字段是可选的，如果我们不需要引用该 Widget，则无需设置。

## Code identifier [EMPTY]

## Left unit

可用的选项如下：

-   `px` – Left 默认以像素为单位。
-   `%` – Left 设置为相对于父级宽度的百分比。

## Top unit

可用的选项如下：

-   `px` – Top 以像素为单位设置。
-   `%` – Top 设置为相对于父级高度的百分比。

## Width unit

可用的选项如下：

-   `px` – Width 以像素为单位给出。
-   `%` – Width 以相对于父级宽度的百分比给出。
-   `content` – Width 自动设置以在宽度上容纳全部内容。

## Height unit

可用的选项如下：

-   `px` – Height 以像素为单位给出。
-   `%` – Height 以相对于父级高度的百分比给出。
-   `content` – Height 自动设置以在高度上容纳全部内容。

## Children [EMPTY]

## Hidden

隐藏对象。

## Hidden flag type

这里我们可以选择 `Hidden` 标志状态将由表达式计算还是不由表达式计算。

## Clickable

使对象可被输入设备点击。

## Clickable flag type

这里我们可以选择 `Clickable` 标志状态将由表达式计算还是不由表达式计算。

## Click focusable

点击时为对象添加聚焦状态。

## Checkable

点击对象时切换选中状态。

## Scrollable

使对象可滚动。

## Scroll elastic

允许对象内部滚动，但速度较慢。

## Scroll momentum

当对象被“抛出”时使其继续滚动。

## Scroll one

只允许滚动一个可吸附的子项。

## Scroll chain hor

允许将水平滚动传递给父级。

## Scroll chain ver

允许将垂直滚动传递给父级。

## Scroll on focus

聚焦时自动滚动对象，使其可见。

## Scroll with arrow

允许使用方向键滚动聚焦的对象。

## Snappable

如果父级启用了滚动吸附，则可以吸附到此对象。

## Press lock

即使按压从对象上滑离，也保持对象处于按下状态。

## Event bubble

将事件也传递给父级。

## Gesture bubble

将手势传递给父级。

## Adv hittest

允许进行更精确的命中（点击）测试，例如考虑到圆角。

## Ignore layout

使对象可以被布局定位。

## Floating

父级滚动时对象不随之滚动，并忽略布局。

## Overflow visible

不将子内容裁剪到父级边界内。

## Scrollbar mode

滚动条按配置的模式显示。存在以下模式：

-   OFF: 从不显示滚动条
-   ON: 始终显示滚动条
-   ACTIVE: 对象滚动期间显示滚动条
-   AUTO: 当内容足够大可以滚动时显示滚动条

## Scroll direction

控制滚动发生的方向。存在以下模式：

-   NONE: 不滚动
-   TOP: 仅向上滚动
-   LEFT: 仅向左滚动
-   BOTTOM: 仅向下滚动
-   RIGHT: 仅向右滚动
-   HOR: 仅水平滚动
-   VER: 仅垂直滚动
-   ALL: 任意方向滚动

## Scroll snap X

滚动结束时，对象的子项可以按特定的规则吸附。

对象可以用四种方式对齐被吸附的子项：

-   NONE: 禁用吸附。（默认）
-   START: 将子项对齐到被滚动对象的左侧
-   END: 将子项对齐到被滚动对象的右侧
-   CENTER: 将子项对齐到被滚动对象的中心

## Scroll snap Y

滚动结束时，对象的子项可以按特定的规则吸附。

对象可以用四种方式对齐被吸附的子项：

-   NONE: 禁用吸附。（默认）
-   START: 将子项对齐到被滚动对象的顶部
-   END: 将子项对齐到被滚动对象的底部
-   CENTER: 将子项对齐到被滚动对象的中心

## Checked

切换或选中的状态。

## Checked state type

这里我们可以选择 `Checked` 状态将由表达式计算还是不由表达式计算。

## Disabled

禁用状态

## Disabled state type

这里我们可以选择 `Disabled` 状态将由表达式计算还是不由表达式计算。

## Focused

通过键盘或编码器聚焦，或通过触摸板/鼠标点击。

## Focus key

通过键盘或编码器聚焦，但不通过触摸板/鼠标。

## Pressed

正在被按下。

## Hovered

将鼠标悬停在 Widget 上。

## Use style

这里我们可以选择全局定义的样式之一，使 Widget 使用该样式。

## Local styles [EMPTY]

## Group

此 Widget 所属输入组的名称。

## Group index

定义 Widget 在组内的顺序。这与 HTML 中的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) 类似：

-   如果 "Group index" 为 0，则组顺序与 Widgets Structure 中的顺序相同
-   如果 "Group index" 大于 0，则 Widget 被添加到组中，位置在任何 "Group index" 为 0 的 Widget 之前，也早于任何 "Group index" 值更大的 Widget。也就是说，"Group index"=4 会排在 "Group index"=5 和 "Group index"=0 之前，但排在 "Group index"=3 之后。如果多个 Widget 具有相同的 "Group index" 值，则它们之间的相对顺序遵循它们在 Widgets Structure 中的位置。
