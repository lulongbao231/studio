# DESCRIPTION

打开一个用于选择仪器的对话框。选定的仪器被发送到 `instrument` 输出。

如果全局仪器对象变量设置为 `Persistent`，则无需使用此 Action，因为启动仪表板时仪器选择对话框会立即打开。
但是，如果我们不希望仪器选择对话框在启动时自动打开，那么我们不能为全局仪器变量启用 `Persistent` 复选框，并且可以稍后使用此 Action 来选择所需的仪器。

![Alt text](../images/select_instrument_persistent_checkbox.png)

# PROPERTIES

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## instrument

选定的仪器被发送到此输出。

# EXAMPLES [EMPTY]
