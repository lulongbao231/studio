# DESCRIPTION

此 Widget 用于显示位图。如果我们预先知道要显示哪张位图，则有必要使用 `Bitmap` 属性（在其中选择位图）；如果位图只在执行期间才确定（例如它来自某个变量），则有必要使用 `Data` 属性。

# PROPERTIES

## Data

选择要显示哪张位图有几种选项：

- 如果默认值的类型为 `integer`，则表示要显示位图的索引。有必要使用函数 `Flow.getBitmapIndex({<bitmapName>})`，该函数接收 `bitmapName`（即位图的名称）并返回位图的索引。通过这种方式，我们可以选择或更改运行时将显示的位图，因为例如 `bitmapName'` 可以来自某个变量。

- 如果默认值的类型为 `string`，则假定位图按照[数据 URI 方案](https://zh.wikipedia.org/wiki/Data_URI_scheme)的规则进行编码。

- 如果默认值的类型为 `blob`，则位图默认采用其二进制表示形式（请参见 _屏幕截图_ 示例）。

## Default style

渲染 Widget 背景时使用的样式。

## Bitmap

要显示的位图的名称。

## Custom ui [EMPTY]


# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

* _仪表板部件演示_
* _屏幕截图_
