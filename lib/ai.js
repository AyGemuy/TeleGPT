import { fetch } from 'undici';
import {
    FormData,
    Blob
} from 'formdata-node';
import {
    fileTypeFromBuffer
} from 'file-type';
import crypto from "crypto"
const userId = crypto.randomUUID()
import {
    v4 as uuidv4
} from 'uuid';
import axios from 'axios';
import fakeUserAgent from 'fake-useragent';

const BING_URL = "https://www.bing.com";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateRandomIP = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const generateRandomUserAgent = () => {
    const androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0'];
    const deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5'];
    const buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003'];
    const selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)];
    const selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)];
    const chromeVersion = `Chrome/${Math.floor(Math.random() * 80) + 1}.${Math.floor(Math.random() * 999) + 1}.${Math.floor(Math.random() * 9999) + 1}`;
    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;
    return userAgent;
};

const getValidIPv4 = (ip) => {
    const match = !ip || ip.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);
    if (match) {
        if (match[5]) {
            const mask = parseInt(match[5], 10);
            let [a, b, c, d] = ip.split('.').map(x => parseInt(x, 10));
            const max = (1 << (32 - mask)) - 1;
            const rand = Math.floor(Math.random() * max);
            d += rand;
            c += Math.floor(d / 256);
            d %= 256;
            b += Math.floor(c / 256);
            c %= 256;
            a += Math.floor(b / 256);
            b %= 256;
            return `${a}.${b}.${c}.${d}`;
        }
        return ip;
    }
    return undefined;
};

 class BingImageCreator {
    static HEADERS = {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        referrer: "https://www.bing.com/images/create/",
        origin: "https://www.bing.com",
        "user-agent": fakeUserAgent() || generateRandomUserAgent(),
        "x-forwarded-for": getValidIPv4(generateRandomIP()) || generateRandomIP()
    };

    constructor({ cookie }) {
        this._cookie = `_U=${cookie}`;

        if (!this._cookie) {
            throw new Error("Bing cookie is required");
        }
    }

    async fetchRedirectUrl(url, formData) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                cookie: this._cookie,
                ...BingImageCreator.HEADERS,
            },
            body: formData,
            redirect: "manual",
        });

        if (response.ok) {
            throw new Error("Request failed");
        } else {
            const redirect_url = response.headers.get("location").replace("&nfy=1", "");
            const request_id = redirect_url.split("id=")[1];
            return {
                redirect_url,
                request_id,
            };
        }
    }

    async fetchResult(encodedPrompt, redirect_url, request_id) {
        console.log("redirect_url is ", redirect_url);
        console.log("request_id is ", request_id);
        const cookie = this._cookie;
        try {
            await fetch(`${BING_URL}${redirect_url}`, {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    cookie,
                    ...BingImageCreator.HEADERS,
                },
            });
        } catch (e) {
            throw new Error(`Request redirect_url failed" ${e.message}`);
        }

        const getResultUrl = `${BING_URL}/images/create/async/results/${request_id}?q=${encodedPrompt}`;
        const start_wait = Date.now();
        let result = "";
        while (true) {
            console.log("Waiting for result...");
            if (Date.now() - start_wait > 200000) {
                throw new Error("Timeout");
            }

            await sleep(1000);
            result = await this.getResults(getResultUrl);
            if (result) {
                break;
            }
        }
        return this.parseResult(result);
    }

    async getResults(getResultUrl) {
        const response = await fetch(getResultUrl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                cookie: this._cookie,
                ...BingImageCreator.HEADERS,
            },
        });
        if (response.status !== 200) {
            throw new Error("Bad status code");
        }
        const content = await response.text();
        if (!content || content.includes("errorMessage")) {
            return null;
        } else {
            return content;
        }
    }

    parseResult(result) {
        console.log("Parsing result...");
        const regex = /src="([^"]*)"/g;
        const matches = [...result.matchAll(regex)].map((match) => match[1]);
        const normal_image_links = matches.map((link) => link.split("?w=")[0]);
        const safe_image_links = normal_image_links.filter((link) => !/r.bing.com\/rp/i.test(link));
        safe_image_links.length !== normal_image_links.length && console.log("Detected & Removed bad images");
        const unique_image_links = [...new Set(safe_image_links)];
        if (unique_image_links.length === 0) {
            throw new Error("error_no_images");
        }
        return unique_image_links;
    }

    async fetchRedirectUrlWithRetry(url, formData, retries = 30) {
        for (let i = 0; i < retries; i++) {
            try {
                return await this.fetchRedirectUrl(url, formData);
            } catch (error) {
                console.log(`retry ${i + 1} time`);
                if (i === retries - 1) {
                    throw new Error(`Max retries reached: ${error.message}`);
                }
            }
        }
    }

    async fetchResultWithRetry(encodedPrompt, redirect_url, request_id, retries = 30) {
        for (let i = 0; i < retries; i++) {
            try {
                return await this.fetchResult(encodedPrompt, redirect_url, request_id);
            } catch (error) {
                console.log(`retry ${i + 1} time`);
                if (i === retries - 1) {
                    throw new Error(`Max retries reached: ${error.message}`);
                }
            }
        }
    }

    async getResultsWithRetry(getResultUrl, retries = 30) {
        for (let i = 0; i < retries; i++) {
            try {
                return await this.getResults(getResultUrl);
            } catch (error) {
                console.log(`retry ${i + 1} time`);
                if (i === retries - 1) {
                    throw new Error(`Max retries reached: ${error.message}`);
                }
            }
        }
    }

    async createImage(prompt) {
        const encodedPrompt = encodeURIComponent(prompt);
        let formData = new FormData();
        formData.append("q", encodedPrompt);
        formData.append("qa", "ds");
        console.log("Sending request...");
        const url = `${BING_URL}/images/create?q=${encodedPrompt}&rt=3&FORM=GENCRE`;

        try {
            const { redirect_url, request_id } = await this.fetchRedirectUrlWithRetry(url, formData);
            return this.fetchResultWithRetry(encodedPrompt, redirect_url, request_id);
        } catch (e) {
            console.log("retry 1 time");
            return this.fetchRedirectUrlWithRetry(url, formData)
                .then((res) => this.fetchResultWithRetry(encodedPrompt, res.redirect_url, res.request_id))
                .catch((e) => {
                    throw new Error(`${e.message}`);
                });
        }
    }
}

