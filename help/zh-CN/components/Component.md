# PROPERTIES

## Geometry properties [EMPTY]

## Align and distribute

对齐与分布。当选中两个或更多组件时会出现对齐图标，当选中三个或更多组件时会出现分布图标。

![Alt text](images/align_and_distribute.png)

## Center widget

在页面或父组件内对组件进行水平、垂直居中的图标。

![Alt text](images/widget_centering.png)

## Inputs

用户可以按需添加的附加组件输入，用于接收在属性中计算表达式时所需的附加数据。每个输入都有一个名称（name）和类型（type）。名称用于在表达式中引用某个输入。类型用于让 _Check_ 检查传输该类型数据的数据线是否连接到该输入。

## Outputs

用户可以添加用来向外发送数据的附加组件输出。每个输出都有一个名称（name）和类型（type）。使用此类输出的一个例子是 _Loop_ 组件：可以把某个输出名称填入 `Variable` 属性，而不是填变量名。在这种情况下，_Loop_ 组件不会在每一步修改变量的内容，而是通过该输出发送当前值。

## Catch error

如果启用此复选框，则会向组件添加一个 `@Error` 输出。如果在 Flow 执行过程中该组件发生错误，Flow 将沿该输出继续执行。通过该输出传递的数据是错误的文本描述。
