# DESCRIPTION

将数据追加到文件。如果文件不存在，则会创建它。数据可以是字符串或 blob。

# PROPERTIES

## File path

要写入的文件的完整路径。

## Content

要写入的内容。可以是字符串或 blob。如果内容是 blob，则忽略 `encoding` 属性。

## Encoding

字符串内容的编码类型。允许以下值：`"ascii"`、`"base64"`、`"hex"`、`"ucs2"`、`"ucs-2"`、`"utf16le"`、`"utf-16le"`、`"utf8"`、`"utf-8"`、`"binary"` 或 `"latin1"`。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES [EMPTY]
