import axios from 'axios'
import fetch from "node-fetch";

async function infoCuaca(text) {
    try {
        let response = axios.get('https://api.weatherapi.com/v1/current.json?key=897dba35c1d94f4cbea134758220207&q=' + text)
        let res = await response
        let {
            name,
            region,
            country,
            lat,
            lon,
            tz_id,
            localtime_epoch,
            localtime
        } = res.data.location
        let {
            last_updated_epoch,
            last_updated,
            temp_c,
            temp_f,
            is_day,
            wind_mph,
            wind_kph,
            wind_degree,
            wind_dir,
            pressure_mb,
            pressure_in,
            precip_mm,
            precip_in,
            humidity,
            cloud,
            feelslike_c,
            feelslike_f,
            vis_km,
            vis_miles,
            uv,
            gust_mph,
            gust_kph
        } = res.data.current

        let caption = `
- - - - [ CONDITION ] - - -
${res.data.current.condition.text}

Name: ${name}
Region: ${region}
Country: ${country}
Latitude: ${lat}
Longitude: ${lon}
Timezone ID: ${tz_id}
Local Time Epoch: ${localtime_epoch}
Local Time: ${localtime}

${readMore}
- - - - [ DETAILED ] - - -
Last Updated Epoch: ${last_updated_epoch}
Last Updated: ${last_updated}
Temp Celcius: ${temp_c}
Temp Fahrenheit: ${temp_f}
Is Day: ${is_day}
Wind Mph: ${wind_mph}
Wind Kph: ${wind_kph}
Wind Degree: ${wind_degree}
Wind Dir: ${wind_dir}
Pressure Mb: ${pressure_mb}
Pressure In: ${pressure_in}
Precip Mm: ${precip_mm}
Precip In: ${precip_in}
Humidity: ${humidity}
Cloud: ${cloud}
Feelslike Celcius: ${feelslike_c}
Feelslike Fahrenheit: ${feelslike_f}
Vis Km: ${vis_km}
Vis Miles: ${vis_miles}
UV: ${uv}
Gust Mph: ${gust_mph}
Gust Kph: ${gust_kph}
        `.trim()
        return caption;
    } catch (e) {
        throw e;
    }
}

async function infoGempa() {
    const link = "https://data.bmkg.go.id/DataMKG/TEWS/";
    try {
        let anu = await (await fetch(link + "autogempa.json")).json();
        anu = anu.Infogempa.gempa;
        let txt = `🌐 *Wilayah:* ${anu.Wilayah}\n📅 *Tanggal:* ${anu.Tanggal}\n🕒 *Waktu:* ${anu.Jam}\n💢 *Potensi:* ${anu.Potensi}\n\n📏 *Magnitude:* ${anu.Magnitude}\n🌊 *Kedalaman:* ${anu.Kedalaman}\n📍 *Koordinat:* ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${anu.Dirasakan}` : ""}`;
        
        return txt.replaceAll("%p", "```")
    } catch (e) {
        console.log(e);
        try {
            let anu = await (await fetch(link + "gempaterkini.json")).json();
            anu = anu.Infogempa.gempa[0];
            let txt = `🌐 *Wilayah:* ${anu.Wilayah}\n📅 *Tanggal:* ${anu.Tanggal}\n🕒 *Waktu:* ${anu.Jam}\n💢 *Potensi:* ${anu.Potensi}\n\n📏 *Magnitude:* ${anu.Magnitude}\n🌊 *Kedalaman:* ${anu.Kedalaman}\n📍 *Koordinat:* ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${anu.Dirasakan}` : ""}`;
            
            return txt.replaceAll("%p", "```")
        } catch (e) {
            console.log(e);
            await reply(`[!] Maaf, fitur ini sedang bermasalah.`);
        }
    }
}

export {
    infoCuaca,
    infoGempa
};

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)