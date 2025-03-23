const tudou = {
    d: [],
    rely: (data) => {
        return data.match(/\{([\s\S]*)\}/)[0].replace(/\{([\s\S]*)\}/, '$1')
    },
    home: () => {
        var d = tudou.d;
        var pg = MY_URL.replace('hiker://empty##', '');
        let image = $().image(() => {
            const CryptoUtil = $.require("hiker://assets/crypto-java.js");
            let textData = CryptoUtil.Data.parseInputStream(input);
            let base64Text = textData.toString();
            let encrypted0 = CryptoUtil.Data.parseBase64(base64Text, _base64.NO_WRAP);
            return encrypted0.toInputStream();
        });
        try {

            let movie_index_url = getItem('host') + '/api/movie/index';
            let movie_cate = fetch(movie_index_url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'api-token': getItem('token'),
                    'api-type': 'WAP',
                },
                body: 'page=1',
                method: 'POST'
            })
            let movie_cate_data = JSON.parse(movie_cate).data.cates;
            let movie_cate_data_n = movie_cate_data[0].id + '';

            function strong(d, c) {
                return '‘‘’’<strong><font color=#' + (c || '000000') + '>' + d + '</font></strong>';
            }
            movie_cate_data.forEach(data => {
                d.push({
                    title: (getMyVar('movie_cate', movie_cate_data_n) == data.id ? strong(data.name, 'FF6699') : data.name),
                    url: $('#noLoading#').lazyRule((n, title, id) => {
                        putMyVar(n, id);
                        refreshPage(false);
                        return 'hiker://empty';
                    }, 'movie_cate', data.name, data.id + ''),
                    col_type: 'scroll_button',
                })
            })
            let movie_list_url = getItem('host') + '/api/movie/list';
            let movie_list = JSON.parse(fetch(movie_list_url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'api-token': getItem('token'),
                    'api-type': 'WAP',
                },
                body: 'page=' + pg + '&style=0&cates=' + getMyVar('movie_cate', movie_cate_data_n),
                method: 'POST'
            })).data.list;
            movie_list.forEach(data => {
                d.push({
                    title: data.name,
                    img: 'hiker://images/icon_right5',
                    url: data.id,
                    col_type: 'text_icon',
                })
                let movie_list_list = data.list;
                movie_list_list.forEach(data => {
                    if (getMyVar('vod_host') == '') {
                        let vod_host = data.cover_url.split('.com/')[0] + '.com/';
                        putMyVar('vod_host', vod_host)
                    }
                    d.push({
                        title: data.title,
                        desc: data.duration,
                        img: data.cover_url + image,
                        url: getMyVar('vod_host') + data.src,
                        col_type:'movie_2',
                    })
                })
            })
            setResult(d)
        } catch (e) {
            log(e.message)
            if (getMyVar('a') == '') {
                let host = 'https://apip.as7zy5.cn';
                setItem('host', host);
                let account_url = getItem('host') + '/api/in/autoAccount3';
                let account_body = 'client_id=&c_code=&p_code=&a_code=&a_ins=';
                let account_data = fetch(account_url, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'api-token': 'false',
                        'api-type': 'WAP'
                    },
                    body: account_body,
                    method: 'POST'
                });
                let account_token = JSON.parse(account_data).data.token;
                let account_client_id = JSON.parse(account_data).data.client_id;
                setItem('token', account_token);
                setItem('client_id', account_client_id);
                putMyVar('a', '1')
                refreshPage(false)
                toast('域名已更新')
            }
        }
    },
}
$.exports = tudou
