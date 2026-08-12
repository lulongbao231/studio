# DESCRIPTION

显示一组按钮。按钮的总数及其标签由 `Button labels` 定义。其中只能有一个按钮被选中，由 `Selected button` 项定义。如果某个按钮被选中，则渲染该按钮时使用 `Selected` 样式，否则使用 `Default` 样式。

# PROPERTIES

## Button labels

指定所有按钮的标签。此字符串数组中的元素数量定义将显示多少个按钮。

## Default style

用于渲染未被选中按钮的样式。

## Selected button

确定哪个按钮被选中。这是一个从零开始的整数，也就是说，如果其值为 0，则选中第一个按钮；如果其值为 1，则选中第二个按钮，依此类推。如果我们不希望选中任何按钮，则使用值 -1。

## Selected style

用于渲染被选中按钮的样式。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
