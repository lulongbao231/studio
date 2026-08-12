# DESCRIPTION

打开数字键盘页面以进行数字输入。数字键盘页面必须位于工程中，且其 ID 必须为 3。数字键盘页面也可以通过 _Input_ Widget 打开。

请参阅 _Keyboard, Keypad and Message Box_ 示例了解如何定义数字键盘页面：

![Alt text](../images/show_keypad.png)

# PROPERTIES

## Label

将显示在键盘页面上的标签（例如，输入其值的参数的名称）。

## Inital value

将显示在输入字段中的初始（默认）数字。

## Min

输入的数字必须大于或等于此数字。

## Max

输入的数字必须小于或等于此数字。

## Precision

定义输入数字的舍入精度。例如，如果希望最多保留两位小数，则应在此处输入 `0.01`。

## Unit

输入数字时将显示的单位。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## result

输入的数字值被发送到的输出。

## canceled

如果按下取消按钮，则 Flow 执行通过此输出继续。

# EXAMPLES

-   _stm32f469i-disco-eez-flow-demo_
-   _eyboard, Keypad and Message Box_
