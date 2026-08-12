# DESCRIPTION

打开键盘页面以进行文本输入。键盘页面必须位于工程中，且其 ID 必须为 2。键盘页面也可以通过 _Input_ Widget 打开。

请参阅 _Keyboard, Keypad and Message Box_ 示例了解如何定义键盘页面：

![Alt text](../images/show_keyboard.png)

# PROPERTIES

## Label

将显示在键盘页面上的标签（例如，输入其值的参数的名称）。

## Inital text

将显示在输入字段中的初始（默认）文本。

## Min chars

定义输入文本的最小长度。

## Max chars

定义输入文本的最大长度。

## Password

用于输入隐藏文本（如用户密码）时使用。启用后，输入的每个字符都会被替换为 `*`。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## result

输入文本被发送到的输出。

## canceled

如果按下取消按钮，则 Flow 执行通过此输出继续。

# EXAMPLES

-   _Keyboard, Keypad and Message Box_
-   _stm32f469i-disco-eez-flow-demo_
