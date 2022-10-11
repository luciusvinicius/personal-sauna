const price = [185.90 
    ,150.00 
    ,127.50 
    ,114.60 
    ,114.10 
    ,111.10 
    ,112.60 
    ,114.50 
    ,125.02 
    ,131.97 
    ,141.80 
    ,138.00 
    ,115.60 
    ,124.99 
    ,125,02 
    ,143.00 
    ,141.00 
    ,156.17 
    ,186.03 
    ,193.15 
    ,187.95 
    ,182.30 
    ,175.12 
    ,140.38
];

const temp = [
    5,4,2,-1,3,6,7,8,8,9,11,13,15,17,19,21,19,16,16,13,11,9,7,6
]

const eco = {10: 1.6, 20:0.8, 21:0.4}
const comfort = {0:3.3, 10:2.4, 20:1.6, 21:0.8}

const max_limit = 125000

const recursive = (acc_price, score, hour) => {

    if (hour == 23){
        return [acc_price, score]
    }
    if ( (24-hour)*8 + score < 124){
        return [max_limit, 0]
    }

    const eco_price = temp[hour] < 10 ? eco[10] : temp[hour] < 20 ? eco[20] : eco[21]
    const comfort_price = temp[hour] < 0 ? comfort[0] : temp[hour] < 10 ? comfort[10] : temp[hour] < 20 ? comfort[20] : comfort[21]
    const off_price = 1

    const eco_rec = recursive(acc_price+eco_price, score+4, hour+1)
    const comfort_rec = recursive(acc_price+comfort_price, score+8, hour+1)
    const off_rec = recursive(acc_price+off_price, score, hour+1)

    const possible_values = []

    if (eco_rec[1] >= 124) {
        possible_values.push(eco_rec)
    }

    if (comfort_rec[1] >= 124) {
        possible_values.push(comfort_rec)
    }

    if (off_rec[1] >= 124) {
        possible_values.push(off_rec)
    }

    const mi = [max_limit, 0]
    for (let value of possible_values) {
        if (value[0] < mi[0]) {
            mi = value
        }
    }

    return mi




}