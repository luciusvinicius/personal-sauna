


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
            if (temp < 10) {
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


const algorithm = () => {
    const prices = [185.90 ,150.00 ,127.50 ,114.60 ,114.10 ,111.10 ,112.60 ,114.50 ,125.02 ,131.97 ,141.80 ,138.00 ,115.60 ,124.99 ,125.02 ,143.00 ,141.00 ,156.17 ,186.03 ,193.15 ,187.95 ,182.30 ,175.12 ,140.38]

    const temperatures = [5,4,2,-1,3,6,7,8,8,9,11,13,15,17,19,21,19,16,16,13,11,9,7,6] // day's temperatures
    let modes = initialize(temperatures)

    let count = 0

    while(get_comfort(modes) < 124){
        count++
        console.log(modes)
        let jumps = get_jumps(modes, temperatures, prices)
        console.log(jumps)
        let min_hour = jumps.indexOf(Math.min(...jumps))
        if (modes[min_hour] == "off"){
            modes[min_hour] = "eco"
            console.log("Upgraded hour" + min_hour + " (off) to eco!")
        }
        else if (modes[min_hour] == "eco"){
            //console.log("A")
            //console.log(modes)
            modes[min_hour] = "comf"
            //console.log(min_hour)
            console.log("Upgraded hour " + min_hour + " (eco) to comf!")
        }        
        else if (modes[min_hour] == "comf"){
            break
        }
        console.log(get_comfort(modes))
        
    }
    console.log(modes, get_comfort(modes), get_cost(modes, temperatures, prices))
    console.log(count)
}


algorithm()