import axios from "axios";
import {
    fetch
} from "undici"
import crypto from "crypto";
import cheerio from "cheerio";
import {
    FormData
} from 'formdata-node';

// Function
function generateRandomUserAgent() {
    const androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0'];
    const deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5'];
    const buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003'];
    const selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)];
    const selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)];
    const chromeVersion = 'Chrome/' + (Math.floor(Math.random() * 80) + 1) + '.' + (Math.floor(Math.random() * 999) + 1) + '.' + (Math.floor(Math.random() * 9999) + 1);
    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;
    return userAgent;
}

function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

async function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function chatgbtgetInfo() {
    const url = 'https://chatgbt.one';

    try {
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        return chatData;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

async function getUserId() {
    try {
        const html = await (await fetch("https://chat.chatgptdemo.net")).text();
        return cheerio.load(html)("#USERID").text().trim();
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1);
    const [month, day, year, hours, minutes, seconds, ampm] = [
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getHours() >= 12 ? "PM" : "AM",
    ];
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

async function chatgpttgetInfo() {
    const url = 'https://chatgptt.me';

    try {
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        return chatData;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function convertNewline(output) {
    const convertedOutput = output.replace(/\\n/g, '\n');
    return convertedOutput;
}

// Export Function
export async function aichatonline(q) {
    try {
        const {
            data
        } = await axios(
            `https://aichatonline.org/wp-json/mwai-ui/v1/chats/submit`, {
                method: "post",
                data: {
                    botId: "default",
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json",
                },
            }
        );
        return data.reply;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}

export async function openaiazure(input) {
    try {
        const messages = [{
            role: 'system',
            content: 'Anda adalah asisten yang membantu.'
        }, {
            role: 'user',
            content: input
        }];
        const response = await fetch('https://oai-4.openai.azure.com/openai/deployments/complete-4/chat/completions?api-version=2023-07-01-preview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': '2e6532692d764b48b5454f0f4abf8c81'
            },
            body: JSON.stringify({
                messages
            }),
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function chatgptbestim(type, message) {
    try {
        const headers = {
            'User-Agent': generateRandomUserAgent(),
            'Referer': 'https://chatgpt.bestim.org/chat/',
            'X-Forwarded-For': generateRandomIP(),
        };

        const data = {
            temperature: 1,
            frequency_penalty: 0,
            type: type,
            messagesHistory: [{
                    from: 'chatGPT',
                    content: 'You are a helpful assistant.'
                },
                {
                    from: 'you',
                    content: message
                },
            ],
            message: message,
        };

        const response = await axios.post('https://chatgpt.bestim.org/chat/send2/', data, {
            headers
        });

        let result = response.data;
        let str = ""
        let anu = result.split('data: ').slice(1).map(x => (str += x.replace(/\n/g, '')))
        return str.replace(/\\n/g, '\n')

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

export async function c3a0chat(content) {

    const url = 'https://c3.a0.chat/v1/chat/gpt/';
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3',
        'Referer': 'https://c3.a0.chat/#/web/chat'
    };

    const requestData = {
        list: [{
            content: content,
            role: "user",
            nickname: "Next",
            time: "2023-9-19 14:30:08",
            isMe: true,
            index: 0
        }],
        id: 1695108574472,
        title: "gptc3 kawaii asistant",
        time: "2023-9-19 14:29:34",
        prompt: "",
        models: 0,
        temperature: 0,
        continuous: true
    };

    try {
        const response = await axios.post(url, requestData, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function cgptonline(msg) {
    try {
        const userId = await uuidv4();
        const formData = new FormData();
        formData.append('msg', msg);
        formData.append('user_id', userId);

        const result = await (await fetch('https://try.cgptonline.tech/send-message.php', {
            method: 'POST',
            body: formData
        })).json();

        const inputString = await (await fetch(`https://try.cgptonline.tech/index.php?chat_history_id=${result.id}&id=${await uuidv4()}`)).text();

        return inputString
            .split('\n\n')
            .filter(data => data.includes('data: {"id":"chatcmpl'))
            .map(data => {
                try {
                    return JSON.parse(data.match(/{.*}/)?.[0]);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null;
                }
            })
            .filter(Boolean)
            .map(data => data.choices[0].delta.content)
            .join('');
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function chatg(q) {
    try {
        const {
            data
        } = await axios(
            `https://chatg.io/wp-json/mwai-ui/v1/chats/submit`, {
                method: "post",
                data: {
                    botId: "default",
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json",
                },
            }
        );
        return data.reply;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}

export async function chatgbtaudio(audioBuffer) {
    try {
        const info = await chatgbtgetInfo();
        const data = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], {
            type: 'audio/mpeg'
        });
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('audio', blob, 'wpaicg-chat-recording.wav');
        const response = await fetch('https://chatgbt.one/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return (await response.json()).data
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

export async function chatgbt(message) {
    try {
        const info = await chatgbtgetInfo();
        const data = new FormData();
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('message', message);
        const response = await fetch('https://chatgbt.one/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return (await response.json()).data
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

export async function shanti(query, type) {
    try {
        const response = await fetch(`https://shanti.quest/${type}?prompt=${query}`);
        if (!response.ok) throw new Error('Network response was not OK');
        return await response.text();
    } catch (error) {
        console.error('Error:', error.message);
    }
}


export async function hfgpt2(query) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    inputs: query
                }),
            }
        );
        return (await response.json())[0].generated_text;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export async function openaiapi2d(message) {
    const apiUrl = 'https://openai.api2d.net/v1/chat/completions'
    const headers = {
        Authorization: 'Bearer fk186009-gCYVPTkf6aMycD4o2ZM9fRsDwp52ONdz|ck43-632713d', // <-- Replace fkxxxxx with your own Forward Key, make sure to keep 'Bearer ' and have a space in between.
        'Content-Type': 'application/json',
    }

    const payload = {
        messages: [{
            content: message,
            role: 'user'
        }],
        model: 'gpt-3.5-turbo',
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return undefined;
    }
}

export async function chatgptai(q) {
    try {
        const {
            data
        } = await axios(
            `https://chatgpt.ai/wp-json/mwai-ui/v1/chats/submit`, {
                method: "post",
                data: {
                    botId: "default",
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json",
                },
            }
        );
        return data.reply;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}

const url_api_new_chat = "https://chat.chatgptdemo.net/new_chat";
const url_api_stream = "https://chat.chatgptdemo.net/chat_api_stream";

export async function chatgptdemo(userId) {
    try {
        const {
            id_
        } = await (await fetch(url_api_new_chat, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId
            }),
        })).json();

        return id_;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function gptdemostream(chatId, question) {
    try {
        const response = await fetch(url_api_stream, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question,
                chat_id: chatId,
                timestamp: formatTimestamp(new Date())
            }),
        });

        const result = await response.text();
        return result
            .split('\n\n')
            .filter(data => data.includes('data: {"id":"chatcmpl'))
            .map(data => {
                try {
                    return JSON.parse(data.match(/{.*}/)?.[0]);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null;
                }
            })
            .filter(Boolean)
            .map(data => data.choices[0].delta.content)
            .join('');
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function chatgpttaudio(audioBuffer) {
    try {
        const info = await chatgpttgetInfo();
        const data = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], {
            type: 'audio/mpeg'
        });
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('audio', blob, 'wpaicg-chat-recording.wav');
        const response = await fetch('https://chatgptt.me/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return (await response.json()).data;
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

export async function chatgptt(message) {
    try {
        const info = await chatgpttgetInfo();
        const data = new FormData();
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('message', message);
        const response = await fetch('https://chatgptt.me/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return (await response.json()).data;
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

export async function gptchatly(content) {
    const url = 'https://gptchatly.com/fetch-response';
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3',
        'Referer': 'https://gptchatly.com/',
        'X-Forwarded-For': generateRandomIP(),
    };

    const requestData = {
        past_conversations: [{
                role: 'system',
                content: 'You are a helpful assistant.'
            },
            {
                role: 'user',
                content
            },
        ]
    };
    try {
        const response = await axios.post(url, requestData, {
            headers
        });
        return response.data.chatGPTResponse;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function docsbot(messages) {
    try {
        const response = await fetch(
            "https://api.docsbot.ai/teams/AQlopPkXnxW7eKsGqeSe/bots/lnPRMgAXQgaYl0JG0uXj/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: messages,
                    full_source: true,
                    format: "text",
                    history: [],
                })
            }
        );

        const Response = await response.text();
        return Response.answer;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function aidutu(your_qus) {
    try {
        let _iam = generateRandomString(8);
        let ops = {};

        const response1 = await fetch("https://chat.aidutu.cn/api/cg/chatgpt/user/info?v=1.5", {
            method: "POST",
            headers: {
                "accept": "*/*",
                "referrer": "https://chat.aidutu.cn/",
                "x-iam": _iam,
                "Cookie": `_UHAO={"uid":"160941","school":"","time":1681704243,"ts":"2","name":"chat_q2Ac","head":"\/res\/head\/2ciyuan\/24.jpg","term":"201801","sign":"714653d141dac0e7709f31003b8df858"}; _UIP=0e98d94e599ef74c29fb40cb35971810`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                q: your_qus,
                iam: _iam,
            }),
        });

        const data = await response1.json();
        const xtoken = data.data.token;
        const response2 = await fetch("https://chat.aidutu.cn/api/chat-process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://chat.aidutu.cn/",
                "Cookie": `_UHAO={"uid":"160941","school":"","time":1681704243,"ts":"2","name":"chat_q2Ac","head":"\/res\/head\/2ciyuan\/24.jpg","term":"201801","sign":"714653d141dac0e7709f31003b8df858"}; _UIP=0e98d94e599ef74c29fb40cb35971810`,
                "accept": "application.json, text/plain, */*",
                "x-token": xtoken,
            },
            body: JSON.stringify({
                prompt: your_qus,
                temperature: 0.8,
                top_p: 1,
                options: ops,
                systemMessage: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
            }),
        });

        const data2 = await response2.text();
        const jsonArray = JSON.parse(`[${data2.split('\n')}]`);
        const lastJsonObject = jsonArray[jsonArray.length - 1];
        return lastJsonObject.text;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function lovebaby(your_qus) {
    const baseURL = "https://fasdsgdfsg97986agagyk656.lovebaby.today/";
    const messageChain8 = [{
        role: "user",
        content: your_qus
    }];

    try {
        const response = await fetch(baseURL + "api/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/event-stream",
                "origin": "https://fasdsgdfsg97986agagyk656.lovebaby.today/",
                "Referer": baseURL
            },
            body: JSON.stringify({
                messages: messageChain8,
                stream: true,
                model: "gpt-3.5-turbo",
                temperature: 0.5,
                presence_penalty: 0
            })
        });

        // Handle the response data here
        const inputString = await response.text();
        const regex = /"content":"([^"]*)"/g;
        let match;
        let result = "";

        while ((match = regex.exec(inputString))) {
            result += match[1];
        }

        return result.replace(/\\n/g, '\n');

    } catch (error) {
        // Handle any errors here
        console.error(error);
    }
}

export async function binjie(q) {
    try {
        const BinjieBaseURL = "https://api.binjie.fun/api/generateStream";
        const response = await axios.post(BinjieBaseURL, {
            prompt: q,
            system: "Hello!",
            withoutContext: true,
            stream: false
        }, {
            headers: {
                origin: "https://chat.jinshutuan.com",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36"
            }
        });
        return response.data;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}

export async function lemurchat(your_qus) {
    try {
        let baseURL = "http://lemurchat.anfans.cn";

        const requestData = `{"messages":"[{\\"content\\":\\"\\",\\"id\\":\\"LEMUR_AI_SYSTEM_SETTING\\",\\"isSensitive\\":false,\\"needCheck\\":false,\\"role\\":\\"system\\"},{\\"content\\":\\"${your_qus}\\",\\"isSensitive\\":false,\\"needCheck\\":true,\\"role\\":\\"user\\"}]"}`

        const response = await fetch(baseURL + "/api/chat/conversation-trial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 4 Prime) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
            },
            body: (requestData),
            responseType: "stream"
        });

        const res = await response.text();
        const sp = res.replace(/id: \d+\ndata: '/, '\n')
        const data = sp.split('\n')
        var filteredData = data.filter(item => item.startsWith('data:'));
        const dataArray = filteredData.map(item => JSON.parse(item.replace(/^data: /, '')));
        var input = dataArray.map(v => v.data).join('')

        const regex = /"content":"(.*?)"/g;
        const contents = [];
        let match;

        while ((match = regex.exec(input)) !== null) {
            contents.push(match[1]);
        }

        return (contents.join('').replace(/\\n/g, '\n'));
    } catch (error) {
        throw new Error('Error:', error.message);
    }

}

export async function gptgo(q) {
    try {
        const formdata = new FormData();
        formdata.append("ask", q.toString());
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-language": "en-EN",
            "Origin": "https://gptgo.ai",
            "Referer": "https://gptgo.ai/",
            "sec-ch-ua": '"Google Chrome";v="116", "Chromium";v="116", "Not?A_Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        };
        const requestOptions = {
            method: "POST",
            headers,
            body: formdata,
            redirect: "follow",
        };

        const response = await fetch("https://gptgo.ai/get_token.php", requestOptions)
        const result = await response.text()
        const modifiedString = result.slice(0xa, -0x14);
        const token = atob(modifiedString);
        const response2 = await fetch(`https://api.gptgo.ai/web.php?array_chat=${token}`, requestOptions)
        const decodedData = await response2.text()
        const resultChat = decodedData
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.replace('data: ', ''))
            .slice(0, -2)
            .map(item => JSON.parse(item))
            .map(v => v.choices[0].delta.content)
            .join('');
        return resultChat;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

export async function gptphotos(captionInput) {
    const data = {
        captionInput,
        captionModel: "default"
    };

    const url = 'https://chat-gpt.photos/api/generateImage';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result.imgs;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function gptpictures(captionInput) {
    const data = {
        captionInput,
        captionModel: "default"
    };

    const url = 'https://chat-gpt.pictures/api/generateImage';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result.imgs;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function vocai(prompt) {
    const url = "https://apps.voc.ai/api/v1/plg/prompt_stream";

    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            }),
        });

        const inputString = await response.text();
        const dataArray = inputString.split('\n\n');

        const regex = /data: (\{.*?\})/g;
        const jsonMatches = [];
        let match;

        while ((match = regex.exec(dataArray[0])) !== null) {
            jsonMatches.push(match[1]);
        }

        const oregex = /"data": ({.*?})/;
        const endsTrueArray = jsonMatches.slice(-1);
        const output = endsTrueArray[0].match(oregex);

        return output ? JSON.parse(output[1]) : null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export async function chatbotji1z(text) {
    try {
        const messages = [{
                role: 'system',
                content: 'Kamu adalah asisten AI yang siap membantu segala hal.'
            },
            {
                role: 'user',
                content: text
            },
        ];
        const response = await fetch("https://chatbot-ji1z.onrender.com/chatbot-ji1z", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages
            }),
        });

        const data = await response.json();
        return data.choices[0].message.conten;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function onlinegpt(q) {
    try {
        const {
            data
        } = await axios(
            `https://onlinegpt.org/wp-json/mwai-ui/v1/chats/submit`, {
                method: "post",
                data: {
                    botId: "default",
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json",
                },
            }
        );
        return data.reply;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}

export async function geekgpt(query) {
    try {
        const messages = [{
                role: 'system',
                content: 'You are a helpful assistant.'
            },
            {
                role: 'user',
                content: query
            },
        ];
        const json_data = {
            messages: messages,
            model: "gpt-3.5-turbo",
            temperature: 0.9,
            presence_penalty: 0,
            top_p: 1,
            frequency_penalty: 0,
            stream: true,
        };

        const data = JSON.stringify(json_data);

        const headers = {
            'authority': 'ai.fakeopen.com',
            'accept': '*/*',
            'accept-language': 'en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3',
            'authorization': 'Bearer pk-this-is-a-real-free-pool-token-for-everyone',
            'content-type': 'application/json',
            'origin': 'https://chat.geekgpt.org',
            'referer': 'https://chat.geekgpt.org/',
            'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        };

        const response = await fetch("https://ai.fakeopen.com/v1/chat/completions", {
            method: 'POST',
            headers: headers,
            body: data,
        });


        const result = (await response.text())
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.replace('data: ', ''))
            .slice(0, -2)
            .map(item => JSON.parse(item))
            .map(v => v.choices[0].delta.content)
            .join('');

        return result;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function reveseryai(your_qus) {
    try {
        const response = await fetch("https://tools.revesery.com/ai/ai.php?query=" + encodeURIComponent(your_qus), {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36"
            }
        });

        const data = await response.json();
        return data.result;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}

export async function wewordle(prompt) {
    try {
        const data = {
            user: crypto.randomBytes(8).toString('hex'),
            messages: [{
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: "Kamu adalah asisten AI yang siap membantu segala hal!"
                }
            ],
            subscriber: {
                originalAppUserId: `$RCAnonymousID:${crypto.randomBytes(16).toString('hex')}`,
                requestDate: new Date().toISOString(),
                firstSeen: new Date().toISOString(),
            }
        };

        const response = await fetch("https://wewordle.org/gptapi/v1/web/turbo", {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'pragma': 'no-cache',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                "user-agent": generateRandomUserAgent(),
                "x-forwarded-for": generateRandomIP()
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result.message.content;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export async function cveoy(you_qus) {
    let baseURL = "https://free-api.cveoy.top/";
    try {
        const response = await fetch(baseURL + "v3/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "origin": "https://ai1.chagpt.fun",
                "Referer": baseURL
            },
            body: JSON.stringify({
                prompt: you_qus
            })
        });

        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function gptzw7(content) {
    const url = 'http://5awm.gpt.zw7.lol/chat.php';

    const data = {
        id: '3.5',
        web: '1',
        key: '',
        role: '',
        title: [{
                role: 'user',
                content: content
            },
            {
                role: 'assistant',
                content: 'You are a helpful assistant.'
            }
        ],
        text: content,
        stream: '0'
    };
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3',
                'Referer': 'http://5awm.gpt.zw7.lol/',
                'X-Forwarded-For': generateRandomIP(),
            }
        });
        let outs = response.data;
        return decodeURIComponent(outs.data.html);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}