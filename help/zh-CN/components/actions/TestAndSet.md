# DESCRIPTION

它测试 `boolean` 变量，如果为 `false`，则将其设置为 `true` 并输出到顺序输出（`seqout`）；如果为 `true`，则将其放回 Flow 执行队列，即此动作会等待直到变量变为 `false`。
此测试和设置是**作为单个原子（不可中断）操作**完成的，因此当您想要确保在某一时刻只通过 Flow 的某个特定部分一次时，此 Action 非常合适。在这种情况下，应在进入该部分 Flow 之前设置此 Action，并且在退出 Flow 时，应使用 _SetVariable_ Action 再次将变量设置为 `false`。

![Alt text](../images/test_and_set.png)

# PROPERTIES

## Variable

要测试和设置的变量。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

当变量变为 `false` 时，Flow 执行通过此顺序输出继续。

# EXAMPLES

- _俄罗斯方块_

    在 `do_action` 用户动作中（当检测到键盘上按下某个键时调用），在开头使用 `busy` 变量上的 TestAndSet 动作，并在退出前将 `busy` 变量设置为 `false`。
    通过这种方式，确保两个 Actions 不会同时执行。
