import {
    fetchJson,
    range,
    parseMarkdown,
    functionEval,
    functionExec
} from './lib/function.js';
import {
    aichatonline,
    aidutu,
    binjie,
    c3a0chat,
    cgptonline,
    chatbotji1z,
    chatg,
    chatgbt,
    chatgbtaudio,
    chatgptai,
    chatgptbestim,
    chatgptdemo,
    chatgptt,
    chatgpttaudio,
    cveoy,
    docsbot,
    geekgpt,
    gptchatly,
    gptdemostream,
    gptgo,
    gptphotos,
    gptpictures,
    gptzw7,
    hfgpt2,
    lemurchat,
    lovebaby,
    onlinegpt,
    openaiapi2d,
    openaiazure,
    reveseryai,
    shanti,
    vocai,
    wewordle
} from './lib/gpt.js';
import {
    igDown,
    pinterestvideodownloader,
    mediafires,
    facebook,
    downloader4twitter,
    stickerTelegram,
    stickerTelegramDownload,
    aio,
    spotifyDown,
    spotifySearch,
    ttdown,
    ttdown2,
    xnxxSearch,
    xnxxDownloader,
    shortener,
    fbdown
} from './lib/download.js';
import {
    enhanceImg,
    cekResi,
    tiktokTts,
    ttsModel,
    anime,
    truthOrDare,
    getCerpen,
    getCerpenHorror,
    findSongs,
    igStalk,
    similarBand,
    otakuDesuSearch,
    filmApikS,
    filmApikDl,
    randomCerpen,
    translate,
    langList,
    searchDongeng,
    readDongeng
} from './lib/random.js';
import {
    getData,
    getDataBuffer
} from './lib/getData.js';
import {
    CarbonifyV1,
    CarbonifyV2
} from './lib/carbonify.js';
import {
    infoCuaca
} from './lib/info.js';
import {
    dojindsgetimg,
    doujindesu,
    doujindesuch,
    doujindesulatest,
    doujindesusearch,
    gore,
    hentai,
    igdl,
    igstory,
    joox,
    komikindogetch,
    komikindosearch,
    kusonimeinfo,
    kusonimelatest,
    mangatoons,
    nekopoi,
    nekopoilatest,
    nekopoisearch,
    nhentai,
    nhentaisearch,
    nhgetimg,
    nkpepsddl,
    otakudesu,
    otakudesugetepsddl,
    otakudesuinfo,
    otakudesuongoing,
    pin,
    porno,
    quotes,
    quotesAnime,
    sektekomiksearch,
    ssweb,
    ssweb2,
    textpro,
    tiktok,
    ttdown as ttDowns,
    twitter,
    webtoons,
    facebook as faceBooks,
    searchGit,
    getHentaiList
} from './lib/search.js';
import {
    catbox,
    fexnet,
    fileio,
    gofile,
    hostfile,
    nullbyte,
    pixeldrain,
    tmpfiles,
    top4top,
    transfersh,
    ucarecdn,
    uploadPomf2,
    uploadToDiscdn,
    uploadToKraken
} from './lib/upload.js';
import {
    Telegraf
} from 'telegraf';
import help from './lib/help.js';
import tele from './lib/tele.js';
import chalk from 'chalk';
import os from 'os';
import fs from 'fs';

const {
    usernameOwner,
    numberOwner,
    IdO,
    apikey,
    bot_token,
    owner,
    ownerLink,
    version,
    prefix
} = JSON.parse(fs.readFileSync('./config.json'));
const mess = JSON.parse(fs.readFileSync(`./data/mess.json`))
const _user = JSON.parse(fs.readFileSync(`./data/user.json`))
const _ban = JSON.parse(fs.readFileSync('./data/banned.json'))

let user = null;
let response = null;
let cb_data = null;
let user_id = null;
let callback_data = null;
let comm = null;
let cmd = null;
let test = null;
let text = null;
let url_file = null;
let chatid = null;
let mediaLink = null;
let databuff = null;

