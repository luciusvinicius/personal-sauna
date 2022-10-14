from itertools import product
import random

# price = [185.90 ,150.00 ,127.50 ,114.60 ,114.10 ,111.10 ]#,112.60 ,114.50 ,125.02 ,131.97 ,141.80 ,138.00 ,115.60 ,124.99 ,125.02 ,143.00 ,141.00 ,156.17 ,186.03 ,193.15 ,187.95 ,182.30 ,175.12 ,140.38]

# temp = [5,4,2,-1,3,6]#,7,8,8,9,11,13,15,17,19,21,19,16,16,13,11,9,7,6] # day's temperatures

n_rec = 0

def all_comb(price, temp):
    prod = product([0,1,2], repeat=6)

    eco = {10: 1.6, 20:0.8, 21:0.4}
    comfort = {0:11.4, 10:2.4, 20:1.6, 21:0.8}

    ret = []
    for p in prod:
        score = sum([x*4 for x in p])
        pri = 0
        for i in range(len(p)):
            mod = 1
            if  p[i] == 1:
                mod = eco[10] if temp[i] < 10 else eco[20] if temp[i] < 20 else eco[21]
            elif p[i] == 2:
                mod = comfort[0] if temp[i] < 0 else comfort[10] if temp[i] < 10 else comfort[20] if temp[i] < 20 else comfort[21]
            pri += price[i]*mod
        states = ['o' if x == 0 else 'e' if x == 1 else 'c' for x in p]
        ret.append([states, score, pri])

    ret.sort(key=lambda x: (x[2], -x[1]))
    for r in ret:
        if r[1] > 124/4:
            print(r)
            break
    return r[2]

def optimize(temp):
    sol = []
    for _ in temp:
        sol.append("off")
    return sol

def get_comfort(sol):
    sum = 0
    for mode in sol:
        if mode == "eco":
            sum += 4
        elif mode == "comf":
            sum += 8
    return sum

def get_cost(sol, temp, price):
    sum = 0
    for i in range(6):
        mode = sol[i]
        tmp = temp[i]
        price_h = price[i]
        if mode == "off":
            sum += 1*price_h
        elif mode == "eco":
            if tmp < 10: sum += 1.6*price_h
            elif tmp < 20: sum += 0.8*price_h
            else: sum += 0.4*price_h
        elif mode == "comf":
            if tmp < 10: sum += 2.4*price_h
            elif tmp < 20: sum += 1.6*price_h
            else: sum += 0.8*price_h
    return sum

def get_jumps(sol, temp, price):
    jump_cost = []
    for i in range(6):
        mode = sol[i]
        tmp = temp[i]
        price_h = price[i]
        # print("hour", i, mode, tmp, price_h)
        if mode == "off":
            cost_eco = 0
            cost_comf = 0
            if tmp < 0:
                cost_eco = 0.6
                cost_comf = 10.4 
            elif tmp < 10:
                cost_eco = 0.6
                cost_comf = 1.4
            elif tmp < 20:
                cost_eco = -0.2
                cost_comf = 0.6
            else:
                cost_eco = -0.6
                cost_comf = -0.2
            # print("Added two jumps")
            jump_cost.append((cost_eco*price_h/4,i,"eco"))
            jump_cost.append((cost_comf*price_h/8,i,"comf"))
        elif mode == "eco":
            if tmp < 0:
                cost = 9.8
            elif tmp < 10:
                cost = 0.8
            elif tmp < 20:
                cost = 0.8
            else:
                cost = 0.4
            # print("Added one jumps")
            jump_cost.append((cost*price_h/4,i,"comf"))
        # print(len(jump_cost))
    return jump_cost

def algo(temp, price):
    sol = optimize(temp)

    while(get_comfort(sol) < 124/4):
    #print(get_comfort(sol2))
        jumps = get_jumps(sol,temp,price)
        #print(len(jumps))
        min_jump = min(jumps, key=lambda x: x[0])
        sol[min_jump[1]] = min_jump[2]
        # print(sol2)

    # c = 0
    # while(get_comfort(sol) < 124/4):
    #     c += 1
    #     jumps = get_jumps(sol, temp, price)
    #     #print(jumps)
    #     min_hour = jumps.index(min(jumps))
    #     if sol[min_hour] == "off":
    #         sol[min_hour] = "eco"
    #         #print("Upgraded hour", min_hour, " (off) to eco!")
    #     elif sol[min_hour] == "eco":
    #         sol[min_hour] = "comf"
    #         #print("Upgraded hour", min_hour, " (eco) to comf!")
    #     elif sol[min_hour] == "comf":
    #         break
    #     #print(sol)
    #     #print("Current comfort", get_comfort(sol))
    #     #print(get_comfort(sol))
    print(sol, get_comfort(sol), get_cost(sol, temp, price))
    return get_cost(sol, temp, price)
    #print(c)



if __name__ == "__main__":
    #print(recursive(0,0,0,0))
    #print(v2())
    price = [1.6, 0.6, 0.9, 0.3, 0.9, 1.5]
    temp = [14, 14, 2, 16, 1, 3]
    all_comb(price, temp)
    algo(temp, price)
    print("__________________________")
    # for i in range(100):
    #     price = [random.randint(2,25)/10 for _ in range(6)]
    #     temp = [random.randint(-5,25) for _ in range(6)]
    #     #print(i)
    #     #print(price)
    #     #print(temp)
    #     a = all_comb(price, temp)
    #     b = algo(temp, price)
    #     if(a != b):
    #         print(price)
    #         print(temp)
        #print("__________________________")
    #v3()

# [2.0, 2.1, 1.0, 2.3, 0.9, 1.0]
# [-3, 13, 6, 10, 5, 18]
