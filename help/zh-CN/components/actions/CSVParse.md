# DESCRIPTION

解析 CSV 字符串，构造所设置类型的值，并通过 `result` 输出发送。

# PROPERTIES

## Input

要解析的 CSV 字符串。

## Delimiter

定义用于分隔 CSV 记录内字段的字符。默认分隔符是 `","`。

## From

定义要处理的起始记录。计数从 1 开始，即对于第一条记录，需要设置为 1（而不是 0）。

## To

定义要处理的最后一条记录。计数从 1 开始，即对于第 5 条记录，需要设置为 5（而不是 4）。

# INPUTS

## seqin

一个标准顺序输入。

## text

用于接收要解析的 CSV 字符串的输入。如果不需要此输入，可以将其删除（在 Flow - Inputs 列表中删除），即如果我们想要解析通过 `Input` 属性设置的任意表达式求值而获得的字符串。

# OUTPUTS

## seqout

一个标准顺序输出。

## result

构造的值被发送到的数据输出。必须指定该值的类型 - 这应在 Flow - Outputs 部分中完成：

![Alt text](../images/csv_result_output_type.png)

在下面提到的 _CSV_ 示例中，我们有一个如下所示的 CSV 字符串：

```
[
    {
        "country": "Afghanistan",
        "city": "Kabul"
    },
    {
        "country": "Albania",
        "city": "Tirana"
    },
    {
        "country": "Algeria",
        "city": "Alger"
    },
    ...
]
```

此 Action 返回的构造值应为 `array:CountryCity` 类型，其中 `CountryCity` 是一个具有两个字段的结构体（结构体名称 `CountryCity` 由开发人员任意选择）：

-   `country`，其类型为 `string`
-   `city`，其类型为 `string`

该结构体在工程编辑器中的定义如下所示：

![Alt text](../images/csv_countrycity_struct_def.png)

# EXAMPLES

- _CSV_
