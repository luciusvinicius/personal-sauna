import math
import copy

eco = {10: 1.6, 20:0.8, 21:0.4}
comfort = {0:11.4, 10:2.4, 20:1.6, 21:0.8}

# max 8 hours of "off"

def recursive(temp, prices, curr_hour, curr_price, curr_comfort, curr_sol : list, best):
    print(" "*curr_hour, curr_hour, curr_sol)
    if curr_price > best[0]:
        return (0, 0, curr_sol)
    if curr_sol.count("off") > 8: # discard solution
        return (0, 0, curr_sol)
    if curr_comfort >= 124: # solution found
        return (curr_price, curr_comfort, curr_sol)
    if curr_hour == 23:
        if curr_comfort < 124:
            return (0, 0, curr_sol)
        else: 
            return (curr_price, curr_comfort, curr_sol)

    off_price = 1*prices[curr_hour]
    eco_price = eco[10]*prices[curr_hour] if temp[curr_hour] < 10 else eco[20]*prices[curr_hour] if temp[curr_hour] < 20 else eco[21]*prices[curr_hour]
    comf_price = comfort[0]*prices[curr_hour] if temp[curr_hour] < 0 else comfort[10]*prices[curr_hour] if temp[curr_hour] < 10 else comfort[20]*prices[curr_hour] if temp[curr_hour] < 20 else comfort[21]*price[curr_hour]
    
    # choose "off" for this hour (only explore if off_price < eco_price)
    if off_price < eco_price:
        off_sol = copy.deepcopy(curr_sol)
        off_sol[curr_hour] = "off"
        off_ret = recursive(temp, prices, curr_hour+1, curr_price+off_price, curr_comfort, curr_sol, best)
    else: off_ret = (curr_price, curr_comfort, curr_sol)
    # choose "eco" for this hour (only explore if eco price < comf_price)
    if eco_price < comf_price:
        eco_sol = copy.deepcopy(curr_sol)
        eco_sol[curr_hour] = "eco"
        eco_ret = recursive(temp, prices, curr_hour+1, curr_price+eco_price, curr_comfort+4, eco_sol, best)
    else: eco_ret = (curr_price, curr_comfort, curr_sol)
    # choose "comfort" for this hour
    comf_sol = copy.deepcopy(curr_sol)
    comf_sol[curr_hour] = "comf"
    comf_ret = recursive(temp, prices, curr_hour+1, curr_price+comf_price, curr_comfort+8, comf_sol, best)
    
    best_sol = min(comf_ret, eco_ret, off_ret, key=lambda x: x[0])
    if best_sol[1] >= 124 and best_sol[0] < best[0]:
        best = best_sol
    return best


price = [185.90 
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
    ,125.02 
    ,143.00 
    ,141.00 
    ,156.17 
    ,186.03 
    ,193.15 
    ,187.95 
    ,182.30 
    ,175.12 
    ,140.38
]

temp = [5,4,2,-1,3,6,7,8,8,9,11,13,15,17,19,21,19,16,16,13,11,9,7,6] # day's temperatures

recursive(temp, price, 0, 0, 0, [' ' for _ in range(24)], (math.inf, 0, []))


