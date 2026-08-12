# DESCRIPTION

使用此 Widget 来嵌入外部仪表板工程。

# PROPERTIES

## Dashboard

外部仪表板工程的位置。可以是绝对文件路径、相对文件路径或 HTTP(S) URL。

## Open dashboard

使用此按钮作为便捷快捷方式，在工程编辑器中打开外部仪表板工程。如果外部仪表板的位置由 HTTP(S) URL 给出，则此按钮不可用。

## Dashboard parameters

参数列表，其中每个参数由名称和值指定。每个参数名称必须与外部仪表板中的全局变量名称相对应。当宿主仪表板运行时，参数值将在宿主仪表板侧持续计算，并将改变外部仪表板内的关联全局变量。

# INPUTS [EMPTY]

# OUTPUTS [EMPTY]

# EXAMPLES

-   BB3 SCPI 终端与仪表板
