# DESCRIPTION

对给定的 Tabulator Widget 执行一个动作。

# PROPERTIES

## Widget

对 Tabulator Widget 的引用。请参阅 `Output widget handle` 属性以了解如何获取此引用。

## Tabulator action

要执行的动作。可以是"Get sheet data"（获取工作表数据）或"Download"（下载）。

## Lookup

如果 Tabulator 动作是"Get sheet data"，则这是您想要检索的工作表名称；如果为空，则将检索当前活动的工作表。

## File name

如果 Tabulator 动作是"Download"，则这是默认的下载文件名。

## Download type

如果 Tabulator 动作是"Download"，则这是您想要下载的文件类型。可用选项有："CSV"、"JSON" 或 "HTML"。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _Tabulator 示例_
