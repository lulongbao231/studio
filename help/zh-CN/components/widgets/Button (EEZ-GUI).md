# DESCRIPTION

此 Widget 用于需要通过 GUI 执行某个动作的场合，点击它会生成一个 `CLICKED` 事件，在本例中该事件默认会被添加到事件处理器列表中。此 Widget 有启用和禁用两种状态，通过 `Enabled` 属性设置。每种状态都有自己的样式：启用状态使用 `Default` 样式，禁用状态使用 `Disabled` 样式。

# PROPERTIES

## Label

将显示在按钮内部的文本。

## Default style

Widget 启用时用于渲染的样式。

## Text [EMPTY]


## Enabled

如果为 true，则按钮可用，否则将被禁用。

## Disabled style

Widget 禁用时用于渲染的样式。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

## CLICKED

# EXAMPLES

* _eez-gui-widgets-demo_
