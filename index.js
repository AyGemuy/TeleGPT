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
    infoCuaca,
    infoGempa
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
    getHentaiList,
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
    uploadToKraken,
    filebin
} from './lib/upload.js';
import {
ChatGptBing,
BingImageCreator,
Aichat,
Acytoo,
Aivvm,
CohereAPI,
Bardie,
botika,
ChatBase,
Hercai,
Liaobots,
blackboxchat,
blackboximg,
lbbAi,
mariTalk,
talkai,
toAnime
} from './lib/ai.js';
import {
    sandroid1,
    sanime,
    sanoboydl,
    sanoboys,
    sapkmirror,
    sapkmody,
    sartinama,
    sasupanfilm,
    sasupanfilminfo,
    sbacaresep,
    scarigc,
    scariresep,
    schara,
    scorona,
    sdevianart,
    sdewabatch,
    sdrakor,
    sfacebook,
    sfilm,
    sgempa,
    sghfollower,
    sghfollowing,
    sghuser,
    sgoredl,
    shappymod,
    shappymoddl,
    sigdl,
    sigdl2,
    sigstalk,
    sigstory,
    sjob,
    sjoox,
    skiryu,
    skonachan,
    smanga,
    smangatoon,
    smediafire,
    smerdekanews,
    smetronews,
    spalingmurah,
    spin,
    spinterest2,
    squotes,
    srandomgore,
    srandomtt,
    srexdl,
    srexdldown,
    ssearchgore,
    ssfiledown,
    ssfilesearch,
    ssoundcloud,
    sstickersearch,
    stextmakervid,
    stiktok,
    strendtwit,
    stwitter,
    swallpapercave,
    swallpapercraft,
    swallpaperhd,
    swattpad,
    swebtoons,
    swikisearch,
    szerochan,
    szippydl
} from './lib/scrape.js';
import {
    Telegraf,
    Markup
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
    const message = lol.message;
    const groupname = message.chat.title;
    
    for (const member of message.new_chat_members) {
        const full_name = member.first_name + (member.last_name ? ` ${member.last_name}` : '');
        console.log('├', '[  JOINS  ]', full_name, 'join in', groupname);
        
        await lol.replyWithPhoto({
                    url: `https://picsum.photos/2560/1600`
                }, {
                    caption: full_name + '\n\n[  JOINS  ]',
                    parse_mode: "Markdown"
                });
    }
});

bot.on('left_chat_member', async (ctx) => {
    const message = ctx.message;
    
    if (parseInt(message.left_chat_member.id) !== parseInt(bot_token.split(':')[0])) {
        const groupname = message.chat.title;
        const full_name = message.left_chat_member.first_name + (message.left_chat_member.last_name ? ` ${message.left_chat_member.last_name}` : '');

        console.log('├', '[  LEAVE  ]', full_name, 'leave from', groupname);

        await ctx.replyWithPhoto({
            url: 'https://picsum.photos/2560/1600',
        }, {
            caption: `${full_name}\n\n[  LEAVE  ]`,
            parse_mode: 'Markdown',
        });
    }
});

bot.command('start', async (lol) => {
    user = tele.getUser(lol.message.from);
    await help.start(lol, user.full_name);
    const isGroup = lol.chat.type.includes("group");
    if (!isGroup) return await lol.deleteMessage();
});

bot.command('help', async (lol) => {
    user = tele.getUser(lol.message.from);
    await help.help(lol, user.full_name, lol.message.from.id.toString());
});

