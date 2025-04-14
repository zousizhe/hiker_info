const csdown = {
    d: [],
    author: '流苏',
    version: '20250414',
    rely: (data) => {
        return data.match(/\{([\s\S]*)\}/)[0].replace(/\{([\s\S]*)\}/, '$1')
    },
    home: () => {
        var d = csdown.d;
        if (getItem('up' + csdown.version, '') == '') {
            confirm({
                title: '更新内容',
                content: '版本号：' + csdown.version + '\n没有大BUG不再更新',
                confirm: $.toString((version) => {
                    setItem('up' + version, '1')
                }, csdown.version),
                cancel: $.toString(() => {})
            })
        }
        if (MY_PAGE == 1) {
            d.push({   
                title: "搜索 ",
                url: $.toString(() => {
                    putMyVar('keyword', input)
                    if (/^(JM)?\d{5,7}$/.test(getMyVar('keyword'))) {
                        return 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()'
                    } else {
                        return 'hiker://empty?page=fypage@rule=js:$.require("csdown").search()'
                    }
                }),
                   desc: "请输入搜索关键词|车牌号",
                   col_type: "input",
                extra: {
                    defaultValue: getMyVar('keyword', ''),
                }
            })
        };
        var pg = getParam('page');
        var 首页 = [{
            title: '首页&分类&每周必看',
            id: '1&2&3&4&5',
            img: 'https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/47.png&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/78.png&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/109.png'
        }];
        if (MY_PAGE == 1) {
            eval(csdown.rely(csdown.aes));
            let longclick = [{
                title: '切换图源，当前图源：' + getItem('图源', '图源1'),
                js: $.toString(() => {
                    let option = ['图源1', '图源2', '图源3', '图源4'];
                    let Line = {
                        title: '修改画质',
                        options: option,
                        col: 1,
                        js: $.toString(() => {
                            eval($.require("csdown").rely($.require("csdown").aes))
                            let num = Number(input.match(/\d+/)[0]);
                            var url = "https://www.cdnblackmyth.club|https://www.cdnmhwscc.vip|https://www.cdnmhws.cc|https://www.cdnuc.vip".split('|');
                            let img_host = post(url[num - 1] + '/setting').img_host;
                            log(img_host)
                            setItem('img_host', img_host)
                            setItem('图源', input)
                            refreshPage(false);
                            toast('图源更新为：' + '图源' + num);
                        })
                    }
                    return 'select://' + JSON.stringify(Line);
                })
            }]
            Cate(首页, '首页', d, 'icon_3_round_fill', longclick);
            d.push({
                col_type: 'line',
            }, {
                col_type: 'big_blank_block',
            }, {
                col_type: 'big_blank_block',
            });
        }
        var 分类 = getMyVar('首页', '1');
        if (分类 == 1) {
            csdown.main()
        } else if (分类 == 2) {
            csdown.cate()
        } else if (分类 == 3) {
            csdown.week()
        }
        setResult(d)
    },
    main: () => {
        var d = csdown.d;
        eval(csdown.rely(csdown.aes));
        try {
            var pg = getParam('page');
            var page = Number(pg) - 1;
            if (MY_PAGE == 1) {
                let 首页分类 = [{
                    title: '首页&最新上传',
                    id: '1&2'
                }];
                Cate(首页分类, '首页分类', d, 'text_2');
                if (getMyVar('首页分类', '1') == 1) {
                    let promote_url = getItem('host') + '/promote?page=' + page;
                    let promote_data = post(promote_url);
                    promote_data.forEach(data => {
                        d.push({
                            title: color(data.title),
                            img: 'hiker://images/icon_right5',
                            url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").main_erji()',
                            col_type: 'text_icon',
                            extra: {
                                id: data.id,
                            }
                        })
                        let content = data.content;
                        content.forEach(data => {
                            d.push({
                                title: data.name,
                                desc: timestampToTime(data.update_at, 0),
                                img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                                url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                                col_type: 'movie_3',
                                extra: {
                                    id: data.id,
                                    author: data.author,
                                }
                            })
                        })
                    })
                }
            }
            if (getMyVar('首页分类', '1') == 2) {
                let latest_url = getItem('host') + '/latest?page=' + page;
                let latest_data = post(latest_url);
                latest_data.forEach(data => {
                    d.push({
                        title: data.name,
                        desc: timestampToTime(data.update_at, 0),
                        img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                        url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                        col_type: 'movie_3',
                        extra: {
                            id: data.id,
                            author: data.author,
                        }
                    })
                })
            }
        } catch (e) {
            log(e.message)
            if (getMyVar('a', '') == '') {
                var url = "https://www.cdnblackmyth.club|https://www.cdnmhwscc.vip|https://www.cdnmhws.cc|https://www.cdnuc.vip".split('|');
                //域名获取
                var t = Math.floor(Date.now() / 1000) + '';
                for (var item of url) {
                    var data = JSON.parse(fetch(item + '/setting', {
                        headers: {
                            'cookie': 'ipcountry=HK',
                            'tokenparam': t + ',1.7.9',
                            'token': md5(t + '18comicAPP'),
                            'user-agent': 'Mozilla/5.0 (Linux; Android 7.1.2; DT1901A Build/N2G47O; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36',
                        },
                        method: 'GET',
                        withStatusCode: true,
                        timeout: 5000,
                    }));
                    if (data.statusCode == 200) {
                        setItem('host', item);
                        let img_host = post(item + '/setting').img_host;
                        setItem('img_host', img_host)
                        refreshPage(false);
                        toast('域名更新为：' + item);
                        putMyVar('a', '1')
                        break;
                    }
                }
            }
        }
    },
    aes: $.toString(() => {
        //加载CryptoJS库
        eval(getCryptoJS())

        function color(txt) {
            return '<b><font color=' + '#FF6699' + '>' + txt + '</font></b>'
        }

        function strong(d, c) {
            return '‘‘’’<strong><font color=#' + (c || '000000') + '>' + d + '</font></strong>';
        }

        function Cate(list, n, d, col, longclick) {
            if (!col) {
                col = 'scroll_button';
            }
            if (!longclick) {
                longclick = [];
            }
            var index_n = list[0].id.split('&')[0] + '';
            list.forEach(data => {
                var title = data.title.split('&');
                var id = data.id.split('&');
                if (data.img != null) {
                    var img = data.img.split('&');
                } else {
                    var img = [];
                }
                title.forEach((title, index) => {
                    d.push({
                        title: (getMyVar(n, index_n) == id[index] ? strong(title, 'FF6699') : title),
                        img: img[index],
                        url: $('#noLoading#').lazyRule((n, title, id) => {
                            putMyVar(n, id);
                            refreshPage(false);
                            return 'hiker://empty';
                        }, n, title, id[index] + ''),
                        col_type: col,
                        extra: {
                            longClick: longclick,
                        }
                    })
                })
                d.push({
                    col_type: 'blank_block',
                });
            })
            return d;
        }

        function post(url) {
            var t = Math.floor(Date.now() / 1000) + '';
            var html = fetch(url, {
                headers: {
                    'cookie': 'ipcountry=HK',
                    'tokenparam': t + ',1.7.9',
                    'token': md5(t + '18comicAPP'),
                    'user-agent': 'Mozilla/5.0 (Linux; Android 7.1.2; DT1901A Build/N2G47O; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36',
                },
                method: 'GET',
            });
            let html1 = JSON.parse(html).data;
            const key = CryptoJS.enc.Utf8.parse(md5(t + '185Hcomic3PAPP7R'));
            let encryptedHexStr = CryptoJS.enc.Base64.parse(html1);
            let decrypt = CryptoJS.AES.decrypt({
                ciphertext: encryptedHexStr
            }, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedStr)
        }

        var vod = $('').lazyRule(() => {
            eval($.require("csdown").rely($.require("csdown").aes))
            var url = getItem('host') + '/video?id=' + input + '&video_type=movie';
            let data = post(url);
            log(data)

        })


        var pic = $('').lazyRule(() => {
            eval($.require("csdown").rely($.require("csdown").aes))
            let url = getItem('host') + '/chapter?id=' + input;
            let data = post(url);
            try {
                let img = [];
                for (item of data.images) {
                    var picUrl = getItem('img_host') + '/media/photos/' + input + '/' + item;
                    let decode = $('').image((picUrl) => {
                        return $.require("hiker://page/csdown?rule=𝐉𝐌𝐂𝐨𝐦𝐢𝐜𝟐").decodeimg(picUrl, input);
                    }, picUrl);
                    img.push(picUrl + decode)
                }
                return "pics://" + img.join("&&")
            } catch {
                return 'toast://看不了';
            }
        })


        function timestampToTime(tm, ts) {
            var date = new Date(tm * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1;
            var h = ' | ' + date.getHours() + ':';
            var m = date.getMinutes();
            if (m < 10) m = '0' + m;
            m = m + ':'
            var s = date.getSeconds();
            if (s < 10) s = '0' + s;
            if (ts == 0) return Y + M + D;
            if (ts == 1) return Y + M + D + h + m + s;
        }
    }),
    search: () => {
        var d = csdown.d;
        eval(csdown.rely(csdown.aes))
        let pg = getParam('page');
        if (MY_PAGE == 1) {
            d.push({   
                title: "搜索 ",
                url: $.toString(() => {
                    putMyVar('keyword', input)
                    refreshPage(false)
                    return "hiker://empty"
                }),
                   desc: "输入搜索关键词|车牌号",
                   col_type: "input",
                extra: {
                    defaultValue: getMyVar('keyword', ''),
                    pageTitle: '搜索结果'
                }
            })
            let 搜索分类 = [{
                title: '最新&最多点阅&最多图片&最多爱心',
                id: '&mv&mp&tf'
            }];
            Cate(搜索分类, '搜索分类', d);
        }
        let url = getItem('host') + '/search?search_query=' + getMyVar('keyword') + '&o=' + getMyVar('搜索分类', '') + '&page=' + pg;
        let list = post(url).content;
        list.forEach(data => {
            d.push({
                title: data.name,
                desc: timestampToTime(data.update_at, 0),
                img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                col_type: 'movie_3',
                extra: {
                    id: data.id,
                    author: data.author,
                }
            })
        })
        setResult(d)
    },
    main_erji: () => {
        var d = csdown.d;
        eval(csdown.rely(csdown.aes))
        let id = MY_PARAMS.id;
        let pg = Number(getParam('page')) - 1;
        var url = getItem('host') + '/promote_list?id=' + id + '&page=' + pg;
        try {
            let list = post(url).list;
            list.forEach(data => {
                d.push({
                    title: data.name,
                    desc: timestampToTime(data.update_at, 0),
                    img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                    url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                    col_type: 'movie_3',
                    extra: {
                        id: data.id,
                        author: data.author,
                    }
                })
            })
        } catch (e) {
            log(e.message)
        }
        setResult(d)
    },
    erji: () => {
        var d = csdown.d;
        eval(csdown.rely(csdown.aes))
        let pg = getParam('page');
        let id = MY_PARAMS.id || getMyVar('keyword').match(/\d+/)[0];
        var url = getItem('host') + '/album?id=' + id;
        try {
            var data = post(url);
            var series = data.series;
            //  let time_text = "yyyy年-MM月-dd日";
            d.push({
                title: data.name,
                //  desc: `❤️ ${data.likes}喜欢  ${data.comment_total}评论  ${data.total_views}观看 \n`+$.dateFormat((+data.addtime)*1000, time_text),
                desc: `❤️ ${data.likes}喜欢  ${data.comment_total}评论  ${data.total_views}观看 \n` + timestampToTime(data.addtime, 0),
                url: $('hiker://empty').rule((description, img, tags) => {
                    let d = [];
                    setPageTitle('详情')
                    d.push({
                        img: img,
                        url: img,
                        col_type: 'pic_1_full',
                    }, {
                        title: tags.join(' '),
                        col_type: 'rich_text',
                    }, {
                        title: description,
                        col_type: 'rich_text',
                    })
                    setResult(d)
                }, data.description, getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg', data.tags),
                img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                col_type: 'movie_1_vertical_pic_blur',
            })
            d.push({
                title: '  作者',
                img: 'https://mogua.co/download/7faacbe2b59428f67deeb97c17040a43-icon.png',
                url: $('#noLoading#').lazyRule((author) => {
                    let Line = {
                        title: '作者',
                        options: author,
                        col: 2,
                        js: $.toString(() => {
                            return $('hiker://empty?page=fypage').rule((author) => {
                                var d = $.require('csdown').d;
                                eval($.require("csdown").rely($.require("csdown").aes))
                                var pg = getParam('page');
                                let id = author;
                                setPageTitle(id)
                                if (MY_PAGE == 1) {
                                    let 二级分类b = [{
                                        title: '最新&最多点阅&最多图片&最多爱心',
                                        id: '&mv&mp&tf'
                                    }];
                                    Cate(二级分类b, '二级分类b', d);
                                }
                                let url = getItem('host') + '/search?search_query=' + author + '&o=' + getMyVar('二级分类b', '') + '&page=' + pg;
                                let list = post(url).content;
                                list.forEach(data => {
                                    d.push({
                                        title: data.name,
                                        desc: timestampToTime(data.update_at, 0),
                                        img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                                        url: $('hiker://empty?#immersiveTheme#').rule(() => {
                                            return $.require("erji")
                                        }),
                                        col_type: 'movie_3',
                                        extra: {
                                            id: data.id,
                                            author: data.author,
                                        }
                                    })
                                })
                                setResult(d)
                            }, input)
                        })
                    }
                    return 'select://' + JSON.stringify(Line);
                }, data.author),
                col_type: 'icon_2_round'
            })
            if (getVar('shsort') == '1') {
                series = series.reverse();
            }
            d.push({
                title: '查看评论',
                img: 'https://mogua.co/download/7faacbe2b59428f67deeb97c17040a43-icon.png',
                url: $('hiker://empty?page=fypage').rule(() => {
                    var d = $.require('csdown').d;
                    eval($.require("csdown").rely($.require("csdown").aes))
                    setPageTitle('评论')
                    var pg = getParam('page');
                    let id = MY_PARAMS.id;
                    let url = getItem('host') + '/forum?page=' + pg + '&mode=manhua&aid=' + id;
                    let list = post(url).list;
                    list.forEach(data => {
                        d.push({
                            title: data.nickname,
                            desc: 'LV.' + data.expinfo.level + '  ' + data.addtime,
                            img: 'https://mogua.co/download/7faacbe2b59428f67deeb97c17040a43-icon.png',
                            url: 'hiker://empty',
                            col_type: 'avatar',
                        })
                        d.push({
                            title: data.content,
                            col_type: 'rich_text',
                        })
                    })
                    setResult(d)
                }),
                col_type: 'icon_2_round',
                extra: {
                    id: data.id
                }
            })
            d.push({
                title: '车牌:' + data.id,
                url: $('#noLoading#').lazyRule((id) => {
                    toast('已复制车牌号');
                    return 'copy://' + id;
                }, data.id),
                col_type: 'text_3',
            })
            let chapterList = []
            d.push({
                title: "下载漫画",
                url: 'hiker://page/download.view#noRecordHistory##noRefresh#?rule=本地资源管理',
                col_type: 'text_3',
                extra: {
                    chapterList: chapterList,
                    info: {
                        bookName: data.name, //漫画名称,
                        ruleName: MY_RULE.title,
                        bookTopPic: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                        parseCode: $.toString((host, img_host) => {
                            function post(url) {
                                eval(getCryptoJS())
                                var t = Math.floor(Date.now() / 1000) + '';
                                var html = fetch(url, {
                                    headers: {
                                        'cookie': 'ipcountry=HK',
                                        'tokenparam': t + ',1.7.9',
                                        'token': md5(t + '18comicAPP'),
                                        'user-agent': 'Mozilla/5.0 (Linux; Android 7.1.2; DT1901A Build/N2G47O; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36',
                                    },
                                    method: 'GET',
                                });
                                let html1 = JSON.parse(html).data;
                                const key = CryptoJS.enc.Utf8.parse(md5(t + '185Hcomic3PAPP7R'));
                                let encryptedHexStr = CryptoJS.enc.Base64.parse(html1);
                                let decrypt = CryptoJS.AES.decrypt({
                                    ciphertext: encryptedHexStr
                                }, key, {
                                    mode: CryptoJS.mode.ECB,
                                    padding: CryptoJS.pad.Pkcs7
                                });
                                let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                                return JSON.parse(decryptedStr)
                            }

                            let url = host + '/chapter?id=' + input;
                            let data = post(url);
                            let img = [];
                            for (item of data.images) {
                                var picUrl = img_host + '/media/photos/' + input + '/' + item;
                                img.push(picUrl)
                            }
                            return "pics://" + img.join("&&")
                        }, getItem('host'), getItem('img_host')),
                        decode: $.toString((title) => {
                            return $.require("csdown?rule=" + title).decodeimg(url, input);
                        }, MY_RULE.title),
                    },
                    defaultView: "1"
                }

            });
            d.push({
                title: "本地书架",
                url: 'hiker://page/Main.view#noRecordHistory##noRefresh#?rule=本地资源管理',
                col_type: 'text_3',
            }, {
                col_type: "line"
            });
            d.push({
                title: '标签：',
                url: 'hiker://empty',
                col_type: 'flex_button',
            })
            data.tags.forEach(data => {
                d.push({
                    title: data,
                    url: $('hiker://empty?page=fypage').rule(() => {
                        var d = $.require('csdown').d;
                        eval($.require("csdown").rely($.require("csdown").aes))
                        var pg = getParam('page');
                        let id = MY_PARAMS.id;
                        setPageTitle(id)
                        if (MY_PAGE == 1) {
                            let 二级分类a = [{
                                title: '最新&最多点阅&最多图片&最多爱心',
                                id: '&mv&mp&tf'
                            }];
                            Cate(二级分类a, '二级分类a', d);
                        }
                        let url = getItem('host') + '/search?search_query=' + id + '&o=' + getMyVar('二级分类a', '') + '&page=' + pg;
                        let list = post(url).content;
                        list.forEach(data => {
                            d.push({
                                title: data.name,
                                desc: timestampToTime(data.update_at, 0),
                                img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                                url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                                col_type: 'movie_3',
                                extra: {
                                    id: data.id,
                                    author: data.author,
                                }
                            })
                        })
                        setResult(d)
                    }),
                    col_type: 'flex_button',
                    extra: {
                        id: data
                    }
                })
            })
            d.push({
                title: (getVar('shsort') == '1') ? '““””<b><span style="color: #FF0000">当前排序：逆序</span></b>' : '““””<b><span style="color: #1aad19">当前排序：正序</span></b>',
                url: `@lazyRule=.js:let conf = getVar('shsort');if(conf=='1'){putVar({key:'shsort', value:'0'});}else{putVar({key:'shsort', value:'1'})};refreshPage();'toast://切换排序成功'`,
                col_type: 'text_center_1',
            })
            if (data.series + '' == []) {
                d.push({
                    title: '共1话 ' + data.name,
                    url: data.id + pic,
                    col_type: 'text_2',
                })
                chapterList.push({
                    title: '共1话',
                    url: data.id,
                });
            } else {
                series.forEach(data => {
                    d.push({
                        title: '第' + data.sort + '话 ' + data.name,
                        url: data.id + pic,
                        col_type: 'text_2',
                    })
                    chapterList.push({
                        title: '第' + data.sort + '话',
                        url: data.id,
                    });
                })
            }
            d.push({
                col_type: 'blank_block'
            }, {
                title: '推荐',
                url: 'hiker://empty',
                col_type: 'text_center_1',
                extra: {
                    // lineVisible:false,
                }
            })
            data.related_list.forEach(data => {
                d.push({
                    title: data.name,
                    img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                    url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                    col_type: 'movie_3',
                    extra: {
                        id: data.id,
                        author: data.author,
                    }
                })
            })
        } catch (e) {
            log(e.message)
        }
        setResult(d)
    },
    cate: () => {
        var d = csdown.d;
        eval(csdown.rely(csdown.aes));
        try {
            var pg = getParam('page');
            if (MY_PAGE == 1) {
                if (!storage0.getItem('cate')) {
                    let cate_url = getItem('host') + '/categories';
                    let cate_data = post(cate_url);
                    storage0.setItem('cate', cate_data)
                }
                let cate_n = storage0.getItem('cate').categories[0].slug + '';
                putMyVar('cate_n', cate_n);
                storage0.getItem('cate').categories.forEach((data, index) => {
                    d.push({
                        title: (getMyVar('cate_', getMyVar('cate_n')) == data.slug ? strong(data.name, 'FF6699') : data.name),
                        url: $('#noLoading#').lazyRule((n, title, id, index) => {
                            putMyVar(n, id);
                            putMyVar('cate_index', index)
                            refreshPage(false);
                            return 'hiker://empty';
                        }, 'cate_', data.name, data.slug + '', index),
                        col_type: 'scroll_button',
                        extra: {
                            id: data.slug,
                            longClick: [],
                        }
                    })
                })
                d.push({
                    col_type: 'blank_block',
                })
                let 分类A = [{
                    title: '最新&最多爱心&总排行&月排行&周排行&日排行',
                    id: '&tf&mv&mv_m&mv_w&mv_t'
                }];
                Cate(分类A, '分类A', d);
                d.push({
                    col_type: 'blank_block',
                })
                if (storage0.getItem('cate').categories[getMyVar('cate_index', '0')].sub_categories != null) {
                    let subcate = storage0.getItem('cate').categories[getMyVar('cate_index', '0')].sub_categories;
                    d.push({
                        title: (getMyVar('subcate_' + getMyVar('cate_index', '0'), '') == '' ? strong('全部', 'FF6699') : '全部'),
                        url: $('#noLoading#').lazyRule(() => {
                            putMyVar('subcate_' + getMyVar('cate_index', '0'), '');
                            refreshPage(false);
                            return 'hiker://empty';
                        }),
                        col_type: 'scroll_button',
                        extra: {
                            longClick: [],
                        }
                    })
                    subcate.forEach(data => {
                        d.push({
                            title: (getMyVar('subcate_' + getMyVar('cate_index', '0'), '') == ('_' + data.slug) ? strong(data.name, 'FF6699') : data.name),
                            url: $('#noLoading#').lazyRule((n, title, id) => {
                                putMyVar(n, id);
                                refreshPage(false);
                                return 'hiker://empty';
                            }, 'subcate_' + getMyVar('cate_index', '0'), data.name, '_' + data.slug + ''),
                            col_type: 'scroll_button',
                            extra: {
                                id: data.slug,
                                longClick: [],
                            }
                        })
                    })
                }
                d.push({
                    title: '更多分类',
                    url: $('hiker://empty').rule(() => {
                        var d = [];
                        storage0.getItem('cate').blocks.forEach(data => {
                            d.push({
                                title: data.title,
                                col_type: 'rich_text',
                            })
                            data.content.forEach(data => {
                                d.push({
                                    title: data,
                                    url: $('hiker://empty?page=fypage').rule(() => {
                                        var d = $.require('csdown').d;
                                        eval($.require("csdown").rely($.require("csdown").aes))
                                        var pg = getParam('page');
                                        let id = MY_PARAMS.id;
                                        if (MY_PAGE == 1) {
                                            let 二级分类a = [{
                                                title: '最新&最多点阅&最多图片&最多爱心',
                                                id: '&mv&mp&tf'
                                            }];
                                            Cate(二级分类a, '二级分类a', d);
                                        }
                                        let url = getItem('host') + '/search?search_query=' + id + '&o=' + getMyVar('二级分类a', '') + '&page=' + pg;
                                        let list = post(url).content;
                                        list.forEach(data => {
                                            d.push({
                                                title: data.name,
                                                desc: timestampToTime(data.update_at, 0),
                                                img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                                                url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                                                col_type: 'movie_3',
                                                extra: {
                                                    id: data.id,
                                                    author: data.author,
                                                }
                                            })
                                        })
                                        setResult(d)
                                    }),
                                    col_type: 'text_3',
                                    extra: {
                                        id: data
                                    }
                                })
                            })
                        })
                        setResult(d)
                    }),
                    col_type: 'text_center_1',
                })
            }
            let filter_url = getItem('host') + '/categories/filter?page=' + pg + '&order=&c=' + getMyVar('cate_', '') + getMyVar('subcate_' + getMyVar('cate_index', '0'), '') + '&o=' + getMyVar('分类A', '');
            let filter_data = post(filter_url).content;
            filter_data.forEach(data => {
                d.push({
                    title: data.name,
                    desc: timestampToTime(data.update_at, 0),
                    img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                    url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                    col_type: 'movie_3',
                    extra: {
                        id: data.id,
                        author: data.author,
                    }
                })
            })
        } catch (e) {
            log(e.message)
        }
    },
    week: () => {
        var d = csdown.d;
        eval(csdown.rely(csdown.aes));
        try {
            var pg = Number(getParam('page')) - 1;
            if (!storage0.getItem('week')) {
                let week_url = getItem('host') + '/week?page=0';
                let week_data = post(week_url);
                storage0.setItem('week', week_data)
            }
            if (MY_PAGE == 1) {
                storage0.getItem('week').type.forEach(data => {
                    d.push({
                        title: (getMyVar('week_', 'hanman') == data.id ? strong(data.title, 'FF6699') : data.title),
                        url: $('#noLoading#').lazyRule((n, title, id) => {
                            putMyVar(n, id);
                            refreshPage(false);
                            return 'hiker://empty';
                        }, 'week_', data.title, data.id + ''),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    title: getMyVar('time_', storage0.getItem('week').categories[0].time + storage0.getItem('week').categories[0].title),
                    url: $('#noLoading#').lazyRule(() => {
                        let option = [];
                        storage0.getItem('week').categories.forEach(data => {
                            option.push(data.time + data.title)
                        })
                        let Line = {
                            title: '选择时间',
                            options: option,
                            col: 1,
                            js: $.toString(() => {
                                putMyVar('time_', input)
                                let id = Number(input.split('第')[1].split('期')[0]) + 1;
                                putMyVar('week_id', id + '')
                                refreshPage(false)
                            })
                        }
                        return 'select://' + JSON.stringify(Line);
                    }),
                    col_type: 'text_center_1',
                    extra: {
                        lineVisible: false,
                    }
                })
            }
            let week_index = storage0.getItem('week').categories[0].id + '';
            putMyVar('week_index', week_index)
            let filter_url = getItem('host') + '/week/filter?page=' + pg + '&id=' + getMyVar('week_id', getMyVar('week_index')) + '&type=' + getMyVar('week_', 'hanman');
            let filter_data = post(filter_url).list;
            filter_data.forEach(data => {
                d.push({
                    title: data.name,
                    desc: timestampToTime(data.update_at, 0),
                    img: getItem('img_host') + '/media/albums/' + data.id + '_3x4.jpg',
                    url: 'hiker://empty?#immersiveTheme#@rule=js:$.require("csdown").erji()',
                    col_type: 'movie_3',
                    extra: {
                        id: data.id,
                        author: data.author,
                    }
                })
            })
        } catch (e) {
            log(e.message)
        }
    },
    decodeimg: (picUrl, imgInputStream) => {
        const ByteArrayOutputStream = java.io.ByteArrayOutputStream;
        const ByteArrayInputStream = java.io.ByteArrayInputStream;
        const Bitmap = android.graphics.Bitmap;
        const BitmapFactory = android.graphics.BitmapFactory;
        const Canvas = android.graphics.Canvas;
        //let picUrl = picUrl;
        picUrl.match(/photos\/(\d+)?\/(\d+)?/);
        let bookId = RegExp.$1;
        let imgId = RegExp.$2;
        if (!bookId || !imgId || Number(bookId) <= 220980) return imgInputStream;
        if (Number(bookId) >= "268850" && Number(bookId) <= "421925") {
            var $num = parseInt(md5(bookId + imgId).slice(-1).charCodeAt() % 10) * 2 + 2;
        } else if (Number(bookId) > "421925") {
            var $num = parseInt(md5(bookId + imgId).slice(-1).charCodeAt() % 8) * 2 + 2;
        } else {
            var $num = "10";
        }
        /* if (Number(bookId) >= 268850) {
             let $md5 = md5(bookId + imgId);
             let $ascii = $md5.substr(-1).charCodeAt(0) + "";
             let $last = Number($ascii.substr(-1));
             var $num = ($last + 1) * 2;
         } else {
             var $num = 10;
         }*/
        /*let imgInputStream = fetch(picUrl, {
            inputStream: true,
        });
        */
        //let imgInputStream = input;
        let imgBitmap = BitmapFactory.decodeStream(imgInputStream);
        closeMe(imgInputStream);

        let width = imgBitmap.getWidth();
        let height = imgBitmap.getHeight();
        let y = Math.floor(height / $num);
        let remainder = height % $num;

        let newImgBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        let canvas = new Canvas(newImgBitmap);
        for (let i = 1; i <= $num; i++) {
            let h = i === $num ? remainder : 0;
            canvas.drawBitmap(Bitmap.createBitmap(imgBitmap, 0, y * (i - 1), width, y + h), 0, height - y * i - h, null);
        }
        let baos = new ByteArrayOutputStream();
        newImgBitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
        return new ByteArrayInputStream(baos.toByteArray());
    }
}
$.exports = csdown
