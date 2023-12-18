import fs from 'fs';
import moment from 'moment-timezone';
import * as listAi from './ai.js';
import * as listCarbon from './carbonify.js';
import * as listDown from './download.js';
import * as listGpt from './gpt.js';
import * as listInfo from './info.js';
import * as listRandom from './random.js';
import * as listSearch from './search.js';
import * as listUpload from './upload.js';
import * as listScrape from './scrape.js';

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
                    },
                    {
                        text: 'Scrape 🔎',
                        callback_data: 'menuScrap-' + user_id
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

${Object.keys(listGpt).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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

${Object.keys(listAi).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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

${shape} ${prefix}>
${shape} ${prefix}$
${shape} ${prefix}return
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

${Object.keys(listDown).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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

${Object.keys(listRandom).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}

${Object.keys(listCarbon).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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

${Object.keys(listInfo).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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

${Object.keys(listSearch).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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

${Object.keys(listUpload).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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
${shape} ${prefix}poll
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

async function menuScrap(lol, user_id) {
    prefix = config.prefix
    text = `Info Menu :

${Object.keys(listScrape).map((key, index) => `${index + 1}. ${prefix}${key.toLowerCase()}`).join('\n')}
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
    menuScrap,
    messageError
};