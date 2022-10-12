// import axios from "axios"

import obj from "../temps/Temps.json"

const BASE_URL = "../temps/Temps.json"

export const getData = ({data}) => obj

const day_ts = 86400;

const lat = 41.8061;

const long = -6.7567;

export const get_day_temp = async (day) => {
    const temps = []
    const day_1 = 1638316800
    const init = day_1 + (day-1)*day_ts
    const final = day_1 + day*day_ts-1

    const options = {
        method: 'GET'
    };

    const response = await fetch(`https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${long}&start=${init}&end=${final}&appid=329abd3f61d3cfe6766fbd34fa983679`, options)

    if (response.ok) { 
        let json = await response.json();
        json.list.forEach(element => {
            temps.push(element.main.temp-273.15)
        });
    }

    return temps

}

export const get_day_prices = async (day) => {
    const prices = []
    let date = "2021-12-"
    if (day >= 10) date = date.concat(day)
    else if (day > 0) date = date.concat("0",day)

    const options = {
        method: 'GET',
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // }
    };
    
    const response = await fetch(`http://localhost:5000/bydate/${date}`, options)

    if (response.ok) { 
        let json = await response.json();
        json.forEach(price => {
            prices.push(price/1000)
        });
        // json.list.forEach(element => {
        //     temps.push(element.main.temp-273.15)
        // });
    }

    console.log(prices)

    return prices
}