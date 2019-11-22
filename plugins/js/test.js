function test() {
    alert("外部js文件!")
};

function exportCellSingle() {
    layui.use(['layer'], function () {
        $.ajax({
            url: '../json/table.json',
            success: function (res) {
                var list = res.data
                console.log(JSON.stringify(list))
                // 1. 按照文档，通用操作格式化一下数据，比如这里只需要导出其中三列，梳理口诀左新右旧
                list = LAY_EXCEL.filterExportData(list, {
                    deviceNumber: 'deviceNumber',
                    deviceName: 'deviceName',
                    deviceType: 'deviceType'
                })
                // 2. 有需要则按照顺序倒插表头
                list.unshift({
                    deviceNumber: '设备编码',
                    deviceName: '设备名称',
                    deviceType: '设备类型'
                })
                // 2. 使用批量设置样式函数 setExportCellStyle 对单元格维度的数据进行批量设置样式
                // PS:注意这里是ARGB，前两位是透明度
                LAY_EXCEL.setExportCellStyle(list, 'A1:C1', {
                    s: {
                        border: {
                            /*top: {style: 'thick', color: {rgb: '#FFF'}},
                            bottom: {style: 'thick', color: {rgb: '#FFF'}},
                            left: {style: 'thick', color: {rgb: '#FFF'}},
                            right: {style: 'thick', color: {rgb: '#FFF'}}*/
                        }
                    }
                })
                // 3. 调用导出函数弹出下载
                LAY_EXCEL.exportExcel(list, '设备详情.xlsx')
            },
            error: function () {
                layer.alert('获取数据失败，请检查是否部署在本地服务器环境下')
            }
        })
    })
}
