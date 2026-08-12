# DESCRIPTION

使用按照正则表达式语法规则编写的模式，搜索所设置的字符串或流。

# PROPERTIES

## Pattern

用于搜索的正则表达式。

## Text

要搜索的文本可以是字符串或流。

## Global

此选项确定是只搜索模式的第一次出现，还是搜索模式的每一次出现。

## Case insensitive

此选项确定搜索是否区分大小写。

# INPUTS

## seqin

一个标准顺序输入。此输入需要在开始时使用一次。

## next

使用此输入获取下一个匹配项。

## stop

当我们想要停止进一步搜索时使用此输入，之后 Flow 执行将立即通过 `done` 输出继续。

# OUTPUTS

## seqout

一个标准顺序输出。

## match

以 `struct:$RegexpMatch` 值形式的搜索匹配项通过此输出发送。`$RegexpMatch` 结构体具有以下字段：

-   `index`（`integer`）- 匹配项在字符串中从 0 开始的索引。
-   `texts`（`array:string`）- 该数组以匹配文本为第一项，然后是为匹配文本的每个[捕获组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences)对应的一项。
-   `indices`（`array:array:integer`）- 它是一个数组，其中每个条目表示一个子字符串匹配的边界。此数组中每个元素的索引对应于 `texts` 数组中相应子字符串匹配的索引。换句话说，第一个 indices 条目表示整个匹配，第二个 indices 条目表示第一个捕获组，依此类推。每个条目本身是一个双元素数组，其中第一个数字表示匹配的起始索引，第二个数字表示其结束索引。

## done

当搜索完成（即不再有匹配项）时，Flow 执行通过此输出继续。

# EXAMPLES

- _正则字符串_
- _正则流_
