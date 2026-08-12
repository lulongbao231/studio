# DESCRIPTION

此 Widget 可以与 `List` 和 `Grid` Widget 一起使用，用于在无法完全容纳在上述 Widget 内的大型列表中滚动。如果 `width` > `height`，则显示水平 `ScrollBar`：

![Alt text](../images/scrollbar.png)

...如果 `width` <= `height`，则显示垂直 `ScrollBar`。

![Alt text](../images/scrollbar_vert.png)

水平 `ScrollBar` 有左、右按钮，垂直 `ScrollBar` 有上、下按钮。

此 Widget 通过一个在 `Data` 属性中设置的、类型为 `struct:$ScrollbarState` 的变量连接到 `List` 或 `Grid` Widget。结构体 `struct:$ScrollbarState` 具有以下字段：

- `numItems` – 列表中有多少项/元素
- `itemsPerPage` – 有多少项可以容纳在 `List` 或 `Grid` Widget 内。
- `positionIncrement` – 确定在选择左/上按钮（向左/上移动）或右/下按钮（向右/下移动）时，我们将在列表中移动多少项。
- `position` – 列表中渲染的第一个项/元素的位置。因此，在 `List` 或 `Grid` Widget 内，将渲染从 `position` 到 `position + itemsPerPage` 的项。`position` 可以在 `0` 到 `numItems – itemsPerPage` 的区间内。

滚动条可以通过以下方式改变其 `position'`：

- 选择左/上按钮，`position` 将减少 `positionIncrement` 值。
- 选择右/下按钮，`position` 将增加 `positionIncrement` 值。
- 移动滑块（thumb），`position` 被设置为 `0` 到 `numItems - itemsPerPage` 区间内的一个值。
- 选择左/上按钮与滑块之间的区域，则位置减少 `itemsPerPage`（即“上一页”）。
- 选择滑块与右/下按钮之间的区域，则位置增加 `itemsPerPage`（即“下一页”）。

# PROPERTIES

## Data

在此设置 `struct:$ScrollbarState` 类型变量的名称。

## Default style

渲染 Widget 背景时使用的样式。

## Thumb style

用于渲染滚动条滑块的样式。

## Buttons style

用于渲染左、右按钮的样式。

## Left button text

将显示在左/上按钮内部的文本。通常使用图标字体中的单个字符。

## Right button text

将显示在右/下按钮内部的文本。通常使用图标字体中的单个字符。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
