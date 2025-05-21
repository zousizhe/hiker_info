const csdown = {
    d: [],
    author: '流苏',
    version: '0',
    home: () => {
        var d = csdown.d;
        d.push({
            title:'已跑路，请自行删除，各位也不用去问密码了',
            url:'hiker://empty',
            col_type:'text_center_1'
        })
        setResult(d)
    }
}
$.exports = csdown
