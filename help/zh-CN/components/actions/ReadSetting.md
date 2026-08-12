# DESCRIPTION

对于所定义的键名，此动作从 _.eez-project-runtime-settings_ 文件（与保存持久变量的文件相同）中返回已保存的值，如果该键不存在，则返回 `null`。

注意：_WriteSetting_ 和 _ReadSetting_ Actions 用于在 _eez-project-runtime-settings_ 文件中保存和检索所有我们希望能在 _Dashboard_ 工程重启后保留的设置。使用持久变量更方便，因为在这种情况下我们不必执行特殊的保存动作。

# PROPERTIES

## Key

一个字符串，包含要检索其值的键的名称。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## value

所定义 `Key` 获得的 `Value` 通过此输出发送。

# EXAMPLES [EMPTY]
