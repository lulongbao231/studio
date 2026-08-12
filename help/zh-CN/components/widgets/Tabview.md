# DESCRIPTION

Tab view（选项卡视图）对象可用于在选项卡中组织内容。Tabview 可以通过两种方式配置：

-   将 Tab Widget 直接放在 TabView 下：

    ![alt text](../images/lvgl_tabview_conf1.png)

-   在 Tabview 下添加两个容器 Widget。第一个容器用于选项卡栏，第二个容器用于选项卡内容。在这种配置中，Tab Widget 应放在第二个容器（Content）下。如果你想要对选项卡栏和内容设置样式，请使用此配置。

    ![alt text](../images/lvgl_tabview_conf2.png)

要将 Tab Widget 添加到 Tabview，可直接从 Widget 调色板拖放到 Widgets Structure 面板中的 Tabview 内。

[更多信息](https://docs.lvgl.io/master/widgets/tabview.html)

# PROPERTIES

## Position

使用此属性，可以将选项卡栏移动到任意一侧。

## Size

选项卡栏的大小。在垂直排列的情况下，它指选项卡栏的高度；在水平排列的情况下，它指选项卡栏的宽度。

## Active tab

当前活动选项卡的（从零开始的）索引。

## Selected tab type

在 `Literal` 和 `Assignable` 之间选择。如果选择 `Assignable`，则 `Active tab` 可以是用于存储当前所选选项卡索引的变量。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   _Tabview_
-   _Styled Tabview_
