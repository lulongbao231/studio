# DESCRIPTION

用于处理可以在 Action 所在的页面内广播的事件。

# PROPERTIES

## Event

要处理的事件。以下页面事件可用：

- `Page open` - 当页面变为活动状态时发出，例如当使用 `ShowPage` Action 显示它时。

- `Page close` - 当页面变为非活动状态时发出。

- `Keydown` - 当按下键盘上的某个键时发出。一个带有[键盘按键名称](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)的字符串被发送到 `event` 输出。

# INPUTS [EMPTY]

# OUTPUTS

## seqout

一个标准顺序输出。当选定的事件发出时，Flow 执行将通过此输出继续。

## event

通过此输出，为广播事件发送附加信息（如果有）。`Page open` 和 `Page close` 事件不会通过此输出发送任何内容，而 `Keydown` 事件会发送一个带有[按键名称](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)的字符串。

# EXAMPLES

-   _俄罗斯方块_
