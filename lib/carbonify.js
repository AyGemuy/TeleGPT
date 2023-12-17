import fetch from "node-fetch"

async function CarbonifyV1(input) {
    try {
        let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "code": input
                })
            })
            .then(response => response.blob())
        let arrayBuffer = await Blobs.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);
        return buffer
    } catch (e) {
        throw e;
    }
}

async function CarbonifyV2(input) {
    try {
        let Blobs = await fetch("https://carbon-api.vercel.app/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "code": input
                })
            })
            .then(response => response.blob())
        let arrayBuffer = await Blobs.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);
        return buffer
    } catch (e) {
        throw e;
    }
}

export {
    CarbonifyV1,
    CarbonifyV2
};