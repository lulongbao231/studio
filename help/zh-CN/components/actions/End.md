# DESCRIPTION

用于终止 Flow 的执行。

如果它在页面内，则表示应用程序执行的结束。如果是在工程编辑器内执行的 _Dashboard_ 工程，则表示从 _Run_（运行）模式切换到 _Edit_（编辑）模式。
如果 _Dashboard_ 在仪器上运行，则执行将被中断，并出现一个 _Start_（启动）按钮，通过该按钮可以重新启动 _Dashboard_。
如果 _Dashboard_ 是独立应用程序，则应用程序将被关闭。

如果在用户动作内使用，则表示用户动作执行的结束，并在调用用户动作的位置激活标准顺序线。

如果它位于 Flow 中的 User Widget 内，则此 Action 没有效果。

# PROPERTIES

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

# EXAMPLES [EMPTY]
