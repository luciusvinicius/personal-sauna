from itertools import product

price = [185.90 ,150.00 ,127.50 ,114.60 ,114.10 ,111.10 ]#,112.60 ,114.50 ,125.02 ,131.97 ,141.80 ,138.00 ,115.60 ,124.99 ,125.02 ,143.00 ,141.00 ,156.17 ,186.03 ,193.15 ,187.95 ,182.30 ,175.12 ,140.38]

temp = [5,4,2,-1,3,6]#,7,8,8,9,11,13,15,17,19,21,19,16,16,13,11,9,7,6] # day's temperatures


n_rec = 0

def all_comb():
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

def optimize(temp):
    sol = []
    for hour in temp:
        if hour > 10:
            sol.append("eco")
        else:
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

def get_cost(sol, temp):
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
        cost = 0
        gain = 0
        if mode == "off": # off -> eco
            cost = 0.6
            gain = 4
        elif mode == "eco":
            gain = 4
            if tmp < 0:
                cost = 9.8
            elif tmp < 10:
                cost = 0.8
            elif tmp < 20:
                cost = 0.8
            else:
                cost = 0.4
        elif mode == "comf":
            cost = 100000000000
            gain = 1
        jump_cost.append(cost*price_h/gain)
    return jump_cost

def algo():
    sol = optimize(temp)

    c = 0
    while(get_comfort(sol) < 124/4):
        c += 1
        jumps = get_jumps(sol, temp, price)
        #print(jumps)
        min_hour = jumps.index(min(jumps))
        if sol[min_hour] == "off":
            sol[min_hour] = "eco"
            #print("Upgraded hour", min_hour, " (off) to eco!")
        elif sol[min_hour] == "eco":
            sol[min_hour] = "comf"
            #print("Upgraded hour", min_hour, " (eco) to comf!")
        elif sol[min_hour] == "comf":
            break
        #print(sol)
        #print("Current comfort", get_comfort(sol))
        #print(get_comfort(sol))
    print("-------------------")
    print(sol, get_comfort(sol), get_cost(sol, temp))
    #print(c)



if __name__ == "__main__":
    #print(recursive(0,0,0,0))
    #print(v2())
    
    all_comb()
    algo()
    #v3()
