# DESCRIPTION

此 Action 用于循环执行 Flow 的特定部分。该 Action 应放在将以循环方式执行的那部分 Flow 的开头，并通过 `Start` 输入进入；在该部分 Flow 的末尾，应返回到此 Action，但这次通过 `Next` 输入。
每次 Flow 通过此 Action 时，所设置变量的值都将以 `Step` 值从 `From` 值变化到 `To` 值。
在迭代完成之前，Flow 执行将经过 `(From - To + 1) / Math.abs(step)` 次，然后通过 `Done` 输出。
如果我们想要在到达 `To` 值之前停止迭代，那么只需不返回到 `Next` 输入即可。此外，可以使用 _SetVariable_ 来更改正在迭代的变量，从而跳过一个或多个步骤。

![Alt text](../images/loop.png)

# PROPERTIES

## Variable

一个确定循环通过次数的变量，其值将被更改并测试以查看是否需要新的迭代。

## From

变量的初始值。

## To

变量的最终值。

## Step

每次通过时变量更改的值。可以是正数或负数。

# INPUTS

## start

当通过此输入时，变量被设置为 `From` 值，并且 Flow 执行通过 `seqout` 继续。

## next

当通过此输入时，变量以 `Step` 值更改。如果 `Step` 为正数，则测试它是否小于或等于 `To` 值；如果 `Step` 为负数，则测试它是否大于或等于 `To` 值。

如果变量未超过 `To` 值，则 Flow 执行通过 `seqout` 继续，否则通过 `Done` 输出继续。

# OUTPUTS

## seqout

在迭代期间 Flow 执行通过此输出继续。

## done

迭代完成时 Flow 执行通过此输出继续。

# EXAMPLES

- _循环_
