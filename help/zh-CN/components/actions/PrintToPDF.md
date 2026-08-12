# DESCRIPTION

用于打印 Widget 的内容。目前仅支持打印 Tabulator Widget。

# PROPERTIES

## Widget

对 Tabulator Widget 的引用。请参阅 `Output widget handle` 属性以了解如何获取此引用。

## Options

您可以通过 JSON 指定以下打印选项：

-   landscape 布尔值（可选）- 纸张方向。true 为横向，false 为纵向。默认为 false。

-   scale 数字（可选）- 网页渲染的缩放比例。默认为 1。

-   pageSize 字符串 | Size（可选）- 指定生成的 PDF 的页面大小。可以是 A0、A1、A2、A3、A4、A5、A6、Legal、Letter、Tabloid、Ledger，或一个包含以英寸为单位的 height 和 width 的对象。默认为 Letter。

-   margins 对象（可选）
    -   marginType 字符串 | Size（可选）- 可以是 "default" 或 "custom"。
    -   top 数字（可选）- 上边距，以英寸为单位。默认为 1cm（约 0.4 英寸）。
    -   bottom 数字（可选）- 下边距，以英寸为单位。默认为 1cm（约 0.4 英寸）。
    -   left 数字（可选）- 左边距，以英寸为单位。默认为 1cm（约 0.4 英寸）。
    -   right 数字（可选）- 右边距，以英寸为单位。默认为 1cm（约 0.4 英寸）。

例如：

```
{
    landscape: true,
    scale: 1,
    pageSize: "A4",
    margins: {
        marginType: "custom",
        top: 0.8,
        bottom: 0.8,
        left: 0.8,
        right: 0.8
    }
}
```

# INPUTS

## seqin

一个标准顺序输入。

# OUTPUTS

## seqout

一个标准顺序输出。

# EXAMPLES

-   _Tabulator 示例_
