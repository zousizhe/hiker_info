const mls = {
    d: [],
    version: '0',
    author: '流苏',
    rely: (data) => {
        return data.match(/\{([\s\S]*)\}/)[0].replace(/\{([\s\S]*)\}/, '$1')
    },
    home: () => {
        var d = mls.d;
        d.push({
    title:'停止维护，请自行删除',
    url:'hiker://empty',
    col_type:'text_center_1'
})
        setResult(d)
    }
}
$.exports = mls
