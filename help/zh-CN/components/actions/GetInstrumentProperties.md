# DESCRIPTION

使用此 Action，我们可以获取 IEXT 仪器扩展中定义的仪器属性。

例如，在 `Rigol Waveform Data` 示例中，我们想要获取仪器有多少个通道以及每个通道使用的颜色。首先，我们可以查看 Rigol DS1000Z 仪器的所有属性：

![Alt text](../images/get_instrument_properties_rigol_props.png)

现在有必要定义我们要在其中存储感兴趣属性的 Flow 变量类型。在这种情况下，我们定义如下所示的 `struct:InstrumentProperties` 类型：

![Alt text](../images/get_instrument_properties_struct1.png)

`InstrumentProperties` 结构体有一个名为 `channels` 的成员，其类型为 `array:InstrumentPropertiesChannel`，定义如下：

![Alt text](../images/get_instrument_properties_struct2.png)

现在，使用此 Action，我们可以一步获取所有通道的信息：

![Alt text](../images/get_instrument_properties.png)

获取属性后，我们可以使用 `Array.length(properties.channels)` 找出通道数，例如使用 `properties.channels[0].color` 找出第 1 个通道的颜色。

# PROPERTIES

## Instrument

将获取其属性的仪器。

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

## properties

获取的属性被发送到此输出。

# EXAMPLES

- _Rigol 波形数据_