if (bot_token === '') {
    console.log('=== BOT TOKEN CANNOT BE EMPTY ===');
    process.exit(1);
}

const bot = new Telegraf(bot_token);

bot.on('new_chat_members', async (lol) => {
    var message = lol.message;
    var pp_group = await tele.getPhotoProfile(message.chat.id);
    var groupname = message.chat.title;
    var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id);
    for (x of message.new_chat_members) {
        var pp_user = await tele.getPhotoProfile(x.id);
        var full_name = tele.getUser(x).full_name;
        console.log(chalk.whiteBright('├'), chalk.cyanBright('[  JOINS  ]'), chalk.whiteBright(full_name), chalk.greenBright('join in'), chalk.whiteBright(groupname));
        await lol.replyWithPhoto({
            url: `https://picsum.photos/2560/1600`,
        });
    }
});

bot.on('left_chat_member', async (lol) => {
    var message = lol.message;
    var pp_group = await tele.getPhotoProfile(message.chat.id);
    var pp_user = await tele.getPhotoProfile(message.left_chat_member.id);
    var pp_group = await tele.getPhotoProfile(message.chat.id);
    var groupname = message.chat.title;
    var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id);
    var pp_user = await tele.getPhotoProfile(message.left_chat_member.id);
    var full_name = tele.getUser(message.left_chat_member).full_name;
    console.log(chalk.whiteBright('├'), chalk.cyanBright('[  LEAVE  ]'), chalk.whiteBright(full_name), chalk.greenBright('leave from'), chalk.whiteBright(groupname));
    await lol.replyWithPhoto({
        url: `https://picsum.photos/2560/1600`
    });
});

bot.command('start', async (lol) => {
    user = tele.getUser(lol.message.from);
    await help.start(lol, user.full_name);
    await lol.deleteMessage();
});

bot.command('help', async (lol) => {
    user = tele.getUser(lol.message.from);
    await help.help(lol, user.full_name, lol.message.from.id.toString());
});

bot.on('callback_query', async (lol) => {
    cb_data = lol.callbackQuery.data.split('-');
    user_id = Number(cb_data[1]);
    if (lol.callbackQuery.from.id != user_id) return lol.answerCbQuery('Sorry, You do not have the right to access this button.', {
        show_alert: true
    });
    callback_data = cb_data[0];
    user = tele.getUser(lol.callbackQuery.from);
    chatid = lol.chat.id;
    const isGroup = lol.chat.type.includes("group");
    if (!isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name));
    if (isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName));
    if (callback_data == 'help') return await help.help(lol, user.full_name, user_id);
    await help[callback_data](lol, user_id.toString());
});

