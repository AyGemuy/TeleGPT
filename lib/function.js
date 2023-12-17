import fetch from 'node-fetch';
import cp, {
    exec as _exec
} from 'child_process';
import {
    promisify
} from 'util';

const exec = promisify(_exec).bind(cp);

async function functionEval(text) {
    try {
        const asyncFunction = new Function(`
      return (async () => {
        const result = ${text};
        return result;
      })();
    `);

        const result = await asyncFunction();
        return JSON.stringify(result, null, 2);
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function functionExec(text) {
    try {
        const {
            stdout,
            stderr
        } = await exec(`${text.trimEnd()}`);
        if (stdout.trim()) return (stdout);
        if (stderr.trim()) return (stderr);
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function parseMarkdown(text) {
    text = text.replace(/(\[[^\][]*]\(http[^()]*\))|[_*[\]()~>#+=|{}.!-]/gi, (x, y) => y ? y : '\\' + x);
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