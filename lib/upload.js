import fetch from "node-fetch";
import crypto from "crypto";
import {
    FormData,
    Blob
} from "formdata-node";
import {
    fileTypeFromBuffer
} from "file-type";
import cheerio from "cheerio";
import axios from "axios";
const referer = "https://krakenfiles.com";
const uloadUrlRegexStr = /url: "([^"]+)"/;

async function catbox(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('reqtype', 'fileupload');
        formData.append('fileToUpload', blob, randomBytes + '.' + ext);

        const response = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        return await response.text();
    } catch (e) {
        throw e;
    }
};

async function uploadToDiscdn(content) {
    try {

        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        formData.append('files[0]', blob, crypto.randomBytes(5).toString("hex") + '.' + ext);

        const res = await (
            await fetch("https://discord.com/api/v9/channels/1180731738176094228/messages", {
                method: "POST",
                headers: {
                    Authorization: "Bot MTE4MDcyODk4MjAzNjA0MTczOA.GtqzcS.grSeXjgylvsY_e7YxYi4acHKIrYTabaOnubOx8"
                },
                body: formData,
            })
        ).json()
        return res.attachments[0].url;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

async function fexnet(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('filename', randomBytes + '.' + ext);
        formData.append('file', blob, randomBytes + '.' + ext);

        const response = await fetch("https://fexnet.zendesk.com/api/v2/uploads.json", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                Authorization: `Basic ${btoa("as@fexnet.com/token:1RQO68P13pmqFXorJUKp4P")}`
            },
        });

        return (await response.json()).upload.attachment.content_url;
    } catch (e) {
        throw e;
    }
};

async function fileio(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);

        const response = await fetch("https://file.io", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
            },
        });

        return (await response.json()).link;
    } catch (e) {
        throw e;
    }
};

async function gofile(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);
        const getServer = await (await fetch("https://api.gofile.io/getServer", {
            method: "GET"
        })).json();
        const response = await fetch("https://" + getServer.data.server + ".gofile.io/uploadFile", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        return (await response.json()).data.downloadPage;
    } catch (e) {
        throw e;
    }
};

async function hostfile(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);

        const response = await fetch("https://hostfile.my.id/api/upload", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
            },
        });

        const base64Data = await response.text();
        return (JSON.parse(base64Data)).url;
    } catch (e) {
        throw e;
    }
};

async function uploadToKraken(content) {
    try {
        const {
            data
        } = await axios.get(referer);
        const uploadUrl = data.match(uloadUrlRegexStr)?.[1];

        if (!uploadUrl) {
            throw new Error('No regex match.');
        }
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        formData.append('files[]', blob, crypto.randomBytes(5).toString("hex") + '.' + ext);

        const response = await axios.post(uploadUrl, formData, {
            headers: {
                Referer: referer,
                'Content-Type': 'multipart/form-data'
            }
        });

        const {
            files
        } = response.data;
        const file = files[0];
        return referer + file.url;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

async function nullbyte(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);

        const response = await fetch("http://0x0.st", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        return await response.text();
    } catch (e) {
        throw e;
    }
};

async function pixeldrain(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('anonymous', 'False');
        formData.append('file', blob, randomBytes + '.' + ext);

        const response = await fetch("https://pixeldrain.com/api/file", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        const {
            id
        } = await response.json();
        return "https://pixeldrain.com/api/file/" + id
    } catch (e) {
        throw e;
    }
};

async function uploadPomf2(buffer) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(buffer) || {};
        let form = new FormData();
        const blob = new Blob([buffer], {
            type: mime
        });
        form.append('files[]', blob, 'tmp.' + ext);
        let res = await fetch('https://pomf2.lain.la/upload.php', {
            method: 'POST',
            body: form
        });
        let json = await res.json();
        if (!json.success) throw json;
        return json.files[0].url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function tmpfiles(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);
        const response = await fetch("https://tmpfiles.org/api/v1/upload", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        return (await response.json()).data.url;
    } catch (e) {
        throw e;
    }
};

async function top4top(buffer) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(buffer) || {};
        let form = new FormData();
        const blob = new Blob([buffer], {
            type: mime
        });
        form.append('file_1_', blob, 'tmp.' + ext);
        form.append("submitr", "[ رفع الملفات ]");
        let res = await fetch('https://www.top4top.me/#uploader', {
            method: 'POST',
            body: form
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        const data = $('.list-group-item').map((index, element) => ({
            upBoxTitle: $(element).find('.up-box-title').text().trim(),
            imgSrc: $(element).find('img').attr('src'),
            imgURL: $(element).find('#image1').val(),
            imgBBC: $(element).find('#imageBBC').val(),
            imgHTML: $(element).find('#imageHTML').val(),
            delCode: $(element).find('#imagedelCode').val(),
        })).get();
        let {
            upBoxTitle,
            imgSrc,
            imgURL,
            imgBBC,
            imgHTML,
            delCode
        } = data[0];
        return imgURL || imgSrc;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function transfersh(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);

        const response = await fetch("https://transfer.sh/", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        return await response.text();
    } catch (e) {
        throw e;
    }
};

async function ucarecdn(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);
        formData.append('UPLOADCARE_PUB_KEY', 'demopublickey');
        formData.append('UPLOADCARE_STORE', '1');
        const response = await fetch("https://upload.uploadcare.com/base/", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        const {
            file
        } = await response.json();
        return "https://ucarecdn.com/" + file + "/" + randomBytes + "." + ext
    } catch (e) {
        throw e;
    }
};

async function filebin(content) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const blob = new Blob([content], {
            type: mime
        });
        const formData = new FormData();
        const randomBytes = crypto.randomBytes(5).toString("hex");
        const binId = crypto.randomBytes(8).toString("hex");
        formData.append('file', blob, randomBytes + '.' + ext);

        const uploadURL = "https://filebin.net/" + binId + "/" + randomBytes + '.' + ext;
        const response = await fetch(uploadURL, {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
            },
        });

        const output = await response.json();
        return "https://filebin.net/" + output.bin.id + "/" + output.file.filename;
    } catch (e) {
        throw e;
    }
};

export {
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
};