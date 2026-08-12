# DESCRIPTION

显示系统文件保存对话框，并将所设置的文件路径发送到 `file_path` 输出。

# PROPERTIES

## File name

默认使用的文件名。

## Filters

如果我们想要限制文件保存对话框中显示的文件类型，则可以以 `array:string` 指定过滤器列表，例如 `["PNG Images|png", "JPG Images|jpg", "GIF Images|gif"]`。这是一个可选属性，如果未设置，则将显示所有文件。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## file_path

所设置的文件路径被发送到的输出。

# EXAMPLES

-   _屏幕截图_
