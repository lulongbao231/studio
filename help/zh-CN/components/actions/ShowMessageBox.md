# DESCRIPTION

此 Action 用于显示 _Info_（信息）、_Error_（错误）或 _Question_（询问）消息框。

# PROPERTIES

## Message type

定义将显示的消息框：

-   `Info`（信息）

![Alt text](../images/show_message_box_info.png)

-   `Error`（错误）

![Alt text](../images/show_message_box_error.png)

-   `Question`（询问）

![Alt text](../images/show_message_box_question.png)

## Message

要显示的消息内容。

## Buttons

此属性仅需为 _Question_（询问）消息框定义。这里需要一个字符串数组，其中每个字符串映射到一个按钮，例如 `["Save", "Don't Save", "Cancel"]`。需要在"Flow - Outputs"部分为每个按钮添加一个输出，如果按下该按钮，Flow 执行将通过该输出继续。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _Keyboard, Keypad and Message Box_
