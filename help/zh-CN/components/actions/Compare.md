# DESCRIPTION

根据运算符比较表达式，如果结果为 `true`，则 Flow 执行通过 `True` 输出继续，否则使用 `False` 输出。

# PROPERTIES

## A

比较左侧的表达式。

## B

比较右侧的表达式。
如果运算符是 `NOT`，则不会使用。

## C

此表达式仅在 `BETWEEN` 运算符的情况下使用，然后检查 `A >= B` 和 `A <= C`。

## Operator

可以使用以下运算符之一：

-   `=` – A 等于 B，即 `A == B`
-   `<` – A 小于 B，即 `A < B`
-   `>` – A 大于 B，即 `A > B`
-   `<=` – A 小于或等于 B，即 `A <= B`
-   `>=` – A 大于或等于 B，即 `A >= B`
-   `<>` – A 不等于 B，即 `A != B`
-   `NOT` – A 不为真，即 `!A`
-   `AND` – A 和 B 都为真，即 `A && B`
-   `OR` – A 或 B 中至少一个为真，即 `A || B`
-   `XOR` – A 或 B 中只有一个为真，`A ^^ B`
-   `BETWEEN` – A 在 B 和 C 之间，即 A 大于或等于 B 且小于或等于 C，也就是 `A >= B AND A <= C`

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## True

如果表达式的值为 `true`，则用于继续 Flow 执行的输出。

## False

如果表达式的值为 `false`，则用于继续 Flow 执行的输出。

# EXAMPLES [EMPTY]
