import {
    Telegraf
} from 'telegraf';
import fs from 'fs';
import axios from 'axios';

const {
    bot_token
} = JSON.parse(fs.readFileSync('./config.json'));
const bots = new Telegraf(bot_token);

function getArgs(ctx) {
    try {
        const args = ctx.message.text.split(' ').slice(1);
        return args;
    } catch {
        return [];
    }
};

function getUser(ctx) {
    try {
        const user = ctx;
        const {
            last_name,
            first_name
        } = user;
        const full_name = `${first_name} ${last_name || ''}`.trim();
        user.full_name = full_name;
        return user;
    } catch (e) {
        throw e;
    }
};

function getBot(ctx) {
    try {
        const bot = ctx.botInfo;
        const {
            last_name,
            first_name
        } = bot;
        const full_name = `${first_name} ${last_name || ''}`.trim();
        bot.full_name = full_name;
        return bot;
    } catch {
        return {};
    }
};

async function getLink(file_id) {
    try {
        const link = (await bots.telegram.getFileLink(file_id)).href;
        return link;
        console.log('getLink:\n' + link);
    } catch {
        throw 'Error while getting URL';
    }
};

async function getPhotoProfile(id) {
    try {
        const url_default = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

        if (String(id).startsWith('-100')) {
            const chatInfo = await bots.telegram.getChat(id);
            if (!chatInfo.hasOwnProperty('photo')) return url_default;
            const file_id = chatInfo.photo.big_file_id;
            return await getLink(file_id);
        } else {
            const userProfile = await bots.telegram.getUserProfilePhotos(id);
            if (userProfile.total_count === 0) return url_default;
            const file_id = userProfile.photos[0][2].file_id;
            return await getLink(file_id);
        }
    } catch (e) {
        throw e;
    }
};

async function doRequest(method, payload) {
    const token = bot_token;
    const url = `https://api.telegram.org/bot${token}/${method}`;

    try {
        const response = await axios.post(url, payload);
        if (!response.data.ok) throw response.data.description;
        return response;
        console.log(response)
    } catch (error) {
        throw error;
    }
}

async function downloadFile(fileId) {
    try {
        const response = await doRequest('getFile', {
            file_id: fileId
        });
        const file = response.data.result;
        const token = bot_token;
        const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

        const res = await axios.get(url, {
            responseType: 'stream'
        });
        const stream = res.data;

        return {
            file,
            stream
        };
        console.log({
            file,
            stream
        });
    } catch (error) {
        throw error;
    }
}

export default {
    getArgs,
    getUser,
    getBot,
    getLink,
    getPhotoProfile,
    doRequest,
    downloadFile
};