bot.on('callback_query', async (lol) => {
    var groupname = lol.chat.title;
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
    if (isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupname));
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
            if (typeof content === 'string') {
                for (let x = 0; x < content.length; x += 4096) {
                    await lol.reply(content.slice(x, x + 4096), {
                        disable_web_page_preview: false,
                        reply_to_message_id: lol.message.message_id,
                        ...opt
                    });
                }
            } else {
                const jsonString = JSON.stringify(content, null, 2);
                for (let x = 0; x < jsonString.length; x += 4096) {
                    await lol.reply(jsonString.slice(x, x + 4096), {
                        disable_web_page_preview: false,
                        reply_to_message_id: lol.message.message_id,
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
        const action = isMedia
  ? isImage ? 'upload_photo' :
    isVideo ? 'record_video' :
    isAudio ? 'record_audio' :
    isDocument ? 'upload_document' :
    isLocation ? 'find_location' :
    isAnimation ? 'record_video_note' :
    'typing'
  : 'typing';
if (isCmd) {
await lol.sendChatAction(action);
}

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
const messages = [{
            role: 'system',
            content: 'You are a helpful assistant.'
        },
        {
            role: 'user',
            content: (query)
        },
    ];

        switch (command) {
            case 'help':
                await help.help(lol, user.full_name, lol.message.from.id.toString());
                break;

            case 'aichatonline':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await aichatonline(query)
                await reply(response)
                break;

            case 'aidutu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await aidutu(query)
                await reply(response)
                break;

            case 'binjie':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await binjie(query)
                await reply(response)
                break;

            case 'c3a0chat':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await c3a0chat(query)
                await reply(response)
                break;

            case 'cgptonline':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await cgptonline(query)
                await reply(response)
                break;

            case 'chatbotji1z':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatbotji1z(query)
                await reply(response)
                break;

            case 'chatg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatg(query)
                await reply(response)
                break;

            case 'chatgbt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgbt(query)
                await reply(response)
                break;

            case 'chatgbtaudio':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgbtaudio(query)
                await reply(response)
                break;

            case 'chatgptai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptai(query)
                await reply(response)
                break;

            case 'chatgptbestim':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptbestim('chat', query)
                await reply(response)
                break;

            case 'chatgptdemo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptdemo(query)
                await reply(response)
                break;

            case 'chatgptt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgptt(query)
                await reply(response)
                break;

            case 'chatgpttaudio':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await chatgpttaudio(query)
                await reply(response)
                break;

            case 'cveoy':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await cveoy(query)
                await reply(response)
                break;

            case 'docsbot':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await docsbot(query)
                await reply(response)
                break;

            case 'geekgpt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await geekgpt(query)
                await reply(response)
                break;

            case 'gptchatly':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptchatly(query)
                await reply(response)
                break;

            case 'gptdemostream':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptdemostream('chat', query)
                await reply(response)
                break;

            case 'gptgo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptgo(query)
                await reply(response)
                break;

            case 'gptphotos':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptphotos(query)
                await reply(response)
                break;

            case 'gptpictures':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptpictures(query)
                await reply(response)
                break;

            case 'gptzw7':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gptzw7(query)
                await reply(response)
                break;

            case 'hfgpt2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await hfgpt2(query)
                await reply(response)
                break;

            case 'lemurchat':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await lemurchat(query)
                await reply(response)
                break;

            case 'lovebaby':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await lovebaby(query)
                await reply(response)
                break;

            case 'onlinegpt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await onlinegpt(query)
                await reply(response)
                break;

            case 'openaiapi2d':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await openaiapi2d(query)
                await reply(response)
                break;

            case 'openaiazure':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await openaiazure(query)
                await reply(response)
                break;

            case 'reveseryai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await reveseryai(query)
                await reply(response)
                break;

            case 'shanti':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await shanti(query, 'gpt')
                await reply(response)
                break;

            case 'vocai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await vocai(query)
                await reply(response)
                break;

            case 'wewordle':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await wewordle(query)
                await reply(response)
                break;

            case 'aio':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await aio(query)
                await reply(response)
                break;

            case 'downloader4twitter':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await downloader4twitter(query)
                await reply(response)
                break;

            case 'facebooks':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await faceBooks(query)
                await reply(response)
                break;

            case 'igdown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igDown(query)
                await reply(response)
                break;

            case 'mediafires':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await mediafires(query)
                await reply(response)
                break;

            case 'pinterestvideodownloader':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await pinterestvideodownloader(query)
                await reply(response)
                break;

            case 'spotifydown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spotifyDown(query)
                await reply(response)
                break;

            case 'spotifysearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spotifySearch(query)
                await reply(response)
                break;

            case 'stickertelegram':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stickerTelegram(query)
                await reply(response)
                break;

            case 'stickertelegramdownload':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stickerTelegramDownload(query)
                await reply(response)
                break;

            case 'ttdowns':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttDowns(query)
                await reply(response)
                break;

            case 'ttdown2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttdown2(query)
                await reply(response)
                break;

            case 'xnxxdownloader':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await xnxxDownloader(query)
                await reply(response)
                break;

            case 'xnxxsearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await xnxxSearch(query)
                await reply(response)
                break;

            case 'anime':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await anime(query)
                await reply(response)
                break;

            case 'cekresi':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await cekResi(query)
                await reply(response)
                break;

            case 'enhanceimg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await enhanceImg(query)
                await reply(response)
                break;

            case 'filmapikdl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await filmApikDl(query)
                await reply(response)
                break;

            case 'filmapiks':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await filmApikS(query)
                await reply(response)
                break;

            case 'findsongs':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await findSongs(query)
                await reply(response)
                break;

            case 'getcerpen':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getCerpen(query)
                await reply(response)
                break;

            case 'getcerpenhorror':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getCerpenHorror(query)
                await reply(response)
                break;

            case 'igstalk':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igStalk(query)
                await reply(response)
                break;

            case 'otakudesusearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakuDesuSearch(query)
                await reply(response)
                break;

            case 'randomcerpen':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await randomCerpen(query)
                await reply(response)
                break;

            case 'similarband':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await similarBand(query)
                await reply(response)
                break;

            case 'tiktoktts':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await tiktokTts(query)
                await reply(response)
                break;

            case 'truthordare':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await truthOrDare(query)
                await reply(response)
                break;

            case 'ttsmodel':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttsModel(query)
                await reply(response)
                break;

            case 'translate':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await translate(query, 'id')
                await reply(response)
                break;

            case 'langlist':
                response = await langList()
                await reply(response)
                break;

            case 'get':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getData(query)
                await reply(response)
                break;

            case 'searchdongeng':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await searchDongeng(query)
                await reply(response)
                break;

            case 'readdongeng':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await readDongeng(query)
                await reply(response)
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
                await reply(response)
                break;

            case 'doujindesu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesu(query)
                await reply(response)
                break;

            case 'doujindesuch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesuch(query)
                await reply(response)
                break;

            case 'doujindesulatest':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesulatest(query)
                await reply(response)
                break;

            case 'doujindesusearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await doujindesusearch(query)
                await reply(response)
                break;

            case 'facebook':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await facebook(query)
                await reply(response)
                break;

            case 'gethentailist':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await getHentaiList(query)
                await reply(response)
                break;

            case 'gore':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await gore(query)
                await reply(response)
                break;

            case 'hentai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await hentai(query)
                await reply(response)
                break;

            case 'igdl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igdl(query)
                await reply(response)
                break;

            case 'igstory':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await igstory(query)
                await reply(response)
                break;

            case 'joox':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await joox(query)
                await reply(response)
                break;

            case 'komikindogetch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await komikindogetch(query)
                await reply(response)
                break;

            case 'komikindosearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await komikindosearch(query)
                await reply(response)
                break;

            case 'kusonimeinfo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await kusonimeinfo(query)
                await reply(response)
                break;

            case 'kusonimelatest':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await kusonimelatest(query)
                await reply(response)
                break;

            case 'mangatoons':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await mangatoons(query)
                await reply(response)
                break;

            case 'nekopoi':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nekopoi(query)
                await reply(response)
                break;

            case 'nekopoilatest':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nekopoilatest(query)
                await reply(response)
                break;

            case 'nekopoisearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nekopoisearch(query)
                await reply(response)
                break;

            case 'nhentai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nhentai(query)
                await reply(response)
                break;

            case 'nhentaisearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nhentaisearch(query)
                await reply(response)
                break;

            case 'nhgetimg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nhgetimg(query)
                await reply(response)
                break;

            case 'nkpepsddl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await nkpepsddl(query)
                await reply(response)
                break;

            case 'otakudesu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesu(query)
                await reply(response)
                break;

            case 'otakudesugetepsddl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesugetepsddl(query)
                await reply(response)
                break;

            case 'otakudesuinfo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesuinfo(query)
                await reply(response)
                break;

            case 'otakudesuongoing':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await otakudesuongoing(query)
                await reply(response)
                break;

            case 'pin':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await pin(query)
                await reply(response)
                break;

            case 'porno':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await porno(query)
                await reply(response)
                break;

            case 'quotes':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await quotes(query)
                await reply(response)
                break;

            case 'quotesanime':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await quotesAnime(query)
                await reply(response)
                break;

            case 'searchgit':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await searchGit(query)
                await reply(response)
                break;

            case 'sektekomiksearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sektekomiksearch(query)
                await reply(response)
                break;

            case 'ssweb':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssweb(query)
                await reply(response)
                break;

            case 'ssweb2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssweb2(query)
                await reply(response)
                break;

            case 'textpro':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await textpro(query)
                await reply(response)
                break;

            case 'tiktok':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await tiktok(query)
                await reply(response)
                break;

            case 'ttdown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ttdown(query)
                await reply(response)
                break;

            case 'twitter':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await twitter(query)
                await reply(response)
                break;

            case 'webtoons':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await webtoons(query)
                await reply(response)
                break;
                
                case 'gempa':
                response = await infoGempa()
                await reply(response)
                break;
                
            case 'cuaca':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await infoCuaca(query)
                await reply(response)
                break;

            case 'fbdown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await fbdown(query)
                await reply(response)
                break;

            case 'shortener':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await shortener(query)
                await reply(response)
                break;

            case 'catbox':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await catbox(databuff)
                await reply(response)
                break;

            case 'fexnet':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await fexnet(databuff)
                await reply(response)
                break;

            case 'fileio':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await fileio(databuff)
                await reply(response)
                break;

            case 'gofile':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await gofile(databuff)
                await reply(response)
                break;

            case 'hostfile':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await hostfile(databuff)
                await reply(response)
                break;

            case 'nullbyte':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await nullbyte(databuff)
                await reply(response)
                break;

            case 'pixeldrain':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await pixeldrain(databuff)
                await reply(response)
                break;

            case 'tmpfiles':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await tmpfiles(databuff)
                await reply(response)
                break;

            case 'top4top':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await top4top(databuff)
                await reply(response)
                break;

            case 'transfersh':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await transfersh(databuff)
                await reply(response)
                break;

            case 'ucarecdn':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await ucarecdn(databuff)
                await reply(response)
                break;

            case 'uploadpomf2':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await uploadPomf2(databuff)
                await reply(response)
                break;

            case 'uploadtodiscdn':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await uploadToDiscdn(databuff)
                await reply(response)
                break;

            case 'uploadtokraken':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await uploadToKraken(databuff)
                await reply(response)
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
                
                case 'acytoo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                try {
        const getAcytooResponse = async (messages, proxy = {}) => {
    const responseChunks = await Acytoo.createAsyncGenerator('gpt-3.5-turbo', messages, proxy);
    const responseArray = [];
    for await (const chunk of responseChunks) {
        responseArray.push(chunk);
    }
    return responseArray.join('');
};

    response = await getAcytooResponse(messages);
        await reply(response);
    } catch (error) {
        console.error('Error:', error);
       await reply(eror);
    }
                break;
                
                case 'aichat':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                
        const output = await Aichat.createAsync("gpt-3.5-turbo", messages);
        await reply(output);
                break;
                
                case 'aivvm':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                
    try {
        const getAivvmResponse = async (messages, proxy = {}) => {
    const responseChunks = await Aivvm.createAsyncGenerator('gpt-3.5-turbo', messages, true, {});
    const responseArray = [];
    for await (const chunk of responseChunks) {
        responseArray.push(chunk);
    }
    return responseArray.join('');
};
         response = await getAivvmResponse(messages);

        await reply(response);
    } catch (error) {
        console.error('Error:', error);
        await reply('Terjadi kesalahan saat berkomunikasi dengan AI Service.');
    }
                break;
                
                case 'bardie':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                const bard = new Bardie();
                if (!isQuotedImage && !mediaLink) {
	response = await bard.question({
		ask: query
	});
} else {
	response = await bard.questionWithImage({
		ask: query,
		image: mediaLink
	});
	}
                await reply(response.content)
                break;
                
                case 'bingimagecreator':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                try {
        const res = new BingImageCreator({ cookie: "1CBrGSpML0Fz8WQSDRzqWaeyL9zle6nYrZn6uCwVyEEO8Nqdcs4B2UGs-zBkYVeTjYmvveLcSvkWvDtPHVV8CtUt0l15dzoSU_ARtKpYzDes8WjEKQPjWX64ckraHm676gEcRMa2dVE_nGuCLpFvnkDBdzkO_Kfesi4LgVMDrucBRmOPrSOVYzqPJVFXtNIOLDlW5xOUUi3rS8ltxZfSoCQ" });
        const data = await res.createImage(query);

        const filteredData = data.filter(file => !file.endsWith('.svg'));
        const totalCount = filteredData.length;

        if (totalCount > 0) {
            for (let i = 0; i < totalCount; i++) {
                try {
                    await lol.replyWithPhoto({
                    url: filteredData[i]
                }, {
                    caption: `Image **(${i + 1}/${totalCount})**`,
                    parse_mode: "Markdown"
                })
                } catch (error) {
                    console.error(`Error sending file: ${error.message}`);
                    await reply(`Failed to send image *(${i + 1}/${totalCount})*`);
                }
            }
        } else {
            await reply('No images found after filtering.');
        }
    } catch (error) {
        console.error(`Error in handler: ${error.message}`);
        await reply('An error occurred while processing the request.');
    }
                break;
                
                case 'chatbase':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                
    try {
        const getChatBaseResponse = async (messages, proxy = {}) => {
    const responseChunks = await ChatBase.createAsyncGenerator('gpt-3.5-turbo', messages, true, {});
    const responseArray = [];
    for await (const chunk of responseChunks) {
        responseArray.push(chunk);
    }
    return responseArray.join('');
};
        response = await getChatBaseResponse(messages);

        await reply(response);
    } catch (error) {
        console.error('Error:', error);
    }
                break;
                
                case 'chatgptbing':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ChatGptBing(query)
                await reply(response)
                break;
                
                case 'cohereapi':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                const cohereApiKey = 'mJ9GVG9lcV8iO7TJYOuQjqfcw4JB2y1CmirFXdX1';
            const textGenerationApi = new CohereAPI(cohereApiKey);
                    response = await textGenerationApi.start('command-nightly', [query]);
                await reply(response)
                break;
                
                case 'hercai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                const client = new Hercai();
                const input_data = ["chatv2", "chatbeta", "chatv3-beta", "imagev1", "imagev2", "imagev2-beta", "imagev3", "imagelexica", "imageprodia"]

    let [urutan, tema] = query.split("|")
    if (!tema) return reply("Input query!\n*Example:*\n.hercai [nomor]|[query]")
await reply('wait')
    try {
        let data = input_data.map((item, index) => ({
            title: item.replace(/[_-]/g, ' ').replace(/\..*/, ''),
            id: item
        }));
        if (!urutan) return reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id
        if (out == "chatv2") {
            response = await client.question({
                model: "v2",
                content: tema
            });
            await reply(response.reply)
        } else if (out == "chatbeta") {
            response = await client.question({
                model: "beta",
                content: tema
            });
            await reply(response.reply)
        } else if (out == "chatv3-beta") {
            response = await client.question({
                model: "v3-beta",
                content: tema
            });
            await reply(response.reply)
        } else if (out == "imagev1") {
            response = await client.drawImage({
                model: "v1",
                prompt: tema
            });
            await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih effect *${out}* nya\nRequest by: ${user.full_name}`,
                    parse_mode: "Markdown"
                })
        } else if (out == "imagev2") {
            response = await client.drawImage({
                model: "v2",
                prompt: tema
            });
            await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih effect *${out}* nya\nRequest by: ${user.full_name}`,
                    parse_mode: "Markdown"
                })
        } else if (out == "imagev2-beta") {
            response = await client.drawImage({
                model: "v2-beta",
                prompt: tema
            });
            await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih effect *${out}* nya\nRequest by: ${user.full_name}`,
                    parse_mode: "Markdown"
                })
        } else if (out == "imagev3") {
            response = await client.drawImage({
                model: "v3",
                prompt: tema
            });
            await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih effect *${out}* nya\nRequest by: ${user.full_name}`,
                    parse_mode: "Markdown"
                })
        } else if (out == "imagelexica") {
            response = await client.drawImage({
                model: "lexica",
                prompt: tema
            });
            await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih effect *${out}* nya\nRequest by: ${user.full_name}`,
                    parse_mode: "Markdown"
                })
        } else if (out == "imageprodia") {
            response = await client.drawImage({
                model: "prodia",
                prompt: tema
            });
            await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih effect *${out}* nya\nRequest by: ${user.full_name}`,
                    parse_mode: "Markdown"
                })
        }
    } catch (e) {
        await reply('eror')
    }
                break;
                
                case 'liaobots':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                try {
        const getLiaobotsResponse = async (messages, proxy = {}) => {
    const responseChunks = await (new Liaobots()).createAsyncGenerator('gpt-3.5-turbo', messages, proxy);
    const responseArray = [];
    for await (const chunk of responseChunks) {
        responseArray.push(chunk);
    }
    return responseArray.join('');
};
        response = await getLiaobotsResponse(messages);

        await reply(response);
    } catch (error) {
        console.error('Error:', error);
        await reply(error);
    }
                break;
                
                case 'blackboxchat':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await blackboxchat(query)
                await reply(response)
                break;
                
                case 'blackboximg':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                if (!(isQuotedImage)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                response = await blackboximg(databuff, query)
                await reply(response)
                break;
                
                case 'botika':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await botika(query)
                await reply(response)
                break;
                
                case 'lbbai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await lbbAi(query)
                await reply(response)
                break;
                
                case 'maritalk':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await mariTalk(query)
                await reply(response)
                break;
                
                case 'talkai':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await talkai(query)
                await reply(response)
                break;
                
                case 'toanime':
                if (!(isQuotedImage)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                response = await toAnime(databuff)
                await lol.replyWithPhoto({
                    url: response.url
                }, {
                    caption: `Nih ${user.full_name}`,
                    parse_mode: "Markdown"
                })
                break;
                
                case 'filebin':
                if (!(isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument)) return await reply(`Example: ${prefix + command} with (Reply Media!)`);
                if (!mediaLink) return await reply("Media link tidak ada!");
                databuff = await getDataBuffer(mediaLink);
                if (!databuff) return await reply("Buffer tidak ada!");
                response = await filebin(databuff)
                await reply(response)
                break;
                
                
case 'sandroid1':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sandroid1(query)
                await reply(response)
                break;
                
                case 'sanime':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sanime(query)
                await reply(response)
                break;
                
                case 'sanoboydl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sanoboydl(query)
                await reply(response)
                break;
                
                case 'sanoboys':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sanoboys(query)
                await reply(response)
                break;
                
                case 'sapkmirror':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sapkmirror(query)
                await reply(response)
                break;
                
                case 'sapkmody':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sapkmody(query)
                await reply(response)
                break;
                
                case 'sartinama':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sartinama(query)
                await reply(response)
                break;
                
                case 'sasupanfilm':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sasupanfilm(query)
                await reply(response)
                break;
                
                case 'sasupanfilminfo':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sasupanfilminfo(query)
                await reply(response)
                break;
                
                case 'sbacaresep':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sbacaresep(query)
                await reply(response)
                break;
                
                case 'scarigc':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await scarigc(query)
                await reply(response)
                break;
                
                case 'scariresep':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await scariresep(query)
                await reply(response)
                break;
                
                case 'schara':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await schara(query)
                await reply(response)
                break;
                
                case 'scorona':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await scorona(query)
                await reply(response)
                break;
                
                case 'sdevianart':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sdevianart(query)
                await reply(response)
                break;
                
                case 'sdewabatch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sdewabatch(query)
                await reply(response)
                break;
                
                case 'sdrakor':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sdrakor(query)
                await reply(response)
                break;
                
                case 'sfacebook':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sfacebook(query)
                await reply(response)
                break;
                
                case 'sfilm':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sfilm(query)
                await reply(response)
                break;
                
                case 'sgempa':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sgempa(query)
                await reply(response)
                break;
                
                case 'sghfollower':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sghfollower(query)
                await reply(response)
                break;
                
                case 'sghfollowing':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sghfollowing(query)
                await reply(response)
                break;
                
                case 'sghuser':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sghuser(query)
                await reply(response)
                break;
                
                case 'sgoredl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sgoredl(query)
                await reply(response)
                break;
                
                case 'shappymod':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await shappymod(query)
                await reply(response)
                break;
                
                case 'shappymoddl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await shappymoddl(query)
                await reply(response)
                break;
                
                case 'sigdl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sigdl(query)
                await reply(response)
                break;
                
                case 'sigdl2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sigdl2(query)
                await reply(response)
                break;
                
                case 'sigstalk':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sigstalk(query)
                await reply(response)
                break;
                
                case 'sigstory':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sigstory(query)
                await reply(response)
                break;
                
                case 'sjob':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sjob(query)
                await reply(response)
                break;
                
                case 'sjoox':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sjoox(query)
                await reply(response)
                break;
                
                case 'skiryu':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await skiryu(query)
                await reply(response)
                break;
                
                case 'skonachan':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await skonachan(query)
                await reply(response)
                break;
                
                case 'smanga':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await smanga(query)
                await reply(response)
                break;
                
                case 'smangatoon':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await smangatoon(query)
                await reply(response)
                break;
                
                case 'smediafire':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await smediafire(query)
                await reply(response)
                break;
                
                case 'smerdekanews':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await smerdekanews(query)
                await reply(response)
                break;
                
                case 'smetronews':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await smetronews(query)
                await reply(response)
                break;
                
                case 'spalingmurah':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spalingmurah(query)
                await reply(response)
                break;
                
                case 'spin':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spin(query)
                await reply(response)
                break;
                
                case 'spinterest2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await spinterest2(query)
                await reply(response)
                break;
                
                case 'squotes':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await squotes(query)
                await reply(response)
                break;
                
                case 'srandomgore':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await srandomgore(query)
                await reply(response)
                break;
                
                case 'srandomtt':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await srandomtt(query)
                await reply(response)
                break;
                
                case 'srexdl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await srexdl(query)
                await reply(response)
                break;
                
                case 'srexdldown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await srexdldown(query)
                await reply(response)
                break;
                
                case 'ssearchgore':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssearchgore(query)
                await reply(response)
                break;
                
                case 'ssfiledown':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssfiledown(query)
                await reply(response)
                break;
                
                case 'ssfilesearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssfilesearch(query)
                await reply(response)
                break;
                
                case 'ssoundcloud':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ssoundcloud(query)
                await reply(response)
                break;
                
                case 'sstickersearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await sstickersearch(query)
                await reply(response)
                break;
                
                case 'stextmakervid':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stextmakervid(query)
                await reply(response)
                break;
                
                case 'stiktok':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stiktok(query)
                await reply(response)
                break;
                
                case 'strendtwit':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await strendtwit(query)
                await reply(response)
                break;
                
                case 'stwitter':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await stwitter(query)
                await reply(response)
                break;
                
                case 'swallpapercave':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await swallpapercave(query)
                await reply(response)
                break;
                
                case 'swallpapercraft':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await swallpapercraft(query)
                await reply(response)
                break;
                
                case 'swallpaperhd':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await swallpaperhd(query)
                await reply(response)
                break;
                
                case 'swattpad':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await swattpad(query)
                await reply(response)
                break;
                
                case 'swebtoons':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await swebtoons(query)
                await reply(response)
                break;
                
                case 'swikisearch':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await swikisearch(query)
                await reply(response)
                break;
                
                case 'szerochan':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await szerochan(query)
                await reply(response)
                break;
                
                case 'szippydl':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await szippydl(query)
                await reply(response)
                break;
                
                case 'acaranow':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await AcaraNow(query)
                await reply(response)
                break;
                
                case 'bukalapak':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await BukaLapak(query)
                await reply(response)
                break;
                
                case 'hero':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await Hero(query)
                await reply(response)
                break;
                
                case 'jadwaltv':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await JadwalTV(query)
                await reply(response)
                break;
                
                case 'jadwal_sepakbola':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await Jadwal_Sepakbola(query)
                await reply(response)
                break;
                
                case 'kbbi':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await KBBI(query)
                await reply(response)
                break;
                
                case 'kodepos':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await KodePos(query)
                await reply(response)
                break;
                
                case 'linkwa':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await LinkWa(query)
                await reply(response)
                break;
                
                case 'lirik2':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await Lirik2(query)
                await reply(response)
                break;
                
                case 'listhero':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await ListHero(query)
                await reply(response)
                break;
                
                case 'nomina':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await Nomina(query)
                await reply(response)
                break;
                
                case 'playstore':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await PlayStore(query)
                await reply(response)
                break;
                
                case 'ringtone':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await RingTone(query)
                await reply(response)
                break;
                
                case 'soundcloudes':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await SoundCloudeS(query)
                await reply(response)
                break;
                
                case 'steam':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await Steam(query)
                await reply(response)
                break;
                
                case 'steam_detail':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await Steam_Detail(query)
                await reply(response)
                break;
                
                case 'tixid':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await TixID(query)
                await reply(response)
                break;
                
                case 'wattpad':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await WattPad(query)
                await reply(response)
                break;
                
                case 'wikimedia':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await WikiMedia(query)
                await reply(response)
                break;
                
                case 'xpanas':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await XPanas(query)
                await reply(response)
                break;
                
                
                
            case '>':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await functionEval(query)
                await reply(response)
                break;

            case '$':
                if (args.length == 0) return await reply(`Example: ${prefix + command} Hello!`);
                response = await functionExec(query)
                await reply(response)
                break;

            case 'test':
                test = await bot.telegram.getChatMembersCount(lol.message.chat.id);
                console.log(test);
                break;

case 'poll':
                let a = query.split("|").slice(1);

if (!a[1]) throw "Format\n/halo |ya|gak";
if (a[12]) throw "Kebanyakan pilihan, Format\n/halo |ya|gak";
if (new Set(a).size !== a.length) throw "Ada kesamaan isi dalam pesan!";

let cap = "*Polling Request By* " + user.full_name + "\n*Pesan:* " + query.split("|")[0];
let options = a;
    await bot.telegram.sendPoll(lol.message.chat.id, cap, JSON.stringify(options))
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