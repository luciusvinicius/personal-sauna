import random

price = [random.randint(2,25)/10 for _ in range(24)]

#price = [1.2,1.3,1.4,1.5,1.6,2,2.1,2.3,2.5,2,1.9,1.8,1.7,2,2.1,2.2,2.2,1.9,1.8,1.3,1.3,1.4,1.2,1]

temp = [random.randint(-5,25) for _ in range(24)]

#temp = [-1,2,3,5,9,11,11,13,15,16,20,21,23,22,19,19,19,18,16,16,15,11,9,5] # day's temperatures

print(price)
print(temp)

def optimize(temp):
    sol = []
    for hour in temp:
        if hour > 10:
            sol.append("eco")
        else:
            sol.append("off")
    return sol

def init(temp):
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

def get_cost(sol, temp):
    sum = 0
    for i in range(24):
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
    for i in range(24):
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

def get_jumps2(sol, temp, price):
    jump_cost = []
    for i in range(24):
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

sol = optimize(temp)
sol2 = init(temp)

while(get_comfort(sol) < 124):
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

while(get_comfort(sol2) < 124):
    #print(get_comfort(sol2))
    jumps = get_jumps2(sol2,temp,price)
    #print(len(jumps))
    min_jump = min(jumps, key=lambda x: x[0])
    sol2[min_jump[1]] = min_jump[2]
    # print(sol2)


print(sol, get_comfort(sol), get_cost(sol, temp))
print(sol2, get_comfort(sol2), get_cost(sol2, temp))
