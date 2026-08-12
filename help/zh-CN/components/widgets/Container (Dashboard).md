# DESCRIPTION

它用于对多个 Widget 进行分组，当我们想要额外组织一个包含大量 Widget 的页面，或想同时对多个 Widget 执行某些操作（例如使用 Container 的 `Visible` 属性进行隐藏）时会用到它。当 Widget 位于 Container 内部时，其左侧和顶部坐标相对于 Container 的左侧和顶部，也就是说，当 Container 被移动时，其内部的所有 Widget 也会一起移动。Widget 通过拖放从 _Widgets Structure_（部件结构）面板添加到 Container 中。

# PROPERTIES

## Default style

渲染 Widget 背景时使用的样式。

## Name

可选的名称，用于在编辑器中的 _Widgets Structure_（部件结构）面板中显示。如果未设置，则显示 `Container`。

## Widgets [EMPTY]


## Overlay [EMPTY]


## Shadow [EMPTY]


## Layout

确定子 Widget 在此容器内的定位方式：

-   `Static` – 子 Widget 使用其 left 和 top 属性在 Container 内定位。
-   `Horizontal` – 子 Widget 从左到右排列（如果在 `SetPageDirection` 动作中选择了 RTL，则相反），并按通过 _Widgets Structure_（部件结构）面板设置顺序排列。因此，如果选择此选项，则子 Widget 的 left 属性将不被使用。如果某个子 Widget 被隐藏，则跳过它，其位置由列表中下一个可见 Widget 占据。
-   `Vertical` – 子 Widget 从上到下排列，并按通过 _Widgets Structure_（部件结构）面板设置的顺序排列。因此，如果选择此选项，则子 Widget 的 top 属性将不被使用。如果某个子 Widget 被隐藏，则跳过它，其位置由列表中下一个可见 Widget 占据。
-   `Docking Manager` – 每个子 Widget 位于单独的选项卡中，这些选项卡可以在容器边界内以任意方式排列。例如，它们可以分组到选项卡条中，或停靠到容器内的任何位置。此选项仅适用于仪表板工程。

## Edit layout

如果 `Layout` 属性设置为 `Docking Manager`，则此按钮会打开编辑器，用于配置容器内选项卡的初始位置。请注意，用户之后可以在仪表板运行时更改布局配置。用户的更改保存在 `.eez-project-runtime-settings` 文件中，该文件创建在 `.eez-project` 文件所在位置。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _eez-gui-widgets-demo_
