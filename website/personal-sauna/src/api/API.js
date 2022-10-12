// import axios from "axios"

import obj from "../temps/Temps.json"

const BASE_URL = "../temps/Temps.json"

export const getData = ({data}) => obj

const day_ts = 86400;

const lat = 41.8061;

const long = -6.7567;

export const get_day_temp = async (day) => {
    // console.log(`get temperatures for day ${day}`)
    const temps = []
    const day_1 = 1638316800
    const init = day_1 + (day-1)*day_ts
    const final = day_1 + day*day_ts-1

    const options = {
        method: 'GET',
        // url: `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${long}&start=${init}&end=${final}&appid=329abd3f61d3cfe6766fbd34fa983679`,
    };

    const response = await fetch(`https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${long}&start=${init}&end=${final}&appid=329abd3f61d3cfe6766fbd34fa983679`, options)

    if (response.ok) { 
        let json = await response.json();
        // console.log(json)
        json.list.forEach(element => {
            temps.push(element.main.temp-273.15)
        });
    }


    return temps

}