# DESCRIPTION

对数组变量进行排序，并通过数据输出返回结果：它不是就地排序，即它不会修改数组变量的内容。允许的数组类型有：

-   `array:integer`
-   `array:float`
-   `array:double`
-   `array:struct`

如果对 `array:struct` 类型的数组进行排序，则还必须指定排序依据的 `Structure name`（结构体名称）和 `Structure field name`（结构体字段名称）。

还有两个选项：是需要升序/降序排序，以及在排序字符串时是否忽略大小写。

# PROPERTIES

## Array

要排序的数组变量。

## Structure name

当数组是 `array:struct` 类型的变量时，在此处选择结构体的名称。

## Structure field name

如果数组是 `array:struct` 类型的变量，则选择排序依据的字段名称。

## Ascending

排序模式选择（启用为升序，否则为降序）。

## Ignore case

指定排序字符串时是否忽略大小写。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## result

排序后的数组通过此输出传递。

# EXAMPLES [EMPTY]
