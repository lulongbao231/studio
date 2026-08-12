# DESCRIPTION

将文件的内容作为字符串或 blob 读取，并发送到 `content` 输出。

# PROPERTIES

## File path

要读取的文件的完整路径。

## Encoding

输入数据的编码。可能的值有：`"ascii"`、`"base64"`、`"hex"`、`"ucs2"`、`"ucs-2"`、`"utf16le"`、`"utf-16le"`、`"utf8"`、`"utf-8"`、`"binary"` 或 `"latin1"`。

如果编码是 `"binary"`，则返回 blob 值，否则返回字符串值。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## content

读取的文件内容通过此输出发送。

# EXAMPLES

- _JSON_
- _CSV_
- _EEZ Chart_
