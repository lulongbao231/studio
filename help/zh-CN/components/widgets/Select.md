# DESCRIPTION

此 Widget 类似于 `Container`，在其下有多个子 Widget。但与始终显示所有子 Widget 的 `Container` 不同，此 Widget 只显示一个子 Widget——即我们通过 `Data` 属性选中的那个。因此，当你希望根据某个变量的值来改变页面结构时，请使用此 Widget。Widget 通过拖放从 _Widgets Structure_（部件结构）面板添加到 `Select` 中。

# PROPERTIES

## Data

此表达式求值的结果必须是要显示的 Widget 的从零开始的索引。因此，如果结果为 0，则显示第一个 Widget；如果结果为 1，则显示第二个 Widget，依此类推。Widget 的顺序可以在 _Widgets Structure_（部件结构）面板中通过拖放来选择。

## Default style

渲染 Widget 背景时使用的样式。

## Widgets [EMPTY]


# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _eez-gui-widgets-demo_
