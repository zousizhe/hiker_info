const qiezi = {
    d: [],
    version: '20250306',
    rely: (data) => {
        return data.match(/\{([\s\S]*)\}/)[0].replace(/\{([\s\S]*)\}/, '$1')
    },
    shouye: () => {
        var d = qiezi.d;
        if (MY_PAGE == 1) {
            d.push({   
                title: "搜索 ",
                url: $.toString(() => {
                    putMyVar('keyword', input)
                    return "hiker://empty?page=fypage&kw=" + input + '@rule=js:$.require("qiezi").search()'
                }),
                   desc: "请输入搜索关键词",
                   col_type: "input",
                extra: {
                    defaultValue: getMyVar('keyword', ''),
                }
            })
        };
        //var t = Math.floor(Date.now());
        var list = [{
            title: '首页&综合',
            id: '1&2&3&4&5',
            img: 'https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/movie/127.svg&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/movie/137.svg&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/movie/113.svg&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/movie/114.svg&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/movie/122.svg'
        }];
        if (MY_PAGE == 1) {
            function strong(d, c) {
                return '‘‘’’<strong><font color=#' + (c || '000000') + '>' + d + '</font></strong>';
            }
            var index_n = list[0].id.split('&')[0];
            list.forEach(data => {
                var title = data.title.split('&');
                var id = data.id.split('&');
                var img = data.img.split('&');
                title.forEach((title, index) => {
                    d.push({
                        title: (getMyVar('首页', index_n) == id[index] ? strong(title, 'FF6699') : title),
                        img: img[index],
                        url: $('#noLoading#').lazyRule((title, id) => {
                            putMyVar('首页', id);
                            refreshPage(false);
                            return 'hiker://empty';
                        }, title, id[index]),
                        col_type: 'icon_2_round',
                        extra: {
                            longClick: [{
                                title: '更新数据',
                                js: $.toString(() => {
                                    eval($.require('qiezi').rely($.require('qiezi').aes));
                                    let shouye = qzDecrypt(request('http://003.22s.lol/encrypt/api.php?path=qiezi/shouye'));
                                    let data = qzDecrypt(request('http://003.22s.lol/encrypt/api.php?path=qiezi/zonghe'));
                                    let search = fetch('http://003.22s.lol/searchconfig/vipapi/vipconfig.txt');
                                    // var kuozhan=qzDecrypt(request('http://004.22s.lol/encrypt/api.php?path=qiezi/heikeji'));
                                    // var yuming=qzDecrypt(request('http://01.xka3a.top/encrypt/api.php?path=yuming/yuming'));
                                    //  var gonggao=qzDecrypt(request('http://003.22s.lol/encrypt/api.php?path=qiezi/qz'));
                                    let avbk = fetch('https://app.caoppht.com/avbk132.php');
                                    //茄子数据
                                    //http://api.xka1.top/qiezi/shouye.txt
                                    //http://api.xka1.top/qiezi/zonghe.txt
                                    //小可爱数据
                                    //http://api.xka1.top/xiaokeai/shouye.txt
                                    //http://api.xka1.top/xiaokeai/zonghe.txt
                                    setItem('shouye', shouye);
                                    setItem('data', data);
                                    setItem('search', search);
                                    setItem('avbk', avbk);
                                    // setItem('yuming',yuming);
                                    //setItem('kuozhan',kuozhan);
                                    // setItem('gonggao',gonggao);
                                    refreshPage(false);
                                    toast('数据已更新');
                                    log('数据已更新');
                                    return 'hiker://empty';
                                })
                            }, {
                                title: '更换线路',
                                js: $.toString(() => {
                                    var url = 'https://api1.yilushunfeng.top|https://api.changfapiaopiao.top|http://api1.yilushunfeng.top|http://api.changfapiaopiao.top|http://api1.apijiekou.top/api|http://api.phpjiekou.top|http://004.22s.lol/api'.split('|');
                                    var option = '线路1(推荐)&线路2&线路3&线路4&线路5&线路6&线路7'.split('&')
                                    var Line = {
                                        title: '切换线路',
                                        options: option,
                                        col: 2,
                                        js: $.toString((url) => {
                                            var index = input.match(/\d+/)[0];
                                            var host = url[index - 1];
                                            setItem('host', host);
                                            refreshPage(false);
                                            toast('线路已更换');
                                        }, url)
                                    }
                                    return 'select://' + JSON.stringify(Line);
                                })
                            }]
                        }
                    })
                })
                d.push({
                    col_type: 'blank_block',
                });
            })
            d.push({
                col_type: 'big_blank_block',
            });
        }
        //setPreResult(d)
        var 分类 = getMyVar('首页', '1');
        if (分类 == 1) {
            qiezi.video()
        } else if (分类 == 2) {
            qiezi.zonghe()
        }
        setResult(d)
    },
    video: () => {
        eval(qiezi.rely(qiezi.aes))
        try {
            var d = qiezi.d;
            //log(getItem('shouye'))
            //log(getItem('data'))
            //log(getItem('gonggao'))
            //log(getItem('avbk'))
            var list = getItem('shouye').split('首页数据开始')[1].split('首页数据结束')[0].replace(/https?\:\/\/(api1?\.)?(changfapiaopiao|yilushunfeng|phpjiekou|apijiekou)\.top(\/api)?/g, getItem('host')).split('换行');
            list.forEach(data => {
                var qd = sp(data, "qd(", ")");
                var tp = sp(data, "tp(", ")");
                var mc = sp(data, "mc(", ")");
                var wz = sp(data, "gjc(", ")");
                var ym = sp(data, "ym(", ")");
                var lx = sp(data, "lx(", ")");
                var qb = qd + '  ' + mc + '  ' + wz + '  ' + ym + '  ' + lx;
                if (qd == '麻豆TV') {
                    d.push({
                        title: mc,
                        desc: qb,
                        img: 'http://api.xka1.top' + tp,
                        url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").madou()',
                        col_type: 'icon_4_card'
                    })
                } else if (qd == '91TV') {
                    d.push({
                        title: mc,
                        desc: qb,
                        img: 'http://api.xka1.top' + tp,
                        url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").tv_91()',
                        col_type: 'icon_4_card'
                    })
                } else if (qd == '猫咪') {
                    d.push({
                        title: mc,
                        desc: qb,
                        img: 'http://api.xka1.top' + tp,
                        url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").maomi()',
                        col_type: 'icon_4_card'
                    })
                } else if (qd == '猫咪原创') {
                    d.push({
                        title: mc,
                        desc: qb,
                        img: 'http://api.xka1.top' + tp,
                        url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").maomiyuanchuang()',
                        col_type: 'icon_4_card'
                    })
                } else {
                    d.push({
                        title: mc,
                        desc: qb,
                        img: 'http://api.xka1.top' + tp,
                        url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                        col_type: 'icon_4_card',
                        extra: {
                            host: `${ym}/${wz}.php`,
                            wz: wz,
                        }
                    })
                }
            })
            d.push({
                title: '撸先生',
                img: 'http://api.xka1.top/6img/lusir.png',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video1/lusir.php`,
                    wz: 'lusir',
                }
            }, {
                title: '猫咪视频',
                img: 'http://api.xka1.top/6img/maomisq.png',
                url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").maomiav()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}`,
                    wz: 'maomiav',
                }
            }, {
                title: 'JAV日本区',
                img: 'http://api.xka1.top/6img/javn.png',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video2/jav123/jav.php`,
                    wz: 'jav',
                }
            }, {
                title: '秘爱',
                img: 'http://api.xka1.top/6img/miai.jpg',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video2/xinghuafang/miai.php`,
                    wz: 'miai',
                }
            }, {
                title: 'UAA视频',
                img: 'http://api.xka1.top/6img/uaa.png',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video2/uaa/uaa.php`,
                    wz: 'uaa',
                }
            }, {
                title: 'UU视频',
                img: 'http://api.xka1.top/6img/uusp.png',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video1/caoliusp_xilie/uushipin.php`,
                    wz: 'uushipin',
                }
            }, {
                title: '图宅',
                img: 'http://api.xka1.top/6img/tuzac.png',
                url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").picerji()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/picture/tuzac.php`,
                    wz: 'tuzac',
                }
            }, {
                title: '嘿嘿连载',
                img: 'http://api.xka1.top/6img/heiheilz.png',
                url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").manhuaerji()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/comic/heiheilz.php`,
                    wz: 'heiheilz',
                }
            }, {
                title: '禁漫天堂[新]',
                img: 'http://api.xka1.top/6img/jinmantt.png',
                url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").manhuaerji()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/comic/jinmantt.php`,
                    wz: 'jinmantt',
                }
            }, {
                title: '暗网[每日大赛]',
                img: 'http://api.xka1.top/6img/meiridasai.png',
                url: 'hiker://empty?#noHistory#@rule=js:$.require("qiezi").videoerji()?page=fypage',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/erji/meiridasai/aw/mrds.php`,
                    wz: 'mrds',
                }
            }, {
                title: '帖子[每日大赛]',
                img: 'http://api.xka1.top/6img/meiridasai.png',
                url: 'hiker://empty?page=fypage@rule=js:$.require("qiezi").blackerji()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/erji/meiridasai/daily.php`,
                    wz: 'daily',
                }
            }, {
                title: '博天堂',
                img: 'http://api.xka1.top/6img/f4.png',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video2/botiantang/btt.php`,
                    wz: 'btt',
                }
            }, {
                title: '小狐狸',
                img: 'http://api.xka1.top/6img/xiaohuli1.png',
                url: 'hiker://empty?page=fypage&#noHistory#@rule=js:$.require("qiezi").syvideo()',
                col_type: 'icon_4_card',
                extra: {
                    host: `${getItem('host')}/video1/