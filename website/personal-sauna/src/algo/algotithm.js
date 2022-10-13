import { get_day_temp } from "../api/API";
import { get_day_prices } from '../api/API';

/**
 * Initializes an array with the "cheapest" modes for each hour
 * @param {Array} temperatures array of hourly temperatures if a day
 * @returns {Array} 
 */
const initialize = (temperatures) => {
    const sol = [];
    temperatures.forEach(temp => {
        sol.push(temp > 10 ? "eco" : "off");
    });
    return sol
}

/**
 * Calculates the comfort score of the day
 * @param {Array} modes array of modes for each hour
 * @returns {number}  
 */
const get_comfort = (modes) => {
    let sum = 0;
    modes.forEach(mode => {
        sum += mode == "eco" ? 4 : mode == "comf" ? 8 : 0
    })
    return sum
}
    
/**
 * Calculates the total cost of the day
 * @param {Array} modes array of modes for each hour
 * @param {Array} temperatures array of temperatures for each hour
 * @param {Array} prices array of prices for each hour
 * @returns {number}
 */
const get_cost = (modes, temperatures, prices) => {
    let sum = 0
    for (let i = 0; i < 24; i++) {
        const mode = modes[i];
        const temp = temperatures[i];
        const price = prices[i];
        if (mode == "off"){
            sum += 1*price;
        }  
        else if (mode == "eco"){
            if (temp < 10){
                sum += 1.6*price;
            }  
            else if (temp < 20){
                sum += 0.8*price;
            } 
            else {
                sum += 0.4*price;
            } 
        }   
        else if (mode == "comf"){
            if (temp < 0) {
                sum += 11.4*price
            }
            else if (temp < 10) {
                sum += 2.4*price
            }
            else if (temp < 20){
                sum += 1.6*price
            } 
            else {
                sum += 0.8*price
            }
        }
    }
    return sum   
}
   
/**
 * Calculates the cost of upgrading the mode of each hour
 * @param {Array} modes array of modes for each hour
 * @param {Array} temperatures array of temperatures for each hour
 * @param {Array} prices array of prices for each hour
 * @returns {Array} 
 */
const get_jumps = (modes, temperatures, prices) => {
    const jump_cost = []
    for (let i = 0; i < 24; i++) {
        const mode = modes[i]
        const temp = temperatures[i]
        const price = prices[i]
        let cost = 0
        let gain = 0
        if (mode == "off"){ // off -> eco
            cost = 0.6
            gain = 4
        }
        else if (mode == "eco"){
            gain = 4
            if (temp < 0){
                cost = 9.8
            }
            else if (temp < 10){
                cost = 0.8
            }
            else if (temp < 20){
                cost = 0.8
            }
            else {
                cost = 0.4
            }      
        }
        else if (mode == "comf"){
            cost = 100000000000
            gain = 1
        }    
        //console.log(cost + " " + price + " " + gain + " " + cost*price/gain)  
        jump_cost.push(cost*price/gain)
    }
        
    return jump_cost
}

const getNextDay = (day) => {
    let tomorrow = new Date(day)
    tomorrow.setDate(day.getDate() + 1)
    return tomorrow
}


