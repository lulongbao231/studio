# DESCRIPTION

按钮矩阵（Button Matrix）对象是一种以行和列显示多个按钮的轻量级方式。

[更多信息](https://docs.lvgl.io/8.3/widgets/core/btnmatrix.html)

# PROPERTIES

## Buttons

按钮列表。每个按钮具有以下属性：

-   New line（换行）：如果启用，则这不是真正的按钮，而是在按钮矩阵中引入一次换行。
-   Text（文本）：按钮的标签
-   Width（宽度）：按钮的宽度可以相对于同一行中的其他按钮设置。例如一行中有两个按钮：btnA（width = 1）和 btnB（width = 2），则 btnA 将占 33% 的宽度，btnB 将占 66% 的宽度。
-   HIDDEN（隐藏）：使按钮隐藏（隐藏的按钮仍然占据布局中的空间，只是不可见或不可点击）
-   NO_REPEAT（不重复）：长按时禁用重复
-   DISABLED（禁用）：使按钮禁用，就像普通对象上的 LV_STATE_DISABLED
-   CHECKABLE（可选中）：启用按钮的切换。即按钮被点击时 LV_STATE_CHECKED 会被添加/移除
-   CHECKED（选中）：使按钮处于选中状态。它将使用 LV_STATE_CHECKED 样式。
-   CLICK_TRIG（点击触发）：启用：在 CLICK 时发送 LV_EVENT_VALUE_CHANGE；禁用：在 PRESS 时发送 LV_EVENT_VALUE_CHANGE
-   POPOVER（弹出）：按下此键时在弹出的气泡中显示按钮标签
-   RECOLOR（重新着色）：启用用 # 对按钮文本重新着色。例如 "It's #ff0000 red#"
-   CUSTOM_1（自定义1）：可自由使用的自定义标志
-   CUSTOM_2（自定义2）：可自由使用的自定义标志

## One check

可以启用 "One check"（单选）功能，以允许一次只选中一个按钮。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES [EMPTY]