async function ChatGptBing(prompt) {
try {
    let response = await (await fetch("https://copilot.github1s.tk/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "dummy",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "Creative",
            "max_tokens": 100,
            "messages": [{
                    "role": "system",
                    "content": "You are an helpful assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        })
    })).json()
    return response.choices[0].message.content
    } catch (e) {
            throw new Error(`Request failed" ${e.message}`);
        }
}

class Aichat {
    constructor() {
        this.url = "https://chat-gpt.org/chat";
        this.working = true;
        this.supports_gpt_35_turbo = true;
    }

    static async createAsync(model, messages, proxy = null, kwargs) {
        const headers = {
            "authority": "chat-gpt.org",
            "accept": "*/*",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "origin": "https://chat-gpt.org",
            "pragma": "no-cache",
            "referer": "https://chat-gpt.org/chat",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        };

        const json_data = {
            "message": Aichat.formatPrompt(messages),
            "temperature": kwargs?.temperature || 0.5,
            "presence_penalty": 0,
            "top_p": kwargs?.top_p || 1,
            "frequency_penalty": 0,
        };

        const response = await fetch("https://chat-gpt.org/api/text", {
            method: "POST",
            headers,
            body: JSON.stringify(json_data),
            proxy: proxy,
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        if (!result.response) {
            throw new Error(`Error Response: ${JSON.stringify(result)}`);
        }

        return result.message;
    }

    static formatPrompt(messages) {
        // Implementasi dari formatPrompt() dalam Python
        // Anda perlu mengubah format pesan sesuai dengan kebutuhan Anda.
        // Contoh sederhana: return messages.join('\n');
        return JSON.stringify(messages);
    }
}

class Acytoo {
    static url = 'https://chat.acytoo.com';
    static working = true;
    static supports_gpt_35_turbo = true;

    static async * createAsyncGenerator(model, messages, proxy = null, kwargs) {
        const headers = _createHeader();

        const payload = _createPayload(messages, kwargs);

        const response = await fetch(this.url + '/api/completions', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
            proxy: proxy,
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        for await (const chunk of response.body) {
            if (chunk) {
                yield chunk.toString();
            }
        }
    }
}

function _createHeader() {
    return {
        'accept': '*/*',
        'content-type': 'application/json',
    };
}

function _createPayload(messages, {
    temperature = 0.5
} = {}) {
    return {
        'key': '',
        'model': 'gpt-3.5-turbo',
        'messages': messages,
        'temperature': temperature,
        'password': '',
    };
}


class Aivvm {
    static url = 'https://chat.aivvm.com';
    static supportsStream = true;
    static working = true;
    static supportsGpt35Turbo = true;
    static supportsGpt4 = true;

    static async * createAsyncGenerator(model, messages, stream = true, kwargs) {
    const models = {
    'gpt-3.5-turbo': {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5'
    },
    'gpt-3.5-turbo-0613': {
        id: 'gpt-3.5-turbo-0613',
        name: 'GPT-3.5-0613'
    },
    'gpt-3.5-turbo-16k': {
        id: 'gpt-3.5-turbo-16k',
        name: 'GPT-3.5-16K'
    },
    'gpt-3.5-turbo-16k-0613': {
        id: 'gpt-3.5-turbo-16k-0613',
        name: 'GPT-3.5-16K-0613'
    },
    'gpt-4': {
        id: 'gpt-4',
        name: 'GPT-4'
    },
    'gpt-4-0613': {
        id: 'gpt-4-0613',
        name: 'GPT-4-0613'
    },
    'gpt-4-32k': {
        id: 'gpt-4-32k',
        name: 'GPT-4-32K'
    },
    'gpt-4-32k-0613': {
        id: 'gpt-4-32k-0613',
        name: 'GPT-4-32K-0613'
    },
};

        if (!model) {
            model = 'gpt-3.5-turbo';
        } else if (!models[model]) {
            throw new Error(`Model are not supported: ${model}`);
        }

        const headers = {
            authority: 'chat.aivvm.com',
            accept: '*/*',
            'accept-language': 'en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3',
            'content-type': 'application/json',
            origin: 'https://chat.aivvm.com',
            referer: 'https://chat.aivvm.com/',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        };

        const json_data = {
            model: models[model],
            messages,
            key: '',
            prompt: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
            temperature: kwargs?.temperature || 0.7,
        };

        try {
            const response = await axios.post('https://chat.aivvm.com/api/chat', json_data, {
                headers,
                responseType: 'stream',
            });

            for await (const chunk of response.data) {
                yield chunk.toString('utf-8');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error for handling elsewhere, if needed.
        }
    }

    static get params() {
        const params = [
            'model: str',
            'messages: list[dict[str, str]]',
            'stream: bool',
            'temperature: float',
        ];
        const paramStr = params.join(', ');
        return `g4f.provider.${this.name} supports: (${paramStr})`;
    }
}

class CohereAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async start(modelName, messages) {
        const response = await fetch('https://api.cohere.ai/generate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
                'Cohere-Version': '2022-12-06',
            },
            body: JSON.stringify({
                model: modelName,
                prompt: buildPrompt(messages),
                return_likelihoods: 'NONE',
                max_tokens: 200,
                temperature: 0.9,
                top_p: 1,
            }),
        });

        const result = await response.json();
        const completion = result.generations[0].text.substring(0);
        return completion;
    }
}

// Sample buildPrompt function
function buildPrompt(messages) {
    return messages.join('\n');
}

/**
 * @typedef {Class} BardAI
 * @see {Hercai}
 * @param {Class} bardie
 * @example const { bardie } = require("bardie");
 * @example import { bardie } from "bardie";
 * @type {Class}
 * @class
 */
class Bardie {
  constructor() {}

  /**
   * The Question You Want to Ask Artificial Intelligence.
   * @param {Object} options Options for the question.
   * @param {string} options.ask - The Question You Want to Ask Artificial Intelligence.
   * @example const bard = new Bardie();
   * bard.question({ ask: "Who is Elon Musk?" });
   * @type {Promise<Object>} The response from the AI.
   */
  async question({ ask }) {
  const baseurl = "https://bard.rizzy.eu.org";
    if (!ask) {
      throw new Error("Please specify a question!");
    }
    try {
      const response = await axios.post(`${baseurl}/api/onstage`, { ask }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      throw new Error("Error: " + err.message);
    }
  }

  /**
   * The Question You Want to Ask Artificial Intelligence.
   * @param {Object} options Options for the question.
   * @param {string} options.ask - The Question You Want to Ask Artificial Intelligence.
   * @param {string} options.image - URL of the image.
   * @example const bard = new Bardie();
   * bard.questionWithImage({ ask: "What is in this image?", image: "https://telegra.ph/file/c34c149838ae6a1768897.jpg" });
   * @type {Promise<Object>} The response from the AI.
   */
  async questionWithImage({ ask, image }) {
  const baseurl = "https://bard.rizzy.eu.org";
    if (!ask) {
      throw new Error("Please specify a question!");
    }
    if (!image) {
      throw new Error("Please specify a URL for the image!");
    }
    try {
      const response = await axios.post(`${baseurl}/api/onstage/image`, { ask, image }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      throw new Error("Error: " + err.message);
    }
  }
}

const botika = async (value) => {
    const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const currentTime = new Date();
    const webhookUrl = 'https://webhook.botika.online/webhook/';
    const payload = {
        app: {
            id: "blaael9y3cu1684390361270",
            time: currentTime,
            data: {
                sender: {
                    id: randomId
                },
                message: [{
                    id: randomId,
                    time: currentTime,
                    type: "text",
                    value: value,
                }]
            }
        },
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8'
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        const webhookResponse = await response.json();

        if (webhookResponse) {
            const messages = webhookResponse.app.data.message;

            if (Array.isArray(messages)) {
                const responseMessages = messages.map((message) => message.value);
                const combinedResponse = responseMessages.join('\n\n').replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
                return combinedResponse;
            }
        } else {
            console.error('Webhook error:', webhookResponse.error);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

class ChatBase {
    static url = "https://www.chatbase.co";
    static supports_gpt_35_turbo = true;
    static supports_gpt_4 = true;
    static working = true;

    static async * createAsyncGenerator(model, messages, kwargs) {
        let chat_id = "";

        if (model === "gpt-4") {
            chat_id = "quran---tafseer-saadi-pdf-wbgknt7zn";
        } else if (model === "gpt-3.5-turbo" || !model) {
            chat_id = "chatbase--1--pdf-p680fxvnm";
        } else {
            throw new Error(`Model are not supported: ${model}`);
        }

        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-language": "en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3",
            "Origin": this.url,
            "Referer": this.url + "/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        };

        const data = {
            "messages": messages,
            "captchaCode": "hadsa",
            "chatId": chat_id,
            "conversationId": `kcXpqEnqUie3dnJlsRi_O-${chat_id}`
        };

        try {
            const response = await axios.post(`${this.url}/api/fe/chat`, data, {
                headers: headers
            });

            if (response.status !== 200) {
                throw new Error(`ChatBase request failed with status code: ${response.status}`);
            }

            const stream = response.data;
            yield stream;
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error for handling elsewhere, if needed.
        }
    }

}

/**
 * @typedef {Class} Hercai
 * @see {Hercai}
 * @param {Class} Hercai
 * @example const { Hercai } = require("hercai");
 * @example import { Hercai } from "hercai";
 * @type {Class}
 * @class
 */
class Hercai {
    constructor() {}

    /**
     * The Question You Want to Ask Artificial Intelligence.
     * @param {string} model "v2"
     * @param {string} model "beta"
     * @param {string} model "v3-beta" (GPT-4)
     * @param {string} content The Question You Want to Ask Artificial Intelligence.
     * @example client.question({model:"v2",content:"how are you?"})
     * @type {string} The Question You Want to Ask Artificial Intelligence.
     * @returns {Hercai}
     * @async
     */
    async question({
        model = "v2",
        content
    }) {
        if (!["v2", "beta", "v3-beta"].some(ind => model == ind)) model = "v2";
        if (!content || content == undefined || content == null) throw new Error("Please specify a question!");
        try {
            var api = await axios.get(`https://hercai.onrender.com/${model}/hercai?question=` + encodeURI(content), {
                headers: {
                    "content-type": "application/json",
                },
            })
            return api.data;
        } catch (err) {
            throw new Error("Error: " + err.message)
        }
    }

    /**
     * Tell Artificial Intelligence What You Want to Draw.
     * @param {string} model "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia"
     * @param {string} prompt Tell Artificial Intelligence What You Want to Draw.
     * @example client.drawImage({model:"v1",prompt:"anime girl"})
     * @type {string} Tell Artificial Intelligence What You Want to Draw.
     * @returns {Hercai}
     * @async
     */
    async drawImage({
        model = "v1",
        prompt
    }) {
        if (!["v1", "v2", "v2-beta", "v3", "lexica", "prodia"].some(ind => model == ind)) model = "prodia";
        if (!prompt || prompt == undefined || prompt == null) throw new Error("Please specify a prompt!");
        try {
            var api = await axios.get(`https://hercai.onrender.com/${model}/text2image` + "?prompt=" + encodeURI(prompt), {
                headers: {
                    "content-type": "application/json",
                },
            })
            return api.data;
        } catch (err) {
            throw new Error("Error: " + err.message)
        }
    }
}



class Liaobots {
    constructor() {
        this.url = "https://liaobots.com";
        this.working = false;
        this.supports_gpt_35_turbo = true;
        this.supports_gpt_4 = true;
        this._auth_code = null;
    }

    async * createAsyncGenerator(
        model,
        messages,
        auth = null,
        proxy = null,
        ...kwargs
    ) {
    const models = {
    "gpt-4": {
        "id": "gpt-4",
        "name": "GPT-4",
        "maxLength": 24000,
        "tokenLimit": 8000,
    },
    "gpt-3.5-turbo": {
        "id": "gpt-3.5-turbo",
        "name": "GPT-3.5",
        "maxLength": 12000,
        "tokenLimit": 4000,
    },
    "gpt-3.5-turbo-16k": {
        "id": "gpt-3.5-turbo-16k",
        "name": "GPT-3.5-16k",
        "maxLength": 48000,
        "tokenLimit": 16000,
    },
};
        model = model in models ? model : "gpt-3.5-turbo";
        const headers = {
            "authority": "liaobots.com",
            "content-type": "application/json",
            "origin": this.url,
            "referer": this.url + "/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        };

        let auth_code = auth !== null ? auth : this._auth_code;

        if (!auth_code) {
            try {
                const response = await axios.post(this.url + "/api/user", {
                    authcode: ""
                }, {
                    proxy
                });
                auth_code = this._auth_code = response.data.authCode;
            } catch (error) {
                throw error;
            }
        }

        const data = {
            conversationId: uuidv4(),
            model: models[model],
            messages,
            key: "",
            prompt: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully.",
        };

        try {
            const response = await axios.post(this.url + "/api/chat", data, {
                proxy,
                headers: {
                    "x-auth-code": auth_code
                }
            });

            yield* response.data;
        } catch (error) {
            throw error;
        }
    }

    get params() {
        const params = [
            ["model", "str"],
            ["messages", "list[dict[str, str]]"],
            ["stream", "bool"],
            ["proxy", "str"],
            ["auth", "str"],
        ];
        const param = params.map(p => p.join(": ")).join(", ");
        return `g4f.provider.${this.constructor.name} supports: (${param})`;
    }
}

async function blackboximg(imageBuffer, input) {
    try {
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(imageBuffer) || {};
        if (!ext || !mime) {
            return null;
        }
        let form = new FormData();
        const blob = new Blob([imageBuffer.toArrayBuffer()], {
            type: mime
        });
        form.append('image', blob, 'image.' + ext);
        form.append('fileName', 'image.' + ext);
        form.append('userId', userId);

        const response = await fetch("https://www.blackbox.ai/api/upload", {
            method: 'POST',
            body: form,
        });

        const data = await response.json();
        const messages = [{
            role: "user",
            content: data.response + "\n#\n" + input
        }, {
            role: "assistant",
            content: "Hello!"
        }];
        const response2 = await fetch("https://www.blackbox.ai/api/chat", {
            method: "POST",
            body: JSON.stringify({
                messages,
                id: null,
                mode: "continue",
                userId: userId
            }),
        });
        return await response2.text();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function blackboxchat(content) {
    try {
        const messages = [{
            role: "user",
            content: content
        }, {
            role: "assistant",
            content: "Hello!"
        }];
        const response = await fetch("https://www.blackbox.ai/api/chat", {
            method: "POST",
            body: JSON.stringify({
                messages,
                id: userId,
                mode: "continue",
                userId: userId
            }),
        });
        return await response.text();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const API_URL = 'https://postapi.lbbai.cc/v1/chat/completions';

async function lbbAi(query, profile) {
    const payload = {
        messages: [{
                role: "system",
                content: profile
            },
            {
                role: "user",
                content: query
            },
        ],
        model: "gpt-3.5-turbo",
        presence_penalty: 0,
        stream: true,
        temperature: 0.7,
    };

    try {
        const response = await axios.post(API_URL, payload);
        const inputString = response.data;

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
        console.error('Error during chatAI request:', error);
        throw error;
    }
}

async function mariTalk(q) {
    try {
        const response = await fetch('https://chat.maritaca.ai/api/chat/inference', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'key 100967333014773694334$301a2d09eb5a949372342c6ce125335b346740cecd46dbe12fc2fa326cf315f3',
            },
            body: JSON.stringify({
                messages: [{
                        role: 'assistant',
                        content: 'Hello!',
                    },
                    {
                        role: 'user',
                        content: q,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

async function talkai(type, message) {
    try {
        const headers = {
            'User-Agent': generateRandomUserAgent(),
            'Referer': 'https://talkai.info/id/chat/',
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

        const response = await axios.post('https://talkai.info/id/chat/send2/', data, {
            headers
        });

        return response.data;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}


export {
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
talkai
}