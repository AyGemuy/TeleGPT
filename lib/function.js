import fetch from 'node-fetch';
import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import syntaxerror from 'syntax-error';
import { format } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const exec = promisify(_exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

class CustomArray extends Array {
    constructor(...args) {
        if (typeof args[0] === 'number') return super(Math.min(args[0], 10000));
        else return super(...args);
    }
}

async function functionEval(inputText) {
    let _return;
    let _syntax = '';

    try {
        let i = 15;
        let f = { exports: {} };
        const scriptCode = `
            print = console.log;
            try {
                return (async () => { ${inputText.replace(/`/g, '\\`')} })();
            } catch (e) {
                throw e;
            }
        `;
        const execFn = new Function('print', 'require', 'Array', 'process', 'format', 'f', 'exports', 'inputText', scriptCode);

        _return = await execFn.call({}, console.log, require, CustomArray, process, format, f, f.exports, inputText);
    } catch (e) {
        let err = syntaxerror(inputText, 'Execution Function', {
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            sourceType: 'module'
        });
        if (err) _syntax = err;
        _return = e;
    } finally {
        return _syntax + format(_return);
    }
}

async function functionExec(text) {
    try {
        const { stdout, stderr } = await exec(`${text.trimEnd()}`);
        if (stdout.trim()) return stdout;
        if (stderr.trim()) return stderr;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function parseMarkdown(text) {
    text = text.replace(/(\[[^\][]*]\(http[^()]*\))|[_*[\]()~>#+=|{}.!-]/gi, (x, y) => (y ? y : '\\' + x));
    return text;
}

async function fetchJson(url, options) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, options);
            const json = await response.json();
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function range(start, stop, step) {
    if (typeof stop === 'undefined') {
        stop = start;
        start = 0;
    }
    if (typeof step === 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    const result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
}

export {
    sleep,
    parseMarkdown,
    fetchJson,
    range,
    functionEval,
    functionExec
};
