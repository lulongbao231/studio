# DESCRIPTION

添加到 `Cases` 列表中的表达式会从列表中的第一个开始逐一求值。第一个求值结果为 `true` 的表达式的 `Then output` 将用于 Flow 执行继续的输出。除非定义了 `With value` 表达式，否则 `true` 值将被传递到该输出。

在 Flow 执行期间，可能列表中的指定情况都不会在求值时返回 `true`。为了防止这种情况发生并停止 Flow 的进一步执行，可以在列表末尾添加一个情况，在该情况的 `When` 参数中输入 `true`，这样求值结果将始终为 true，从而可以通过其输出退出。

# PROPERTIES

## Cases

此列表的每个元素包含：

- `When` - 一个表达式，对其进行求值以查看是否为 `true`。
- `Then output` - 如果表达式 `When` 的求值结果为 `true`，则 Flow 执行通过此输出继续的输出名称。
- `With value` - 可选参数，如果设置为表达式，则传递到输出；如果未定义，则传递 `true`。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES [EMPTY]
