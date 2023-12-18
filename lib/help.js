import fs from 'fs';
import moment from 'moment-timezone';

const config = JSON.parse(fs.readFileSync('./config.json'));
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss');
const date = new Date().toLocaleDateString();
const wita = moment.tz('Asia/Makassar').format('HH:mm:ss');
const wit = moment.tz('Asia/Jayapura').format('HH:mm:ss');

const shape = '️꧉';
const d = new Date();
const locale = 'id';
const gmt = new Date(0).getTime() - new Date('1 January 2021').getTime();
const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5];
const hari = d.toLocaleDateString(locale, {
    weekday: 'long'
});
const datee = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
const ini_hari = `${hari} ${weton}, ${datee}`;

let text
let prefix
let options
async function start(lol, name) {
    text = `Date: ${ini_hari}\nTime: ${time}\n\nHello ${name}! Im a multifunction bot build with ❤️ by  [my master](${config.ownerLink})\n\n type /help to display Menu!.`
    await lol.replyWithMarkdown(text, {
        disable_web_page_preview: true
    })
}

async function help(lol, name, user_id) {
    prefix = config.prefix
    text = `Date: ${ini_hari}\nTime: ${time}\n\nHello ${name}! Here are the available commands you can use:\n\nIf you encounter a problem with the bot, please report it to the owner of the bot by typing ${prefix}report\n\n Semoga Hari Mu Menyenangkan`
    options = {
        reply_markup: {
            inline_keyboard: [

                [{
                        text: 'GPT 🤖',
                        callback_data: 'menuGpt-' + user_id
                    },
                    {
                        text: 'AI 🤖',
                        callback_data: 'menuAi-' + user_id
                    }
                ],
                [{
                        text: 'Download 📥',
                        callback_data: 'menuDown-' + user_id
                    },
                    {
                        text: 'Random 🎲',
                        callback_data: 'menuRand-' + user_id
                    }
                ],
                [{
                        text: 'Info ℹ️',
                        callback_data: 'menuInfo-' + user_id
                    },
                    {
                        text: 'Search 🔎',
                        callback_data: 'menuSearch-' + user_id
                    }
                ],
                [{
                        text: 'Upload 📤',
                        callback_data: 'menuUp-' + user_id
                    },
                    {
                        text: 'Owner',
                        callback_data: 'menuOwn-' + user_id
                    }
                ],
                [
                {
                        text: 'Eval 📊',
                        callback_data: 'menuEval-' + user_id
                    }
                ]

            ]
        }
    }
    try {
        await lol.editMessageText(text, options)
    } catch {
        await lol.reply(text, options)
    }
}