bot.on('message', async (lol) => {
    try {
        const body = lol.message.text || lol.message.caption || '';
        comm = body.trim().split(' ').shift().toLowerCase();
        cmd = false;
        if (prefix !== '' && body.startsWith(prefix)) {
            cmd = true;
            comm = body.slice(1).trim().split(' ').shift().toLowerCase();
        }
        const command = comm;
        const args = await tele.getArgs(lol);
        const user = tele.getUser(lol.message.from);
        const itsme = tele.getBot(lol.message);

        const isUser = _user.includes(user.id);
        const isBann = _ban.includes(user.username);
        const ownerId = [usernameOwner]
        const isOwner = ownerId.includes(user.username);

        const reply = async (content, opt = {}) => {
            await lol.sendChatAction('typing');

            if (typeof content === 'string') {
                for (let x = 0; x < content.length; x += 4096) {
                    await lol.reply(content.slice(x, x + 4096), {
                        disable_web_page_preview: false,
                        ...opt
                    });
                }
            } else {
                const jsonString = JSON.stringify(content, null, 2);
                for (let x = 0; x < jsonString.length; x += 4096) {
                    await lol.reply(jsonString.slice(x, x + 4096), {
                        disable_web_page_preview: false,
                        ...opt
                    });
                }
            }
        };
        const query = args.join(' ');
        const isCmd = cmd;
        const isGroup = lol.chat.type.includes("group");
        const groupName = isGroup ? lol.chat.title : "";

        const isImage = lol.message.hasOwnProperty('photo');
        const isVideo = lol.message.hasOwnProperty('video');
        const isAudio = lol.message.hasOwnProperty('audio');
        const isSticker = lol.message.hasOwnProperty('sticker');
        const isContact = lol.message.hasOwnProperty('contact');
        const isLocation = lol.message.hasOwnProperty('location');
        const isDocument = lol.message.hasOwnProperty('document');
        const isAnimation = lol.message.hasOwnProperty('animation');
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation;

        const quotedMessage = lol.message.reply_to_message || {};
        const isQuotedImage = quotedMessage.hasOwnProperty('photo');
        const isQuotedVideo = quotedMessage.hasOwnProperty('video');
        const isQuotedAudio = quotedMessage.hasOwnProperty('audio');
        const isQuotedSticker = quotedMessage.hasOwnProperty('sticker');
        const isQuotedContact = quotedMessage.hasOwnProperty('contact');
        const isQuotedLocation = quotedMessage.hasOwnProperty('location');
        const isQuotedDocument = quotedMessage.hasOwnProperty('document');
        const isQuotedAnimation = quotedMessage.hasOwnProperty('animation');
        const isQuoted = lol.message.hasOwnProperty('reply_to_message');

        var typeMessage = body.substr(0, 50).replace(/\n/g, '');
        if (isImage) typeMessage = 'Image';
        else if (isVideo) typeMessage = 'Video';
        else if (isAudio) typeMessage = 'Audio';
        else if (isSticker) typeMessage = 'Sticker';
        else if (isContact) typeMessage = 'Contact';
        else if (isLocation) typeMessage = 'Location';
        else if (isDocument) typeMessage = 'Document';
        else if (isAnimation) typeMessage = 'Animation';

        if (!isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ PRIVATE ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name));
        if (isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[  GROUP  ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName));
        if (!isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name));
        if (isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName));

        var file_id = '';
        if (isQuoted) {
            file_id = isQuotedImage ?
                lol.message.reply_to_message.photo[lol.message.reply_to_message.photo.length - 1].file_id :
                isQuotedVideo ?
                lol.message.reply_to_message.video.file_id :
                isQuotedAudio ?
                lol.message.reply_to_message.audio.file_id :
                isQuotedDocument ?
                lol.message.reply_to_message.document.file_id :
                isQuotedAnimation ?
                lol.message.reply_to_message.animation.file_id :
                '';
            console.log(chalk.whiteBright('├'), chalk.cyanBright('[ FILE ID ]'), chalk.yellowBright(file_id));
        }
        if (file_id) {
            mediaLink = file_id ? (await tele.getLink(file_id) || (await tele.downloadFile(file_id)).file) : '';
            if (mediaLink) {
                console.log(chalk.whiteBright('├'), chalk.cyanBright('[ FILE URL ]'), chalk.yellowBright(mediaLink));
            }
        }

        switch (command) {
            case 'help':
                await help.help(lol, user.full_name, lol.message.from.id.toString());
                break;

            case 'aichatonline':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await aichatonline(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'aidutu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await aidutu(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'binjie':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await binjie(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'c3a0chat':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await c3a0chat(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'cgptonline':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await cgptonline(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatbotji1z':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatbotji1z(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatg(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgbt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgbt(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgbtaudio':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgbtaudio(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgptai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptai(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgptbestim':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptbestim('chat', query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgptdemo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptdemo(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgptt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptt(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'chatgpttaudio':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgpttaudio(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'cveoy':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await cveoy(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'docsbot':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await docsbot(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'geekgpt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await geekgpt(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gptchatly':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptchatly(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gptdemostream':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptdemostream('chat', query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gptgo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptgo(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gptphotos':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptphotos(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gptpictures':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptpictures(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gptzw7':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptzw7(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'hfgpt2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await hfgpt2(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'lemurchat':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await lemurchat(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'lovebaby':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await lovebaby(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'onlinegpt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await onlinegpt(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'openaiapi2d':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await openaiapi2d(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'openaiazure':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await openaiazure(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'reveseryai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await reveseryai(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'shanti':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await shanti(query, 'gpt')
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'vocai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await vocai(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'wewordle':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await wewordle(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'aio':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await aio(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'downloader4twitter':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await downloader4twitter(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'facebooks':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await faceBooks(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'igdown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igDown(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'mediafires':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await mediafires(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'pinterestvideodownloader':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await pinterestvideodownloader(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'spotifydown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spotifyDown(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'spotifysearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spotifySearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'stickertelegram':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stickerTelegram(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'stickertelegramdownload':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stickerTelegramDownload(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ttdowns':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttDowns(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ttdown2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttdown2(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'xnxxdownloader':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await xnxxDownloader(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'xnxxsearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await xnxxSearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'anime':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await anime(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'cekresi':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await cekResi(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'enhanceimg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await enhanceImg(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'filmapikdl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await filmApikDl(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'filmapiks':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await filmApikS(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'findsongs':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await findSongs(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'getcerpen':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getCerpen(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'getcerpenhorror':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getCerpenHorror(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'igstalk':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igStalk(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'otakudesusearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakuDesuSearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'randomcerpen':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await randomCerpen(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'similarband':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await similarBand(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'tiktoktts':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await tiktokTts(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'truthordare':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await truthOrDare(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ttsmodel':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttsModel(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'translate':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await translate(query, 'id')
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'langlist':
                response = await langList()
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'get':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getData(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'searchdongeng':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await searchDongeng(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'readdongeng':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await readDongeng(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'carbon':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                CarbonifyV1(query)
                    .then((result) => {
                        return lol.replyWithPhoto({
                            reply_to_message_id: lol.message.message_id,
                            url: result
                        });
                    })
                    .catch(() => {
                        return CarbonifyV2(query)
                            .then((result) => {
                                return lol.replyWithPhoto({
                                    reply_to_message_id: lol.message.message_id,
                                    url: result
                                });
                            })
                            .catch((error) => {
                                throw error;
                            });
                    });
                break;

            case 'coffee':
                await lol.replyWithPhoto({
                    reply_to_message_id: lol.message.message_id,
                    url: "https://coffee.alexflipnote.dev/random"
                });
                break;


            case 'dojindsgetimg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await dojindsgetimg(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'doujindesu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesu(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'doujindesuch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesuch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'doujindesulatest':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesulatest(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'doujindesusearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesusearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'facebook':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await facebook(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gethentailist':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getHentaiList(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gore':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gore(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'hentai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await hentai(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'igdl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igdl(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'igstory':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igstory(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'joox':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await joox(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'komikindogetch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await komikindogetch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'komikindosearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await komikindosearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'kusonimeinfo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await kusonimeinfo(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'kusonimelatest':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await kusonimelatest(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'mangatoons':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await mangatoons(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nekopoi':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nekopoi(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nekopoilatest':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nekopoilatest(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nekopoisearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nekopoisearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nhentai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nhentai(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nhentaisearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nhentaisearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nhgetimg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nhgetimg(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nkpepsddl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nkpepsddl(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'otakudesu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesu(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'otakudesugetepsddl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesugetepsddl(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'otakudesuinfo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesuinfo(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'otakudesuongoing':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesuongoing(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'pin':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await pin(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'porno':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await porno(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'quotes':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await quotes(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'quotesanime':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await quotesAnime(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'searchgit':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await searchGit(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'sektekomiksearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sektekomiksearch(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ssweb':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssweb(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ssweb2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssweb2(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'textpro':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await textpro(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'tiktok':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await tiktok(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ttdown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttdown(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'twitter':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await twitter(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'webtoons':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await webtoons(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;


            case 'cuaca':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await infoCuaca(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'fbdown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await fbdown(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'shortener':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await shortener(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'catbox':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await catbox(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'fexnet':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await fexnet(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'fileio':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await fileio(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'gofile':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await gofile(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'hostfile':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await hostfile(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'nullbyte':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await nullbyte(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'pixeldrain':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await pixeldrain(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'tmpfiles':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await tmpfiles(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'top4top':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await top4top(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'transfersh':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await transfersh(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'ucarecdn':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await ucarecdn(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'uploadpomf2':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await uploadPomf2(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'uploadtodiscdn':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await uploadToDiscdn(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'uploadtokraken':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} Hello!`);
                if (!mediaLink) return await reply("Terjadi kesalahan!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Terjadi kesalahan!");
                response = await uploadToKraken(databuff)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'tagme':
                await reply(`${Telegraf.mention(user.id)}`)
                break
            case 'chatscount':
                if (isBann) return await reply(mess.ban)
                if (!isUser) return await reply(mess.ser)
                test = await bot.telegram.getChatMembersCount(lol.message.chat.id)
                await reply(`Total Members in the Group ${lol.message.chat.title}: ${test}`)
                break
            case 'leave':
                if (!isUser) return await reply(mess.ser)
                if (isBann) return await reply(mess.ban)
                if (!isGroup) return await reply(mess.gc)
                try {
                    await bot.telegram.leaveChat(lol.message.chat.id)
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'gcdesk':
                if (!isUser) return await reply(mess.ser)
                if (isBann) return await reply(mess.ban)
                if (!isGroup) return await reply(mess.gc)
                if (!query) return await reply('Input Teks!')
                const aa = '```'
                try {
                    await bot.telegram.setChatDescription(lol.message.chat.id, query)
                    await reply(`Deskripsi Group Berhasil Di Ubah Oleh ${user.username} Menjadi Deskripsi Yang Baru\n\n${aa}${query}${aa}`)
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'gctitle':
                if (!isUser) return await reply(mess.ser)
                if (isBann) return await reply(mess.ban)
                if (!isGroup) return await reply(mess.gc)
                if (!query) return await reply('Input Teks!')
                try {
                    await bot.telegram.setChatTitle(lol.message.chat.id, query)
                    await reply(`Nama Group Berhasil Di Ubah Oleh ${user.username} Menjadi Nama Yang Baru\n\n${hem}${query}${hem}`)
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'mypict':
                if (!isUser) return await reply(mess.ser)
                if (isBann) return await reply(mess.ban)
                if (!isGroup) return await reply(mess.gc)
                try {
                    let ppnya = await bot.telegram.getUserProfilePhotos(user.id)
                    await lol.replyWithPhoto({
                        url: ppnya
                    })
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'infochat':
                if (!isUser) return await reply(mess.ser)
                if (isBann) return await reply(mess.ban)
                if (!isGroup) return await reply(mess.gc)
                try {
                    let cha = await bot.telegram.getChat(lol.message.chat.id)
                    let kntll = `${cha.permissions}`
                    let teks = `
                                                           INFO CHAT MU YANG DI PERBOLEHKAN DI GROUP INI!
                                                           
                                                           
    Id Grup: ${cha.id}
    Nama Grup: ${cha.title}
    Deskripsi: ${cha.description}
    
    ${hem}Dapat Mengirim Pesan:${hem} ${cha.permissions.can_send_messages}
    ${hem}Dapat Mengirim Pesan Media:${hem} ${cha.permissions.can_send_media_messages}
    ${hem}Dapat Mengirim Pesan Lain:${hem} ${cha.permissions.can_send_other_messages}
    ${hem}Dapat Menambah Halaman Web:${hem} ${cha.permissions.can_add_web_page_previews}
    ${hem}Dapat Melakukan Polling:${hem} ${cha.permissions.can_send_polls} 
    ${hem}Dapat Mengubah Info Grup:${hem} ${cha.permissions.can_change_info}
    ${hem}Dapat Menambahkan Peserta:${hem} ${cha.permissions.can_invite_users}
    ${hem}Dapat Memberi Pin Pesan:${hem} ${cha.permissions.can_pin_messages}
    `

                    await reply(teks)
                    console.log(cha)
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'gcpict':
                if (isQuotedImage) {
                    let url_file = await tele.getLink(file_id)
                    await bot.telegram.setChatPhoto(lol.message.chat.id, url_file)
                } else {
                    await reply('Tag Gambar Nya!')
                }
                break
            case 'delpict':
                try {
                    await bot.telegram.deleteChatPhoto(lol.message.chat.id)
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'unban':
                if (!isOwner) return await reply('Kamu Siapa?')
                if (!query) return await reply('Input Id Yang Ingin Di Hapus Dari Database Bot!')
                try {
                    let delban = _ban.indexOf(query)
                    _ban.splice(delban, 1)
                    fs.writeFileSync('./data/banned.json', JSON.stringify(_ban))
                    await reply(`Succes delete Banned User ${query}`)
                } catch (err) {
                    await reply(`Gagal delete Banned User ${query}.\n\n${err}`)
                }
                break
            case 'ban':
                if (!query) return await reply('Input Username!')
                if (!isOwner) return await reply('Kamu Siapa>\\<')
                _ban.push(query)
                fs.writeFileSync('./data/banned.json', JSON.stringify(_ban))
                await reply('donee')
                break
            case 'daftar':
                let pp_user
                try {
                    pp_user = await tele.getPhotoProfile(user.id)
                } catch {
                    pp_user = 'https://telegra.ph/file/583ca5905d85b7484373b.jpg'
                }
                if (isUser) return await reply('Kamu Sudah Daftar Sebelumnya!')
                _user.push(user.id)
                fs.writeFileSync('./data/user.json', JSON.stringify(_user))
                let snn = Math.floor(Math.random() * 10000000)
                let caption = ` 
Pendaftaran Sukses Dengan Detail Sebagai Berikut!


Id: ${user.id}
SN: ${snn}
Nama: ${user.full_name}
Bahasa: ${user.language_code}
Nama Awal: ${user.first_name}
Nama Akhir: ${user.last_name}
Nam Pengguna: ${user.username}


Note:

Nama Pengguna Kamu Akan Hilang Dari Database Bot Apa Bila Bot Sedang Perbaikan Atau Kamu Melakukan ${prefix}unreg id telegram\n\nContoh: ${prefix}unreg 132563726`
                console.log(user)
                await lol.replyWithPhoto({
                    url: `https://picsum.photos/2560/1600`
                }, {
                    caption: caption,
                    parse_mode: "Markdown"
                })
                break
            case 'unreg':
                if (!query) return await reply('Input Id Yang Ingin Di Hapus Dari Database Bot!')
                try {
                    let delsayso = _user.indexOf(query)
                    _user.splice(delsayso, 1)
                    fs.writeFileSync('./data/user.json', JSON.stringify(_user))
                    await reply(`Succes delete User ${query}`)
                } catch (err) {
                    await reply(`Gagal delete User ${query}.\n\n${err}`)
                }
                break
            case 'status':
                let ppl = `status: ${isUser?'User':'Bukan User'}`
                await reply(ppl)
                break
            case 'report':
                if (!query) return await reply('Input Teks')
                if (!isUser) return await reply(mess.ser)
                try {
                    await bot.telegram.sendMessage(IdO, query)
                    await reply('Masalahmmu Telah Sampai Ke Owner Bot, Owner Akan Segera Menanganinya!')
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'getid':
                await reply(`Id Mu: ${user.id}`)
                break
            case 'cek':
                let userrr = `Total User: ${_user.length}`
                await reply(userrr)
                break
            case 'resetban':
                if (!isOwner) return await reply('Lu Siapa?')
                var bann = []
                _ban.splice(bann)
                fs.writeFileSync('./data/banned.json', JSON.stringify(_ban))
                await reply('okee...')
                break
            case 'resetuser':
                if (!isOwner) return await reply('Kamu Siapa?')
                var serrr = []
                _user.splice(serrr)
                fs.writeFileSync('./data/user.json', JSON.stringify(_user))
                await reply('oke')
                break
            case 'adduser':
                if (!isOwner) return await reply('Kamu Siapa')
                if (!query) return await reply('Input Id User')
                _user.push(query)
                fs.writeFileSync('./data/user.json', JSON.stringify(_user))
                await reply('Sukses')
                break

            case '>':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await functionEval(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case '$':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await functionExec(query)
                await reply(response, {
                    reply_to_message_id: lol.message.message_id
                })
                break;

            case 'test':
                test = await bot.telegram.getChatMembersCount(lol.message.chat.id);
                console.log(test);
                break;

            case 'return':
                if (!isOwner) return await reply('Khusus Owner Kak')
                try {
                    return bot.telegram.sendMessage(lol.message.chat.id, JSON.stringify(eval(args.join('')), null, '\t'), lol.replyWithChatAction("typing"))
                } catch (e) {
                    await reply(`Error: ${e}`)
                }
                break

            case 'owner':
                try {
                    const nomorTerformat = new Intl.NumberFormat('id-ID', {
                        style: 'decimal',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(Number(numberOwner.replace(/\D/g, '')));
                    await bot.telegram.sendContact(lol.message.chat.id, numberOwner, usernameOwner, usernameOwner, usernameOwner, `+${nomorTerformat}`, 'silently', 'ID', 'true')
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'emote':
                try {
                    let p = ["🐷", "🌝", "🐷", "🌝", "🤗", "❣️", "😉"]
                    await bot.telegram.sendDice(lol.message.chat.id, p)
                } catch (e) {
                    await reply('' + e)
                }
                break
            case 'inf':
                let pk = await lol.message
                console.log(pk)
                await reply('' + pk)
                break
            case 'testt':
                await bot.telegram.sendMessage(chatid, 'Hai Kak')
                break
            default:
                console.log(chalk.bgYellow.black('─── ' + chalk.blue('[ Not Found ]')));
        }
    } catch (e) {
        console.log(chalk.whiteBright('├'), chalk.cyanBright('[  ERROR  ]'), chalk.redBright(e));
    }
});

bot.launch({
    dropPendingUpdates: true,
});

bot.telegram.getMe().then(({
    first_name
}) => {
    const itsPrefix = prefix || 'No Prefix';
    const uptime = process.uptime();
    const cpuSpeed = os.cpus()[0].speed;

    const border = chalk.bgRedBright.white(' ╭──────────────────────────────────── ').trimEnd();
    const log = console.log;
    const [leftText, rightText] = [chalk.yellowBright(' │ '), chalk.cyanBright(' ')];

    log(border);
    new Map([
        ['Owner', owner],
        ['Bot Name', first_name],
        ['Version', version],
        ['Host', os.hostname()],
        ['Platform', os.platform()],
        ['CPU Speed', `${cpuSpeed} MHz`],
        ['Prefix', itsPrefix],
        ['Uptime', formatUptime(uptime)],
    ]).forEach((value, label) => {
        const paddedLabel = label.padEnd(18);
        log(`${leftText}${chalk.yellowBright(`${paddedLabel}:`)} ${value || ''} ${rightText}`);
    });

    log(`${leftText}${chalk.yellowBright('Additional Info:')} Telegram Bot. ${rightText}`);
    log(`${leftText}${chalk.yellowBright('Your Here')} ⇩ ${rightText}`);
    log(chalk.bgYellow.black(` ╰──────────────────────────────────── `).trimStart());
});

const formatUptime = (uptime) => {
    const [hours, minutes, seconds] = [3600, 60, 1].map(unit => Math.floor(uptime / unit));
    return `${hours}h ${minutes}m ${seconds}s`;
};

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));