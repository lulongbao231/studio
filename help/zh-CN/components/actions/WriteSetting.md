# DESCRIPTION

此 Action 会将所设置的 `Key` 添加到 _.eez-project-runtime-settings_ 文件（与保存持久变量的文件相同）中，或者如果该键已存在，则使用 `Value` 更新该键的值。

注意：_WriteSetting_ 和 _ReadSetting_ Actions 用于在 _eez-project-runtime-settings_ 文件中保存和检索所有我们希望能在 _Dashboard_ 工程重启后保留的设置。使用持久变量更方便，因为在这种情况下我们不必执行特殊的保存和检索动作。

# PROPERTIES

## Key

一个字符串，包含要添加/更新的键的名称。

## Value

将被创建或更新的键的值。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES [EMPTY]