export const getData = async (start_day, end_day, off_flag = true, comf_score = 124) => {
    let ret = [];
    for (let i = start_day; i <= end_day; i = getNextDay(i)) {
        let temperatures = await get_day_temp(i)
        let prices = await get_day_prices(i)
        let modes;
        if (off_flag) {
            modes = initialize(temperatures)
        }
        else {
            modes = []
            for(let k = 0; k < 24; k++) {
                modes.push("eco")
            }
        }
        let count = 0
        while(get_comfort(modes) < comf_score){
            count++
            let jumps = get_jumps(modes, temperatures, prices)
            let min_hour = jumps.indexOf(Math.min(...jumps))
            if (modes[min_hour] === "off"){
                modes[min_hour] = "eco"
            }
            else if (modes[min_hour] === "eco"){
                modes[min_hour] = "comf"
            }        
            else if (modes[min_hour] === "comf"){
                break
            }
        }
        let day = {};
        day.date = i
        day["modes"] = modes
        day["temps"] = temperatures
        day["comf"] = []
        day["modes_bool"] = {}
        let eco = []
        let comf = []
        let off = []
        day["modes_bool"]["eco"] = eco
        day["modes_bool"]["comf"] = comf
        day["modes_bool"]["off"] = off
        day["consumo"] = []
        day["consumo_normal"] = []
        day["cost_normal"] = []
        day["cost"] = []
        let normal_cost = 0
        for (let j = 0; j < 24; j++) {
            let mode = modes[j]
            let price = prices[j]
            let temp = temperatures[j]
            if (mode === "off"){
                day["comf"].push(0)
                eco.push(0)
                comf.push(0)
                off.push(1)
                day["consumo"].push(1)
                day["cost"].push(price)
            }  
            else if (mode === "eco"){
                day["comf"].push(4)
                eco.push(1)
                comf.push(0)
                off.push(0)
                if (temp < 10){
                    day["consumo"].push(1.6)
                    day["cost"].push(1.6*price)
                }  
                else if (temp < 20){
                    day["consumo"].push(0.8)
                    day["cost"].push(0.8*price)
                } 
                else {
                    day["consumo"].push(0.4)
                    day["cost"].push(0.4*price)
                } 
            }   
            else if (mode === "comf"){
                day["comf"].push(8)
                eco.push(0)
                comf.push(1)
                off.push(0)
                if (temp < 0) {
                    day["consumo"].push(11.4)
                    day["cost"].push(11.4*price)
                }
                else if (temp < 10) {
                    day["consumo"].push(2.4)
                    day["cost"].push(2.4*price)
                }
                else if (temp < 20){
                    day["consumo"].push(1.6)
                    day["cost"].push(1.6*price)
                } 
                else {
                    day["consumo"].push(0.8)
                    day["cost"].push(0.8*price)
                }
            }

            if (j <= 5 || j >= 22) { // eco
                if (temp < 10){
                    day["cost_normal"].push(1.6*price)
                    day["consumo_normal"].push(1.6)
                    normal_cost += 1.6*price
                }  
                else if (temp < 20){
                    day["cost_normal"].push(0.8*price)
                    day["consumo_normal"].push(0.8)
                    normal_cost += 0.8*price
                } 
                else {
                    day["cost_normal"].push(0.4*price)
                    day["consumo_normal"].push(0.4)
                    normal_cost += 0.4*price
                } 
            }
            else if (j == 6 || j == 21) { // mix
                if (temp < 0) {
                    day["cost_normal"].push((11.4*price/2) + (1.6*price/2))
                    day["consumo_normal"].push((11.4+1.6)/2)
                    normal_cost += 11.4*price/2
                    normal_cost += 1.6*price/2
                }
                else if (temp < 10) {
                    day["cost_normal"].push((2.4*price/2) + (1.6*price/2))
                    day["consumo_normal"].push((2.4+1.6)/2)
                    normal_cost += 2.4*price/2
                    normal_cost += 1.6*price/2
                }
                else if (temp < 20){
                    day["cost_normal"].push((1.6*price/2) + (0.8*price/2))
                    day["consumo_normal"].push((0.8+1.6)/2)
                    normal_cost += 1.6*price/2
                    normal_cost += 0.8*price/2
                } 
                else {
                    day["cost_normal"].push((0.4*price/2) + (0.8*price/2))
                    day["consumo_normal"].push((0.4+0.8)/2)
                    normal_cost += 0.4*price/2
                    normal_cost += 0.8*price/2
                }
            }
            else { // comf
                if (temp < 0) {
                    day["cost_normal"].push(11.4*price)
                    day["consumo_normal"].push(11.4)
                    normal_cost += 11.4*price
                }
                else if (temp < 10) {
                    day["cost_normal"].push(2.4*price)
                    day["consumo_normal"].push(2.4)
                    normal_cost += 2.4*price
                }
                else if (temp < 20){
                    day["cost_normal"].push(1.6*price)
                    day["consumo_normal"].push(1.6)
                    normal_cost += 1.6*price
                } 
                else {
                    day["cost_normal"].push(0.8*price)
                    day["consumo_normal"].push(0.8)
                    normal_cost += 0.8*price
                }
            }
        }
        day["cost_diff"] = normal_cost - day["cost"].reduce((partialSum, a) => partialSum + a, 0)
        ret.push(day)
    }
    console.log(ret)
    return ret
}