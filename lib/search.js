import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from "axios"
import qs from "qs"
let no = 1
let data, result, x, y, z, pagina, rand, slink

function quotes(input) {
    return new Promise((resolve, reject) => {
            fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
                .then(res => res.text())
                .then(res => {
                    const $ = cheerio.load(res)
                    data = []
                    $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function(index, element) {
                        x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
                        y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
                        z = $(element).find('q[class="fbquote"]').text().trim()
                        data.push({
                            author: x,
                            bio: y,
                            quote: z
                        })
                    })
                    data.splice(2, 1)
                    if (data.length == 0) return resolve({
                        creator: 'stikerin',
                        status: false
                    })
                    resolve({
                        creator: 'stikerin',
                        status: true,
                        data
                    })
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function komikindogetch(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#chapter_list > ul > li').each(function(a, b) {
                        result = {
                            status: 200,
                            author: 'wudy',
                            title: $(b).find('> span.lchx > a').attr('href'),
                            get_url: $(b).find('> span.lchx > a').text()
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function otakudesugetepsddl(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(2) > li').each(function(a, b) {
                        let dati = {
                            dl_url: $(b).find('> a ').attr('href'),
                            title: $(b).find('> strong ').text()
                        }
                        hasil.push(dati)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })

}

function quotesAnime() {
    return new Promise((resolve, reject) => {
            const page = Math.floor(Math.random() * 184)
            axios.get('https://otakotaku.com/quote/feed/' + page)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = []
                    $('div.kotodama-list').each(function(l, h) {
                        hasil.push({
                            link: $(h).find('a').attr('href'),
                            gambar: $(h).find('img').attr('data-src'),
                            karakter: $(h).find('div.char-name').text().trim(),
                            anime: $(h).find('div.anime-title').text().trim(),
                            episode: $(h).find('div.meta').text(),
                            up_at: $(h).find('small.meta').text(),
                            quotes: $(h).find('div.quote').text().trim()
                        })
                    })
                    resolve(hasil)
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nhentaisearch(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://nhentai.to/search?q=${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('body > div.container.index-container > div').each(function(a, b) {
                        result = {
                            author: '©lui',
                            status: 200,
                            index: `${no++}`,
                            link: 'https://nhentai.to' + $(b).find('> a').attr('href'),
                            thumb: $(b).find('> a > img:nth-child(2)').attr('src'),
                            title: $(b).find('> a > div').text()
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function doujindesusearch(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://212.32.226.234/?s=${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#archives > div > article').each(function(a, b) {
                        result = {
                            link: 'https://212.32.226.234' + $(b).find('> a').attr('href'),
                            thumb: $(b).find('> a > figure > img').attr('src'),
                            title: $(b).find('> a > figure > img').attr('title'),
                            type: $(b).find('> a > figure > span').text(),
                            status: $(b).find('> a > div > div.status').text(),
                            score: $(b).find('> a > div > div.score').text()
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function doujindesuch(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#chapter_list > ul > li').each(function(a, b) {
                        result = {
                            title: $(b).find('> div.chright > span > a').attr('title'),
                            url: $(b).find('> div.chright > span > a').attr('href')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function doujindesulatest() {
    return new Promise((resolve, reject) => {
            axios.get(`https://212.32.226.234`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#archives > div > article').each(function(a, b) {
                        result = {
                            title: $(b).find('> a').attr('title'),
                            link: 'https://212.32.226.234' + $(b).find('> a').attr('href'),
                            info: $(b).find('div > div > a > span').text(),
                            type: $(b).find('> a > figure > span').text(),
                            thumb: $(b).find('> a > figure > img').attr('src')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function playstore(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://play.google.com/store/search?q=${query}&c=apps`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#yDmH0d > c-wiz.SSPGKf.glB9Ve > div > div > c-wiz > c-wiz > c-wiz > section > div > div > div > div').each(function(a, b) {
                        result = {
                            status: 200,
                            author: 'wudy',
                            video_preview: $(b).find('div > div > div > a > div.Vc0mnc > div > button').text(),
                            thumb: $(b).find('> div > div.limitnjg > img').attr('src'),
                            info: $(b).find('> div > div.desc').text(),
                            url: $(b).find('> div > h2 > a').attr('href')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function sektekomiksearch(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://sektekomik.xyz/manga?search=${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#swiper-wrapper-32f18f5ed9677ea4 > div').each(function(a, b) {
                        result = {
                            status: 200,
                            author: 'wudy',
                            title: $(b).find('> div > div.product__item__text > h5 > a').text(),
                            thumb: $(b).find('> div > div.product__item__pic.set-bg.manga').attr('data-setbg'),
                            type: $(b).find('> div > div.product__item__pic.set-bg.manga > div.ep.m-type > a').text()
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nekopoisearch(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://nekopoi.care/search/${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#content > div.postsbody > div.result > ul > li').each(function(a, b) {
                        result = {
                            status: 200,
                            author: 'wudy',
                            title: $(b).find('> div > h2 > a').text(),
                            thumb: $(b).find('> div > div.limitnjg > img').attr('src'),
                            info: $(b).find('> div > div.desc').text(),
                            url: $(b).find('> div > h2 > a').attr('href')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function kusonimelatest() {
    return new Promise((resolve, reject) => {
            axios.get(`https://kusonime.com`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#venkonten > div.vezone > div.venser > div > div.rseries > div.rapi > div.venz > ul > div').each(function(a, b) {
                        result = {
                            title: $(b).find('> div > div.thumb > a').attr('title'),
                            thumb: $(b).find('> div > div.thumb > a > div > img').attr('src'),
                            genre: $(b).find('div > div.content > p:nth-child(4)').text(),
                            url: $(b).find('> div > div.thumb > a').attr('href')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nekopoilatest() {
    return new Promise((resolve, reject) => {
            axios.get(`https://nekopoi.care`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#boxid > div').each(function(a, b) {
                        result = {
                            title: $(b).find('> div.eroinfo > h2 > a').text(),
                            epsd_url: $(b).find('> div.eroinfo > h2 > a').attr('href'),
                            thumb: $(b).find('> div.eroimg > div > img').attr('src'),
                            up_date: $(b).find('> div.eroinfo > span:nth-child(2)').text(),
                            url: $(b).find('> div.eroinfo > span:nth-child(3) > a').attr('href')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nkpepsddl(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#content > div.postsbody > div > div.arealinker > div.boxdownload > div').each(function(a, b) {
                        let dati = {
                            Drop: $(b).find('> div.listlink > p > a:nth-child(1)').attr('href'),
                            Slare: $(b).find('> div.listlink > p > a:nth-child(2)').attr('href'),
                            StreamSB: $(b).find('> div.listlink > p > a:nth-child(2)').attr('href'),
                            Dood: $(b).find('> div.listlink > p > a:nth-child(3)').attr('href'),
                            Racaty: $(b).find('> div.listlink > p > a:nth-child(4)').attr('href'),
                            ZippyShare: $(b).find('> div.listlink > p > a:nth-child(5)').attr('href')

                        }
                        hasil.push(dati)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nhgetimg(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#thumbnail-container > div').each(function(a, b) {
                        hasil.push($(b).find('> a > img').attr('data-src'))
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function dojindsgetimg(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = []
                    $('#anu > img').each(function(a, b) {
                        hasil.push($(b).attr('src'))
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function mangatoons(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://mangatoon.mobi/en/search?word=${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#page-content > div.search-page > div > div.comics-result > div.recommended-wrap > div > div ').each(function(a, b) {
                        result = {
                            status: 200,
                            author: 'wudy',
                            judul: $(b).find('> div.recommend-comics-title > span').text(),
                            genre: $(b).find('> div.comics-type > span').text().trim(),
                            link: 'https://mangatoon.mobi' + $(b).find('> a').attr('href'),
                            thumbnail: $(b).find('> a > div > img').attr('src')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function webtoons(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#content > div.card_wrap.search._searchResult > ul > li ').each(function(a, b) {
                        result = {
                            status: 200,
                            author: 'wudy',
                            judul: $(b).find('> a > div > p.subj').text(),
                            like: $(b).find('> a > div > p.grade_area > em').text(),
                            creator: $(b).find('> a > div > p.author').text(),
                            genre: $(b).find('> a > span').text(),
                            thumbnail: $(b).find('> a > img').attr('src'),
                            url: 'https://www.webtoons.com' + $(b).find('> a').attr('href')
                        }
                        hasil.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function joox(query) {
    return new Promise((resolve, reject) => {
            const time = Math.floor(new Date() / 1000)
            axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
                .then(({
                    data
                }) => {
                    result = []
                    let hasil = []
                    let promoses = []
                    let ids = []
                    data.itemlist.forEach(result => {
                        ids.push(result.songid)
                    });
                    for (let i = 0; i < data.itemlist.length; i++) {
                        const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
                        promoses.push(
                            axios.get(get, {
                                headers: {
                                    Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
                                }
                            })
                            .then(({
                                data
                            }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                                hasil.push({
                                    lagu: res.msong,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                    mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    creator: "ariffb",
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch((error) => {
                                console.error("Terjadi kesalahan:", error)
                            })
                        )
                    }
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function otakudesu(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://otakudesu.video=/?s=${query}&post_type=anime`).then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#venkonten > div > div.venser > div > div > ul > li').each(function(a, b) {
                    result = {
                        status: 200,
                        author: 'wudy',
                        judul: $(b).find('> h2 > a').text(),
                        thumbnail: $(b).find('> img').attr('src'),
                        link: $(b).find('> h2 > a').attr('href')
                    };
                    hasil.push(result);
                });
                resolve(hasil)
            }).catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function gore(query) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://seegore.com/?s=' + query).then((dataa) => {
            const $$$ = cheerio.load(dataa)
            pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text()
            rand = Math.floor(Math.random() * pagina) + 1
            if (rand === 1) {
                slink = 'https://seegore.com/?s=' + query
            } else {
                slink = `https://seegore.com/page/${rand}/?s=${query}`
            }
            axios
                .get(slink)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const link = []
                    const judul = []
                    const uploader = []
                    const format = []
                    const thumb = []
                    $('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
                        link.push($(b).attr('href'))
                    })
                    $('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
                        jud = $(d).text()
                        judul.push(jud)
                    })
                    $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
                        upl = $(f).text()
                        uploader.push(upl)
                    })
                    $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
                        thumb.push($(h).attr('src'))
                    })
                    for (let i = 0; i < link.length; i++) {
                        format.push({
                            judul: judul[i],
                            uploader: uploader[i],
                            thumb: thumb[i],
                            link: link[i],
                        })
                    }
                    format != '' ? resolve({
                        creator: 'Fajar Ihsana',
                        status: true,
                        data: format,
                    }) : resolve({
                        creator: 'Fajar Ihsana',
                        status: false
                    })
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
    })
}

function doujindesu(url) {
    return new Promise((resolve, reject) => {
            const hasil = {}
            axios.get(url)
                .then((res) => {
                    const $ = cheerio.load(res.data)
                    hasil.thumb = $('#archive > div > aside > figure > a > img').attr('src')
                    hasil.title = $('#archive > div > section > h1.title').text()
                    hasil.status = $('#archive > div > section > table > tbody > tr:nth-child(1) > td:nth-child(2) > a').text()
                    hasil.type = $('#archive > div > section > table > tbody > tr.magazines > td:nth-child(2) > a').text()
                    hasil.series = $('#archive > div > section > table > tbody > tr.parodies > td:nth-child(2) > a').text()
                    hasil.author = $('#archive > div > section > table > tbody > tr:nth-child(4) > td:nth-child(2) > a').text()
                    hasil.group = $('#archive > div > section > table > tbody > tr:nth-child(5) > td:nth-child(2) > a').text()
                    hasil.rating = $('#archive > div > section > table > tbody > tr:nth-child(6) > td:nth-child(2) > div').text()
                    hasil.upload = $('#archive > div > section > table > tbody > tr.created.createdAt > td:nth-child(2)').text()
                    hasil.synopsis = $('#archive > div > section > div.pb-2 > p:nth-child(1)').text() || 'tidak ada sinopsis karena bukan manhwa!!'
                    hasil.chapter = [];
                })
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    $('#chapter_list > ul > li').each(function(a, b) {
                        result = {
                            title: $(b).find('> div.epsright > span > a').attr('title'),
                            url: 'https://212.32.226.234' + $(b).find('> div.epsright > span > a').attr('href'),
                            dl_url: $(b).find('> div.chright > span > a').attr('href') || 'Eror link mungkin telah di hapus oleh admin webnya'
                        }
                        hasil.chapter.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nhentai(url) {
    return new Promise((resolve, reject) => {
            const hasil = {}
            const duta = [];
            const kok = `${hasil + duta}`
            axios.get(url)
                .then((res) => {
                    const $ = cheerio.load(res.data)
                    hasil.thumb = $('#cover > a > img').attr('src')
                    hasil.info = $('#info').text()
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function kusonimeinfo(url) {
    return new Promise((resolve, reject) => {
            axios.get(url)
                .then((res) => {
                    const $ = cheerio.load(res.data)
                    const hasil = {}
                    hasil.title = $('#venkonten > div.vezone > div.venser > div.post-thumb > h1').text()
                    hasil.info = $('#venkonten > div.vezone > div.venser > div.venutama > div.lexot > div.info').text()
                    hasil.thumb = $('#venkonten > div.vezone > div.venser > div.post-thumb > img').attr('src')
                    hasil.synopsis = $('#venkonten > div.vezone > div.venser > div.venutama > div.lexot > p:nth-child(3)').text()
                    hasil.dl_url_360p = $('#venkonten > div.vezone > div.venser > div.venutama > div.lexot > div.dlbod > div > div:nth-child(2) > a:nth-child(2)').attr('href')
                    hasil.dl_url_480p = $('#venkonten > div.vezone > div.venser > div.venutama > div.lexot > div.dlbod > div > div:nth-child(3) > a:nth-child(2)').attr('href')

                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function porno() {
    return new Promise((resolve, reject) => {
            axios.get('https://tikporntok.com/?random=1')
                .then((res) => {
                    const $ = cheerio.load(res.data)
                    const hasil = {}
                    hasil.title = $('article > h1').text()
                    hasil.source = $('article > div.video-wrapper.vxplayer').attr('data-post') || 'Web Not Response'
                    hasil.thumb = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-poster') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png'
                    hasil.desc = $('article > div.intro').text()
                    hasil.upload = $('article > div.single-pre-meta.ws.clearfix > time').text()
                    hasil.like = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(1) > span').text()
                    hasil.dislike = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(2) > span').text()
                    hasil.favorite = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(3) > span').text()
                    hasil.views = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(4) > span').text()
                    hasil.tags = $('article > div.post-tags').text()
                    hasil.video = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('src') || $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-src') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png'
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function hentai() {
    return new Promise((resolve, reject) => {
            const page = Math.floor(Math.random() * 1153)
            axios.get('https://sfmcompile.club/page/' + page)
                .then((data) => {
                    const $ = cheerio.load(data.data)
                    const hasil = []
                    $('#primary > div > div > ul > li > article').each(function(a, b) {
                        hasil.push({
                            title: $(b).find('header > h2').text(),
                            link: $(b).find('header > h2 > a').attr('href'),
                            category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                            share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                            views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                            type: $(b).find('source').attr('type') || 'image/jpeg',
                            video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                            video_2: $(b).find('video > a').attr('href') || ''
                        })
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function tiktok(url) {
    return new Promise(async (resolve, reject) => {
            axios.get('https://ttdownloader.com/', {
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
                    }
                })
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    let token = $('#token').attr('value')
                    let config = {
                        'url': url,
                        'format': '',
                        'token': token
                    }
                    axios('https://ttdownloader.com/req/', {
                            method: 'POST',
                            data: new URLSearchParams(Object.entries(config)),
                            headers: {
                                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                                "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
                            }
                        })
                        .then(({
                            data
                        }) => {
                            const $ = cheerio.load(data)
                            resolve({
                                nowm: $('div:nth-child(2) > div.download > a').attr('href'),
                                wm: $('div:nth-child(3) > div.download > a').attr('href'),
                                audio: $('div:nth-child(4) > div.download > a').attr('href')
                            })
                        })
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function ttdown(url) {
    try {
        const tokenn = axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const {
            data
        } = axios.request("https://downvideo.quora-wiki.com/system/action.php", {
            method: "post",
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
            },
        });
        return {
            status: 200,
            author: 'wudy',
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

function twitter(url) {
    return new Promise((resolve, reject) => {
            let params = new URLSearchParams()
            params.append('URL', url)
            fetch('https://twdown.net/download.php', {
                    method: 'POST',
                    body: params
                })
                .then(res => res.text())
                .then(res => {
                    const $ = cheerio.load(res);
                    data = []
                    $('div.container').find('tbody > tr > td').each(function(index, element) {
                        x = $(this).find('a').attr('href')
                        if (x !== '#') {
                            if (typeof x !== 'undefined') {
                                data.push({
                                    url: x
                                })
                            }
                        }
                    })
                    if (data.length == 0) return resolve({
                        status: false
                    })
                    resolve({
                        status: true,
                        data
                    })
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function igstory(url) {
    return new Promise(async (resolve, reject) => {
            await axios.request({
                url: "https://igs.sf-converter.com/api/profile/" + url,
                method: "GET",
                headers: {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control": "no-cache",
                    "origin": "https://id.savefrom.net",
                    "pragma": "no-cache",
                    "referer": "https://id.savefrom.net/,",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "Windows",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                }
            }).then(async respon => {
                let position = []
                let data2 = []
                let id = respon.data.result.id
                await axios.get("https://igs.sf-converter.com/api/stories/" + id).then((res) => {
                    Object.values(res.data.result).forEach((i) => {
                        position.push(i)
                    })
                    for (let i of position) {
                        if (i.video_versions !== undefined) {
                            for (let j of i.video_versions) {
                                if (j.height === 1280) {
                                    data2.push(j.url)
                                }
                            }
                        }
                    }
                    let obj = {
                        status: true,
                        author: 'piyo',
                        data: data2
                    }
                    resolve(obj)
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
            }).catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function igdl(url) {
    return new Promise(async (resolve, reject) => {
            axios.request({
                    url: 'https://www.instagramsave.com/download-instagram-videos.php',
                    method: 'GET',
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
                    }
                })
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const token = $('#token').attr('value')
                    let config = {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                            "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        },
                        data: {
                            'url': url,
                            'action': 'post',
                            'token': token
                        }
                    }
                    axios.post('https://www.instagramsave.com/system/action.php', qs.stringify(config.data), {
                            headers: config.headers
                        })
                        .then(({
                            data
                        }) => {
                            resolve(data.medias)
                        })
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function ssweb(url, device = 'desktop') {
    return new Promise((resolve, reject) => {
            const base = 'https://www.screenshotmachine.com'
            const param = {
                url: url,
                device: device,
                full: true,
                cacheLimit: 0
            }
            axios({
                url: base + '/capture.php',
                method: 'POST',
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then((data) => {
                const cookies = data.headers['set-cookie']
                if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                        headers: {
                            'cookie': cookies.join('')
                        },
                        responseType: 'arraybuffer'
                    }).then(({
                        data
                    }) => {
                        result = {
                            status: 200,
                            author: 'wudy',
                            result: data
                        }
                        resolve(result)
                    })
                } else {
                    reject({
                        status: 404,
                        author: 'wudy',
                        message: data.data
                    })
                }
            }).catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function otakudesuongoing() {
    return new Promise((resolve, reject) => {
            axios.get(`https://otakudesu.bid`).then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#venkonten > div > div.venser > div.venutama > div > div.rapi > div > ul > li').each(function(a, b) {
                    result = {
                        status: 200,
                        author: 'wudy',
                        judul: $(b).find('> div > div.thumb > a > div > h2').text().trim(),
                        episode: $(b).find('> div > div.epz').text().trim(),
                        tanggal: $(b).find('> div > div.newnime').text().trim(),
                        hari: $(b).find('> div > div.epztipe').text().trim(),
                        thumbnail: $(b).find('> div > div.thumb > a > div > img').attr('src'),
                        link: $(b).find('> div > div.thumb > a').attr('href')
                    };
                    hasil.push(result);
                });
                resolve(hasil)
            }).catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function komikindosearch(query) {
    return new Promise((resolve, reject) => {
            axios.get(`https://komikindo.id/?s=${query}`)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const hasil = [];
                    $('#content > div.postbody > section > div.film-list > div').each(function(a, b) {
                        let dati = {
                            thumb: $(b).find('> div > a > div > img ').attr('src'),
                            title: $(b).find('> div > div > a').attr('title'),
                            url: $(b).find('> div > div > a').attr('href')
                        }
                        hasil.push(dati)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function nekopoi(url) {
    return new Promise((resolve, reject) => {
            const hasil = {}
            axios.get(url)
                .then((res) => {
                    const $ = cheerio.load(res.data)
                    hasil.thumb = $('#content > div.animeinfos > div.imgdesc > img').attr('src')
                    hasil.synopsis = $('#content > div.animeinfos > div.imgdesc > span > p').text()
                    hasil.visitor_count = $('#content > div.animeinfos > div.tabulasi > div:nth-child(3)').text()
                    hasil.judul_jp = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(1)').text()
                    hasil.type = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(2)').text()
                    hasil.jmlh_epsd = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(3)').text()
                    hasil.status = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(4)').text()
                    hasil.publish = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(5)').text()
                    hasil.judul = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(6)').text()
                    hasil.genre = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(7)').text()
                    hasil.duration = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(8)').text()
                    hasil.rating = $('#content > div.animeinfos > div.listinfo > ul > li:nth-child(9)').text()
                    hasil.episode_url = [];
                })
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    $('#content > div.animeinfos > div.episodelist > ul > li').each(function(a, b) {
                        result = {
                            title: $(b).find('> span.leftoff > a').text(),
                            epsd_url: $(b).find('> span.leftoff > a').attr('href')
                        }
                        hasil.episode_url.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function otakudesuinfo(url) {
    return new Promise((resolve, reject) => {
            const hasil = {}
            axios.get(url)
                .then((res) => {
                    const $ = cheerio.load(res.data)
                    hasil.judul = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().split(': ')[1]
                    hasil.japanese = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().split(': ')[1]
                    hasil.rating = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().split(': ')[1]
                    hasil.produser = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().split(': ')[1]
                    hasil.tipe = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().split(': ')[1]
                    hasil.anime_status = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().split(': ')[1]
                    hasil.total_episode = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().split(': ')[1]
                    hasil.durasi = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().split(': ')[1]
                    hasil.rilis = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().split(': ')[1]
                    hasil.studio = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().split(': ')[1]
                    hasil.genre = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11)').text().split(': ')[1]
                    hasil.thumbnail = $('#venkonten > div.venser > div.fotoanime > img').attr('src'),
                        hasil.sinopsis = $('#venkonten > div.venser > div.fotoanime > div.sinopc').text().trim()
                    hasil.epsd_url = [];
                })
            axios.get(url)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    $('#venkonten > div.venser > div:nth-child(8) > ul > li').each(function(a, b) {
                        result = {
                            title: $(b).find('> span:nth-child(1) > a').text(),
                            epsd_url: $(b).find('> span:nth-child(1) > a').attr('href')
                        }
                        hasil.epsd_url.push(result)
                    })
                    resolve(hasil)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function ssweb2(url, device = 'mobile') {
    return new Promise((resolve, reject) => {
            const base = 'https://www.screenshotmachine.com'
            const param = {
                url: url,
                device: device,
                full: true,
                cacheLimit: 0
            }
            axios({
                url: base + '/capture.php',
                method: 'POST',
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then((data) => {
                const cookies = data.headers['set-cookie']
                if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                        headers: {
                            'cookie': cookies.join('')
                        },
                        responseType: 'arraybuffer'
                    }).then(({
                        data
                    }) => {
                        result = {
                            status: 200,
                            author: 'wudy',
                            result: data
                        }
                        resolve(result)
                    })
                } else {
                    reject({
                        status: 404,
                        author: 'wudy',
                        message: data.data
                    })
                }
            }).catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function textpro(url, text) {
    return new Promise(async (resolve, reject) => {
        if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url)) throw new Error("Url Salah!")
        axios({
            url: url,
            method: 'get',
            headers: {
                'cookie': '_ga=GA1.2.973149439.1655802326; __gads=ID=48c7bf36c499a70a-2250dc73a4d300d3:T=1655802326:RT=1655802326:S=ALNI_MZutfiaIw3EmxBoKDfSTxZMydnKrA; PHPSESSID=24eg6g44qnh7f34evgskg1ehf1; cookieconsent_status=dismiss; _gid=GA1.2.1310090408.1656776919; __gpi=UID=0000067655c41509:T=1655802326:RT=1656832156:S=ALNI_MYb5ILRvXyZT7o_Ts9jfr_e86-_8w; _gat_gtag_UA_114571019_5=1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
            }
        }).then(da => {
            const $ = cheerio.load(da.data)
            const form = new FormData()
            form.append('text[]', text)
            form.append('submit', 'Go')
            form.append('token', $('#token').val())
            form.append('build_server', $('#build_server').val())
            form.append('build_server_id', $('#build_server_id').val())
            axios({
                url: url,
                method: 'POST',
                data: form,
                headers: {
                    'cookie': '_ga=GA1.2.973149439.1655802326; __gads=ID=48c7bf36c499a70a-2250dc73a4d300d3:T=1655802326:RT=1655802326:S=ALNI_MZutfiaIw3EmxBoKDfSTxZMydnKrA; PHPSESSID=24eg6g44qnh7f34evgskg1ehf1; cookieconsent_status=dismiss; _gid=GA1.2.1310090408.1656776919; __gpi=UID=0000067655c41509:T=1655802326:RT=1656832156:S=ALNI_MYb5ILRvXyZT7o_Ts9jfr_e86-_8w; _gat_gtag_UA_114571019_5=1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
                }
            }).then(da => {
                const $ = cheerio.load(da.data)
                const gdata = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(da.data)
                axios({
                    url: 'https://textpro.me/effect/create-image',
                    method: 'POST',
                    data: new URLSearchParams(JSON.parse(gdata[1].replace(/\[/g, '').replace(/\]/g, '').replace(/text/g, 'text[]').replace(/text\[\]pro\.me/g, 'textpro.me'))),
                    headers: {
                        'cookie': '_ga=GA1.2.973149439.1655802326; __gads=ID=48c7bf36c499a70a-2250dc73a4d300d3:T=1655802326:RT=1655802326:S=ALNI_MZutfiaIw3EmxBoKDfSTxZMydnKrA; PHPSESSID=24eg6g44qnh7f34evgskg1ehf1; cookieconsent_status=dismiss; _gid=GA1.2.1310090408.1656776919; __gpi=UID=0000067655c41509:T=1655802326:RT=1656832156:S=ALNI_MYb5ILRvXyZT7o_Ts9jfr_e86-_8w; _gat_gtag_UA_114571019_5=1',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
                    }
                }).then(a => {
                    const result = {
                        status: 200,
                        author: 'wudy',
                        result: 'https://textpro.me' + a.data.image
                    }
                    resolve(result)
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
            }).catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
        })
    })
}

function pin(url) {
    return new Promise((resolve, reject) => {
            function rand() {
                return `${Math.floor(Math.random() * 1000000)}`
            }
            let params = new URLSearchParams()
            params.append('url', url)
            fetch('https://www.expertsphp.com/facebook-video-downloader.php', {
                    method: 'POST',
                    body: params
                })
                .then(res => res.text())
                .then(res => {
                    const $ = cheerio.load(res)
                    y = 'pinterest_' + rand() + '.mp4'
                    x = $('video').find('source').attr('src')
                    data = {
                        file: y,
                        url: x
                    }
                    if (typeof x == 'undefined') return resolve({
                        status: false
                    })
                    resolve({
                        status: true,
                        data
                    })
                }).catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

let is = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }
}

function _token(host) {
    return new Promise(async (resolve, reject) => {
            axios.request({
                    url: host,
                    method: 'GET',
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
                    }
                }).then(({
                    data
                }) => {
                    let $ = cheerio.load(data)
                    let token = $('#token').attr('value')
                    resolve(token)
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

function facebook(url) {
    return new Promise(async (resolve, reject) => {
            let host = 'https://aiovideodl.ml/'
            let form = {
                data: {
                    'url': url,
                    'token': (await _token(host))
                }
            }
            axios.post(host + '/system/action.php', qs.stringify(form.data), {
                    headers: is.headers
                })
                .then(({
                    data
                }) => {
                    if (data.links.lenght == 0) return resolve({
                        creator: 'wudy',
                        status: false
                    })
                    resolve({
                        creator: 'wudy',
                        status: true,
                        data: data.links
                    })
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error)
                })
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error)
        })
}

export {
    facebook,
    nkpepsddl,
    komikindogetch,
    komikindosearch,
    otakudesugetepsddl,
    dojindsgetimg,
    nhgetimg,
    nhentai,
    nhentaisearch,
    kusonimelatest,
    kusonimeinfo,
    otakudesuongoing,
    otakudesuinfo,
    sektekomiksearch,
    nekopoisearch,
    nekopoi,
    nekopoilatest,
    porno,
    doujindesuch,
    doujindesu,
    doujindesusearch,
    mangatoons,
    webtoons,
    ssweb,
    ssweb2,
    otakudesu,
    gore,
    hentai,
    quotes,
    doujindesulatest,
    quotesAnime,
    igdl,
    textpro,
    igstory,
    tiktok,
    ttdown,
    twitter,
    joox,
    pin
}

async function getHentaiList() {
    try {
        const page = Math.floor(Math.random() * 1153)
        const response = await fetch(`https://sfmcompile.club/page/${page}`)
        const htmlText = await response.text()
        const $ = cheerio.load(htmlText)

        const hasil = []
        $('#primary > div > div > ul > li > article').each(function(a, b) {
            hasil.push({
                title: $(b).find('header > h2').text(),
                link: $(b).find('header > h2 > a').attr('href'),
                category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                type: $(b).find('source').attr('type') || 'image/jpeg',
                video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                video_2: $(b).find('video > a').attr('href') || ''
            })
        })

        return hasil
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchGit(text) {
    try {
        if (!text) throw `Contoh:\n/github stikerinbot`;
        let res = await fetch('https://api.github.com/search/repositories?q=' + text);
        if (!res.ok) throw 'Error fetching data from GitHub';
        let json = await res.json();
        let str = json.items.map((repo, index) => `
>      「 ${1 + index} 」       <
ɴᴀᴍᴇ ʀᴇᴘᴏ : ${repo.name}
ʙʏ : ${repo.owner.login}
ғᴏʀᴋᴇᴅ : ${repo.fork ? 'True' : 'False'}
ᴘʀɪᴠᴀᴛᴇ : ${repo.private ? 'True': 'False'}

➔ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ : ${formatDate(repo.created_at)}
➔ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇ ᴏɴ :${formatDate(repo.updated_at)}
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
❗ ɪssᴜᴇ : ${repo.open_issues} ${repo.description ? `
📚 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:
${repo.description}` : ''}

⑂ ᴄʟᴏɴᴇ :
$ git clone ${repo.clone_url}
`.trim()).join('\n— — — — — — — — — — — — — —\n');

        return `*ɢɪᴛʜᴜʙ sᴇᴀʀᴄʜ*\n` + str
    } catch (error) {
        console.error('Error:', error);
    }
};

export {
    searchGit,
    getHentaiList
};

function XPanas(search = 'indonesia') {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('http://164.68.127.15/?id=' + search)
            const $ = cheerio.load(data)
            const ajg = []
            $('#content > .mozaique.thumbs-5 > center > .thumb-block > .thumb-inside > .thumb > a').each((i, u) => {
                ajg.push({
                    nonton: 'https://164.68.127.15' + $(u).attr('href'),
                    img: $(u).find('img').attr('data-src'),
                    title: $(u).find('img').attr('title')
                })
            })
            if (ajg.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(ajg)
        } catch (err) {
            console.error(err)
        }
    })
}

function WikiMedia(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get(`https://commons.wikimedia.org/w/index.php?search=${search}&title=Special:MediaSearch&go=Go&type=image`)
            const $ = cheerio.load(data)
            const hasil = []
            $('.sdms-search-results__list-wrapper > div > a').each(function(a, b) {
                hasil.push({
                    title: $(b).find('img').attr('alt'),
                    source: $(b).attr('href'),
                    image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
                })
            })
            if (hasil.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function SoundCloudeS(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data,
                status
            } = await axios.get(`https://soundcloud.com/search?q=${search}`)
            const $ = cheerio.load(data)
            const ajg = []
            $('#app > noscript').each((u, i) => {
                ajg.push($(i).html())
            })
            const _$ = cheerio.load(ajg[1])
            const hasil = []
            _$('ul > li > h2 > a').each((i, u) => {
                if ($(u).attr('href').split('/').length === 3) {
                    const linkk = $(u).attr('href')
                    const judul = $(u).text()
                    const link = linkk ? linkk : 'Tidak ditemukan'
                    const jdi = `https://soundcloud.com${link}`
                    const jadu = judul ? judul : 'Tidak ada judul'
                    hasil.push({
                        link: jdi,
                        judul: jadu
                    })
                }
            })
            if (hasil.every(x => x === undefined)) return {
                developer: '@xorizn',
                mess: 'no result found'
            }
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function RingTone(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://meloboom.com/en/search/' + search)
            let $ = cheerio.load(data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function(a, b) {
                hasil.push({
                    title: $(b).find('h4').text(),
                    source: 'https://meloboom.com/' + $(b).find('a').attr('href'),
                    audio: $(b).find('audio').attr('src')
                })
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function PlayStore(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data,
                status
            } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`)
            const hasil = []
            const $ = cheerio.load(data)
            $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
                const linkk = $(u).attr('href')
                const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text()
                const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text()
                const img = $(u).find('.j2FCNc > img').attr('src')
                const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label')
                const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text()
                const link = `https://play.google.com${linkk}`

                hasil.push({
                    link: link,
                    nama: nama ? nama : 'No name',
                    developer: developer ? developer : 'No Developer',
                    img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
                    rate: rate ? rate : 'No Rate',
                    rate2: rate2 ? rate2 : 'No Rate',
                    link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
                })
            })
            if (hasil.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function TixID() {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.tix.id/tix-now/')
            const $ = cheerio.load(data)
            const hasil = []
            $('div.gt-blog-list > .gt-item').each((i, u) => {
                hasil.push({
                    link: $(u).find('.gt-image > a').attr('href'),
                    image: $(u).find('.gt-image > a > img').attr('data-src'),
                    judul: $(u).find('.gt-title > a').text(),
                    tanggal: $(u).find('.gt-details > ul > .gt-date > span').text(),
                    deskripsi: $(u).find('.gt-excerpt > p').text(),
                })
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function BukaLapak(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
                headers: {
                    "user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0'
                }
            })
            const $ = cheerio.load(data);
            const dat = [];
            const b = $('a.slide > img').attr('src');
            $('div.bl-flex-item.mb-8').each((i, u) => {
                const a = $(u).find('observer-tracker > div > div');
                const img = $(a).find('div > a > img').attr('src');
                if (typeof img === 'undefined') return

                const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href');
                const title = $(a).find('.bl-product-card__description-name > p > a').text().trim();
                const harga = $(a).find('div.bl-product-card__description-price > p').text().trim();
                const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim();
                const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim();

                const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim();
                const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim();
                const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href');

                const res_ = {
                    title: title,
                    rating: rating ? rating : 'No rating yet',
                    terjual: terjual ? terjual : 'Not yet bought',
                    harga: harga,
                    image: img,
                    link: link,
                    store: {
                        lokasi: dari,
                        nama: seller,
                        link: link_sel
                    }
                };

                dat.push(res_);
            })
            if (dat.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(dat)
        } catch (err) {
            console.error(err)
        }
    })
}

function AcaraNow() {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini');
            const $ = cheerio.load(data)
            let tv = []
            $('table.table.table-bordered > tbody > tr').each((u, i) => {
                let an = $(i).text().split('WIB')
                if (an[0] === 'JamAcara') return
                if (typeof an[1] === 'undefined') return tv.push('\n' + '*' + an[0] + '*')
                tv.push(`${an[0]} - ${an[1]}`)
            })
            if (tv.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(tv)
        } catch (err) {
            console.error(err)
        }
    })
}

function Jadwal_Sepakbola() {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.jadwaltv.net/jadwal-sepakbola');
            const $ = cheerio.load(data)
            let tv = []
            $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
                let an = $(i).html().replace(/<td>/g, '').replace(/<\/td>/g, ' - ')
                tv.push(`${an.substring(0, an.length - 3)}`)
            })
            if (tv.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(tv)
        } catch (err) {
            console.error(err)
        }
    })
}

function JadwalTV(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.jadwaltv.net/channel/' + query);
            const $ = cheerio.load(data);
            const tv = []
            $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
                let an = $(i).text().split('WIB')
                tv.push(`${an[0]} - ${an[1]}`)
            })
            if (tv.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(tv.join('\n'))
        } catch (err) {
            console.error(err)
        }
    })
}

function Steam(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data,
                status
            } = await axios.get('https://store.steampowered.com/search/?term=' + search)
            const $ = cheerio.load(data)
            const hasil = []
            $('#search_resultsRows > a').each((a, b) => {
                const link = $(b).attr('href')
                const judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text()
                const harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow `).text().replace(/ /g, '').replace(/\n/g, '')
                var rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html')
                const img = $(b).find(`div.col.search_capsule > img`).attr('src')
                const rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text()

                if (typeof rating === 'undefined') {
                    var rating = 'no ratings'
                }
                if (rating.split('<br>')) {
                    let hhh = rating.split('<br>')
                    var rating = `${hhh[0]} ${hhh[1]}`
                }
                hasil.push({
                    judul: judul,
                    img: img,
                    link: link,
                    rilis: rilis,
                    harga: harga ? harga : 'no price',
                    rating: rating
                })
            })
            if (hasil.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function Steam_Detail(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data,
                status
            } = await axios.get(url)
            const $ = cheerio.load(data)
            const xorizn = []
            const img = $('#gameHeaderImageCtn > img').attr('src')
            $('div.game_area_sys_req.sysreq_content.active > div > ul > ul > li').each((u, i) => {
                xorizn.push($(i).text())
            })
            const hasil = $('#genresAndManufacturer').html().replace(/\n/g, '').replace(/<br>/g, '\n').replace(/\t/g, '').replace(/<b>/g, '').replace(/<\/div>/g, '\n').replace(/ /g, '').replace(/<\/b>/g, ' ').replace(/<[^>]*>/g, '')
            const desc = $('div.game_description_snippet').text().replace(/\t/g, '').replace(/\n/g, '')
            const hasill = {
                desc: desc ? desc : 'Error',
                img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
                system: xorizn.join('\n') ? xorizn.join('\n') : 'Error',
                info: hasil
            }
            resolve(hasill)
        } catch (err) {
            console.error(err)
        }
    })
}

function WattPad(judul) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.wattpad.com/search/' + judul, {
                    headers: {
                        cookie: 'wp_id=d92aecaa-7822-4f56-b189-f8c4cc32825c; sn__time=j%3Anull; fs__exp=1; adMetrics=0; _pbkvid05_=0; _pbeb_=0; _nrta50_=0; lang=20; locale=id_ID; ff=1; dpr=1; tz=-8; te_session_id=1681636962513; _ga_FNDTZ0MZDQ=GS1.1.1681636962.1.1.1681637905.0.0.0; _ga=GA1.1.1642362362.1681636963; signupFrom=search; g_state={"i_p":1681644176441,"i_l":1}; RT=r=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fanime&ul=1681637915624',
                        'suer-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0'
                    }
                }),
                $ = cheerio.load(data),
                limk = 'https://www.wattpad.com',
                _data = [];
            $('.story-card-container > ul.list-group.new-list-group > li.list-group-item').each(function(i, u) {
                let link = limk + $(u).find('a').attr('href')
                let judul = $(u).find('a > div > div.story-info > div.title').text().trim()
                let img = $(u).find('a > div > div.cover > img').attr('src')
                let desc = $(u).find('a > div > div.story-info > .description').text().replace(/\s+/g, ' ')
                let _doto = []
                $(u).find('a > div > div.story-info > .new-story-stats > .stats-item').each((u, i) => {
                    _doto.push($(i).find('.icon-container > .tool-tip > .sr-only').text())
                })
                _data.push({
                    title: judul,
                    thumb: img,
                    desc: desc,
                    reads: _doto[0],
                    vote: _doto[1],
                    chapter: _doto[2],
                    link: link,
                })
            })

            resolve(_data)
        } catch (err) {
            console.error(err)
        }
    })
}

function LinkWa(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + query + '&searchby=name')
            const $ = cheerio.load(data),
                _title = [],
                _link = [],
                result = [];
            $('.wa-chat-title > .wa-chat-title-text').each((u, i) => {
                $('span[style="display:none;"]').remove();
                _title.push($(i).html().replace(/<\/?[^>]+(>|$)/g, ''))
            })
            $('.wa-chat-message > a').each((u, i) => {
                _link.push($(i).text().trim())
            })
            for (let i = 0; i < _link.length; i++) {
                result.push({
                    title: _title[i],
                    link: _link[i]
                })
            }
            resolve(result)
        } catch (err) {
            console.error(err)
        }
    })
}

function Lirik2(judul) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.musixmatch.com/search/' + judul),
                $ = cheerio.load(data),
                hasil = {},
                limk = 'https://www.musixmatch.com',
                link = limk + $('div.media-card-body > div > h2').find('a').attr('href');
            await axios.get(link).then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
                $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a, b) {
                    hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text()
                })
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}

function KBBI(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://kbbi.kemdikbud.go.id/entri/' + query);
            const $ = cheerio.load(data);
            let _kata = []
            let _arti = []
            let _ol = []
            $('h2[style="margin-bottom:3px"]').each((i, u) => {
                _kata.push($(u).text().trim())
            })
            $('div.container.body-content').find('li').each((i, u) => {
                let hasil = $(u).html().replace(/<[^>]+>/g, ' ').replace(/ {2,}/g, ' ').trim()
                _arti.push(hasil)
            })
            $('ol > li').each(function(i, u) {
                _ol.push($(u).html().replace(/<[^>]+>/g, ' ').replace(/ {2,}/g, ' ').trim())
            })
            _arti.splice(_arti.length - 3, 3);
            if (!(_ol.length === 0)) {
                resolve({
                    lema: _kata[0],
                    arti: _ol
                })
            } else {
                resolve({
                    lema: _kata[0],
                    arti: _arti
                })
            }
        } catch (err) {
            console.error(err)
        }
    })
}

function Nomina(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://tesaurus.kemdikbud.go.id/tematis/lema/' + query + '/nomina');
            const $ = cheerio.load(data);
            let _arti = []
            $('.search-result-area > .result-par > .contain > .result-set').each((i, u) => {
                _arti.push($(u).text().trim())
            })
            resolve({
                lema: query,
                nomina: _arti,
                length: _arti.length
            })
        } catch (err) {
            console.error(err)
        }
    })
}

function KodePos(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://nomorkodepos.com/?s=' + query);
            const $ = cheerio.load(data);
            let _data = []

            $('table.pure-table.pure-table-horizontal > tbody > tr').each((i, u) => {
                let _doto = [];
                $(u).find('td').each((l, p) => {
                    _doto.push($(p).text().trim())
                })
                _data.push({
                    province: _doto[0],
                    city: _doto[1],
                    subdistrict: _doto[2],
                    village: _doto[3],
                    postalcode: _doto[4]
                })
            })
            resolve(_data)
        } catch (err) {
            console.error(err)
        }
    })
}

function ListHero() {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://mobile-legends.fandom.com/wiki/List_of_heroes');
            const $ = cheerio.load(data);
            let _data = []

            $('table.wikitable.sortable > tbody > tr').each((i, u) => {
                let hero_icon = $(u).find('td:nth-child(1) > center > a > img').attr('data-src')
                if (typeof hero_icon === 'undefined') return
                let name = $(u).find('td:nth-child(2)').text().trim()
                let hero_code = $(u).find('td:nth-child(3)').text().trim()
                let role = $(u).find('td:nth-child(4)').text().trim()
                let specialties = $(u).find('td:nth-child(5)').text().trim()
                let laning = $(u).find('td:nth-child(6)').text().trim()
                let release = $(u).find('td:nth-child(7)').text().trim()
                let price = $(u).find('td:nth-child(8)').text().trim()
                _data.push({
                    hero_icon: hero_icon,
                    name: name,
                    hero_code: hero_code,
                    role: role,
                    specialties: specialties,
                    laning: laning,
                    release: release,
                    price: price,
                })
            })
            resolve(_data)
        } catch (err) {
            console.error(err)
        }
    })
}

function Hero(querry) {
    return new Promise(async (resolve, reject) => {
        try {
            let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase()
            const {
                data,
                status
            } = await axios.get('https://mobile-legends.fandom.com/wiki/' + upper);
            if (status === 200) {
                const $ = cheerio.load(data);
                let atributes = []
                let rill = []
                let rull = []
                let rell = []
                let hero_img = $('figure.pi-item.pi-image > a > img').attr('src')
                let desc = $('div.mw-parser-output > p:nth-child(6)').text()
                $('.mw-parser-output > table:nth-child(9) > tbody > tr').each((u, i) => {
                    let _doto = []
                    $(i).find('td').each((o, p) => {
                        _doto.push($(p).text().trim())
                    })
                    if (_doto.length === 0) return
                    atributes.push({
                        attribute: _doto[0],
                        level_1: _doto[1],
                        level_15: _doto[2],
                        growth: _doto.pop()
                    })
                })
                $('div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font').each((i, u) => {
                    rill.push($(u).text().trim())
                })
                $('aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default').each((i, u) => {
                    rull.push($(u).html())
                })
                const _$ = cheerio.load(rull[1])
                _$('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((l, m) => {
                    rell.push(_$(m).text().trim().replace(/\n/g, ':').replace(/\t/g, ''))
                })
                const result = rell.reduce((acc, curr) => {
                    const [key, value] = curr.split('::');
                    acc[key] = value;
                    return acc;
                }, {});
                let anu = {
                    hero_img: hero_img,
                    desc: desc,
                    release: rill[0],
                    role: rill[1],
                    specialty: rill[2],
                    lane: rill[3],
                    price: rill[4],
                    gameplay_info: {
                        durability: rill[5],
                        offense: rill[6],
                        control_effect: rill[7],
                        difficulty: rill[8],
                    },
                    story_info_list: result,
                    story_info_array: rell,
                    attributes: atributes
                }
                resolve(anu)
            } else if (status === 400) {
                resolve({
                    mess: 'hh'
                })
            }
            console.log(status)
        } catch (err) {
            resolve({
                mess: 'asu'
            })
        }
    })
}

export {
    XPanas,
    WikiMedia,
    SoundCloudeS,
    RingTone,
    PlayStore,
    BukaLapak,
    TixID,
    AcaraNow,
    Jadwal_Sepakbola,
    JadwalTV,
    Steam,
    Steam_Detail,
    WattPad,
    LinkWa,
    Lirik2,
    KBBI,
    Nomina,
    KodePos,
    ListHero,
    Hero
}

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
}