// import axios from "axios"

import obj from "../temps/Temps.json"

const BASE_URL = "../temps/Temps.json"

export const getData = ({data}) => obj

const day_ts = 86400;

const lat = 41.8061;

const long = -6.7567;

export const get_day_temp = async (day) => {
    const temps = []
    const day_1 = day.getTime()/1000
    const final = day_1 + day_ts - 1

    const options = {
        method: 'GET'
    };

    const response = await fetch(`https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${long}&start=${day_1}&end=${final}&appid=329abd3f61d3cfe6766fbd34fa983679`, options)

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
    let date = ""
    let month = day.getMonth()+1
    let today = day.getDate()
    if (month < 10) month = "0"+month
    if (today < 10) today = "0"+today
    date = date.concat(day.getFullYear(),"-",month,"-", today)
    // console.log(date)

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
    }

    console.log(prices)

    return prices
}