async function menuGpt(lol, user_id) {
    prefix = config.prefix
    text = `GPT Menu :

${shape} ${prefix}aichatonline
${shape} ${prefix}aidutu
${shape} ${prefix}binjie
${shape} ${prefix}c3a0chat
${shape} ${prefix}cgptonline
${shape} ${prefix}chatbotji1z
${shape} ${prefix}chatg
${shape} ${prefix}chatgbt
${shape} ${prefix}chatgbtaudio
${shape} ${prefix}chatgptai
${shape} ${prefix}chatgptbestim
${shape} ${prefix}chatgptdemo
${shape} ${prefix}chatgptt
${shape} ${prefix}chatgpttaudio
${shape} ${prefix}cveoy
${shape} ${prefix}docsbot
${shape} ${prefix}geekgpt
${shape} ${prefix}gptchatly
${shape} ${prefix}gptdemostream
${shape} ${prefix}gptgo
${shape} ${prefix}gptphotos
${shape} ${prefix}gptpictures
${shape} ${prefix}gptzw7
${shape} ${prefix}hfgpt2
${shape} ${prefix}lemurchat
${shape} ${prefix}lovebaby
${shape} ${prefix}onlinegpt
${shape} ${prefix}openaiapi2d
${shape} ${prefix}openaiazure
${shape} ${prefix}reveseryai
${shape} ${prefix}shanti
${shape} ${prefix}vocai
${shape} ${prefix}wewordle
${shape} ${prefix}yanzgpt3
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuAi(lol, user_id) {
    prefix = config.prefix
    text = `AI Menu :

${shape} ${prefix}chatgptbing
${shape} ${prefix}bingimagecreator
${shape} ${prefix}aichat
${shape} ${prefix}acytoo
${shape} ${prefix}aivvm
${shape} ${prefix}cohereapi
${shape} ${prefix}bardie
${shape} ${prefix}botika
${shape} ${prefix}chatbase
${shape} ${prefix}hercai
${shape} ${prefix}liaobots
${shape} ${prefix}blackboxchat
${shape} ${prefix}blackboximg
${shape} ${prefix}lbbai
${shape} ${prefix}maritalk
${shape} ${prefix}talkai
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuEval(lol, user_id) {
    prefix = config.prefix
    text = `Eval Menu :

${shape} ${prefix}eval
${shape} ${prefix}exec
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuDown(lol, user_id) {
    prefix = config.prefix
    text = `Download Menu :

${shape} ${prefix}igdown
${shape} ${prefix}pinterestvideodownloader
${shape} ${prefix}mediafires
${shape} ${prefix}facebook
${shape} ${prefix}downloader4twitter
${shape} ${prefix}stickertelegram
${shape} ${prefix}stickertelegramdownload
${shape} ${prefix}aio
${shape} ${prefix}spotifydown
${shape} ${prefix}spotifysearch
${shape} ${prefix}ttdown
${shape} ${prefix}ttdown2
${shape} ${prefix}xnxxsearch
${shape} ${prefix}xnxxdownloader
${shape} ${prefix}fbdown
${shape} ${prefix}shortener
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuRand(lol, user_id) {
    prefix = config.prefix
    text = `Random Menu :

${shape} ${prefix}enhanceimg
${shape} ${prefix}cekresi
${shape} ${prefix}tiktoktts
${shape} ${prefix}ttsmodel
${shape} ${prefix}anime
${shape} ${prefix}truthordare
${shape} ${prefix}getcerpen
${shape} ${prefix}getcerpenhorror
${shape} ${prefix}findsongs
${shape} ${prefix}igstalk
${shape} ${prefix}similarband
${shape} ${prefix}otakudesusearch
${shape} ${prefix}filmapiks
${shape} ${prefix}filmapikdl
${shape} ${prefix}randomcerpen
${shape} ${prefix}translate
${shape} ${prefix}langlist
${shape} ${prefix}searchdongeng
${shape} ${prefix}readdongeng
${shape} ${prefix}carbon
${shape} ${prefix}coffee
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuInfo(lol, user_id) {
    prefix = config.prefix
    text = `Info Menu :

${shape} ${prefix}cuaca
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuSearch(lol, user_id) {
    prefix = config.prefix
    text = `Search Menu :

${shape} ${prefix}dojindsgetimg
${shape} ${prefix}doujindesu
${shape} ${prefix}doujindesuch
${shape} ${prefix}doujindesulatest
${shape} ${prefix}doujindesusearch
${shape} ${prefix}gore
${shape} ${prefix}hentai
${shape} ${prefix}igdl
${shape} ${prefix}igstory
${shape} ${prefix}joox
${shape} ${prefix}komikindogetch
${shape} ${prefix}komikindosearch
${shape} ${prefix}kusonimeinfo
${shape} ${prefix}kusonimelatest
${shape} ${prefix}mangatoons
${shape} ${prefix}nekopoi
${shape} ${prefix}nekopoilatest
${shape} ${prefix}nekopoisearch
${shape} ${prefix}nhentai
${shape} ${prefix}nhentaisearch
${shape} ${prefix}nhgetimg
${shape} ${prefix}nkpepsddl
${shape} ${prefix}otakudesu
${shape} ${prefix}otakudesugetepsddl
${shape} ${prefix}otakudesuinfo
${shape} ${prefix}otakudesuongoing
${shape} ${prefix}pin
${shape} ${prefix}porno
${shape} ${prefix}quotes
${shape} ${prefix}quotesanime
${shape} ${prefix}sektekomiksearch
${shape} ${prefix}ssweb
${shape} ${prefix}ssweb2
${shape} ${prefix}textpro
${shape} ${prefix}tiktok
${shape} ${prefix}ttdown
${shape} ${prefix}twitter
${shape} ${prefix}webtoons
${shape} ${prefix}facebook
${shape} ${prefix}searchgit
${shape} ${prefix}gethentailist
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuUp(lol, user_id) {
    prefix = config.prefix
    text = `Upload Menu :

${shape} ${prefix}catbox
${shape} ${prefix}fexnet
${shape} ${prefix}fileio
${shape} ${prefix}gofile
${shape} ${prefix}hostfile
${shape} ${prefix}nullbyte
${shape} ${prefix}pixeldrain
${shape} ${prefix}tmpfiles
${shape} ${prefix}top4top
${shape} ${prefix}transfersh
${shape} ${prefix}ucarecdn
${shape} ${prefix}uploadpomf2
${shape} ${prefix}uploadtodiscdn
${shape} ${prefix}uploadtokraken
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function menuOwn(lol, user_id) {
    prefix = config.prefix
    text = `Owner Menu :

${shape} ${prefix}report
${shape} ${prefix}adduser
${shape} ${prefix}ban
${shape} ${prefix}cek
${shape} ${prefix}chatscount
${shape} ${prefix}daftar
${shape} ${prefix}delpict
${shape} ${prefix}emote
${shape} ${prefix}gcdesk
${shape} ${prefix}gcpict
${shape} ${prefix}gctitle
${shape} ${prefix}getid
${shape} ${prefix}inf
${shape} ${prefix}infochat
${shape} ${prefix}leave
${shape} ${prefix}mypict
${shape} ${prefix}owner
${shape} ${prefix}resetban
${shape} ${prefix}resetuser
${shape} ${prefix}status
${shape} ${prefix}tagme
${shape} ${prefix}testt
${shape} ${prefix}unban
${shape} ${prefix}$
${shape} ${prefix}>
${shape} ${prefix}return
${shape} ${prefix}unreg
${shape} ${prefix}test
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Back',
                    callback_data: 'help-' + user_id
                }]
            ]
        }
    })
}

async function messageError(lol) {
    await lol.reply(`Error! Please report to the [${config.owner}](${config.ownerLink}) about this`, {
        parse_mode: "Markdown",
        disable_web_page_preview: true
    })
}

export default {
    start,
    help,
    menuGpt,
    menuEval,
    menuDown,
    menuRand,
    menuInfo,
    menuSearch,
    menuUp,
    menuOwn,
    menuAi,
    messageError
};