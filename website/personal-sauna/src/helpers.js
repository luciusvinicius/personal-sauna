export const filterModesByPeriod = (period = 1, ecos = [], comfs = [], offs = []) => {

    if (period === 1) {
        return {
            ecos: ecos,
            comfs: comfs,
            offs: offs
        }
    }

    let new_ecos = []
    let new_comfs = []
    let new_offs = []

    for (let i = 0; i < ecos.length; i++) {
        let idx = Math.floor(i / period)
        if (idx >= new_ecos.length) {
            new_ecos.push(0)
            new_offs.push(0)
            new_comfs.push(0)
        }
        new_ecos[idx] += ecos[i]
        new_comfs[idx] += comfs[i]
        new_offs[idx] += offs[i]
    }

    return {
        ecos: new_ecos,
        comfs: new_comfs,
        offs: new_offs
    }
}

export const filterValueByPeriodOutdated = (period = 1, values = []) => {
    let new_val = []

    if (period === 1) {
        return values
    }

    let idx = 0
    let hadLastDivision = false
    let i
    // console.log("values", values)
    for (i = 0; i < values.length; i++) {
        idx = Math.floor(i / period)
        hadLastDivision = false
        if (idx >= new_val.length) {
            if (idx !== 0) {
                new_val[idx - 1] = new_val[idx - 1] / period
            }
            hadLastDivision = true
            new_val.push(0)
        }
        new_val[idx] += values[i]
    }

    if (i%period !== 0) {
        // console.log("before final", new_val)
        // console.log("idx", idx, "i", i)
        new_val[idx] /= i%period
    }

    return new_val

}

export const filterValueByPeriod = (period = 1, values = []) => {
    let new_val = []

    if (period === 1) {
        return values
    }

    let idx = 0
    let hadLastDivision = false
    let i
    for (i = 0; i < values.length; i++) {
        idx = Math.floor(i / period)

        if (idx >= new_val.length) {
            new_val.push(0)
        }
        new_val[idx] += values[i]
    }

    return new_val

}

export const filterLabelByPeriod = (period, labels) => {
    const WEEK_SIZE = 7
    let new_labels = []

    switch (period) {
        case 1: // hourly
            for (const date of labels) {
                for (let hour = 0; hour < 24; hour++) {
                    let hour_str = hour + ""
                    if (hour < 10) {
                        hour_str = `0${hour}`
                    }
                    new_labels.push(`${convertDateToString(date, false)} - ${hour_str}:00`)
                }
            }
            break
        case 24: // daily
            new_labels = labels.map(label => convertDateToString(label))
            break

        case 24 * 7: // weekly
            if (labels.length === 0) break

            let startDate = labels[0]
            let str = convertDateToString(startDate, false)
            let isCompleteWeek = true

            for (let i = 0; i < labels.length; i++) {

                let date = labels[i]
                if (i % WEEK_SIZE === 0) {
                    isCompleteWeek = false
                    str = convertDateToString(date, false)
                }

                if (i % WEEK_SIZE === WEEK_SIZE - 1) { // last element on week
                    isCompleteWeek = true
                    str = `${str} - ${convertDateToString(date, false)}`
                    new_labels.push(str)
                    str = ""
                }
            }

            if (!isCompleteWeek) {
                str = `${str} - ${convertDateToString(labels[labels.length-1], false)}`
                new_labels.push(str)
            }

            break
    }

    return new_labels
}

export const generate_cumulative = (arr) => {
    let new_arr = []
    let total = 0
    for (let el of arr) {
        total += el
        new_arr.push(total)
    }
    return new_arr
}

export const convertDateToString = (date, hasYear = true) => {
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (hasYear) {
        return `${date.getFullYear()}/${month}/${day}`
    }

    return `${month}/${day}`
}

export const sumValueByPeriod = (period=1, values=[]) => {
    let new_val = []
    for (let i=0; i < period; i++){
        new_val.push(0)
    }
    console.log(values)

    let idx = 0
    for (let i=0; i < values.length; i++) {
        idx = Math.floor(i/period)
        new_val[idx] += values[i]

    }
    console.log(new_val)
    return new_val

}