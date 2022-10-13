import React from "react";

import {useForm} from "react-hook-form";
import {Button} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import FormInputDropdown from "./FormInputDropdown";
import {FormInputDatePicker} from "./FormInputDatePicker";
import {periods, parameters} from "./FormOptions";
import {getData} from "../algo/algotithm";


const STARTING_DATE = "2021-12-01T00:00:00Z"
const ENDING_DATE = "2021-12-31T00:00:00Z"
const STARTING_PERIOD = 24
const STARTING_PARAMETER = "external_temp"

const filterModesByPeriod = (period = 1, ecos = [], comfs = [], offs = []) => {

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

const filterValueByPeriod = (period = 1, values = []) => {
    let new_val = []

    if (period === 1) {
        return values
    }

    let idx = 0
    let hadLastDivision = false
    for (let i = 0; i < values.length; i++) {
        idx = Math.floor(i / period)
        hadLastDivision = false
        if (idx >= new_val.length) {
            new_val[idx - 1] = new_val[idx - 1] / period
            hadLastDivision = true
            new_val.push(0)
        }
        new_val[idx] += values[i]
    }

    if (!hadLastDivision) {
        new_val[idx] /= period
    }

    return new_val
}

const sumValueByPeriod = (period=1, values=[]) => {
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

const filterLabelByPeriod = (period, labels) => {
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

const convertDateToString = (date, hasYear = true) => {
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

const Forms = ({setLabels, setOffs, setEcos, setComforts, setIsLoading, setValues, setIsHourly, setEnergy_Cons, setCum_Energy_Cons}) => {

    const {handleSubmit, reset, control} = useForm({
        defaultValues: {
            start_date: STARTING_DATE,
            end_date: ENDING_DATE,
            period: STARTING_PERIOD,
            parameter: STARTING_PARAMETER
        }
    });

    const onSubmit = (data) => {
        setIsLoading(true)
        console.log(data);

        let start_date = new Date(data.start_date)
        let end_date = new Date(data.end_date)

        getData(start_date, end_date)
            .then(response => {
                console.log("sussy response", response)
                let values = []
                let ecos = []
                let comfs = []
                let offs = []
                let labels = []
                let energy_consumption = []
                let energy_comsumption_norm = []
                let energy_cost = []
                let energy_cost_norm = []
                response.map(day => {
                    values = values.concat(day.temps)
                    ecos = ecos.concat(day.modes_bool.eco)
                    comfs = comfs.concat(day.modes_bool.comf)
                    offs = offs.concat(day.modes_bool.off)
                    labels = labels.concat(day.date)
                    energy_consumption = energy_consumption.concat(day.consumo)
                    energy_consumption_norm = energy_consumption.concat(day.consumo_normal)
                    energy_cost = energy_cost.concat(day.cost)
                    energy_cost_norm = energy_cost_norm.concat(day.cost_normal)
                })

                const cumulativeSum = (sum => value => sum += value)(0);

                const new_value = filterValueByPeriod(data.period, values)
                const new_modes = filterModesByPeriod(data.period, ecos, comfs, offs)
                const new_labels = filterLabelByPeriod(data.period, labels)
                const new_energy_con = sumValueByPeriod(data.period, energy_consumption)
                const cum_ene_con = new_energy_con.map(cumulativeSum)
                

                setValues(new_value)
                setOffs(new_modes.offs)
                setEcos(new_modes.ecos)
                setComforts(new_modes.comfs)
                setLabels(new_labels)
                setIsHourly(data.period === 1)
                setEnergy_Cons(new_energy_con)
                setCum_Energy_Cons(cum_ene_con)

                console.log("new value", new_value)
                console.log("new modes", new_modes)
                console.log("new labels", new_labels)
                console.log("ene_con", new_energy_con)
                console.log("cum_ene_con", cum_ene_con)
                setIsLoading(false)
            })
    }


    return (
        <>
            <form className="pl-5 pt-5">
                <Row className="justify-content-md-center">
                    <Col xs={8} className="pl-5">
                        <FormInputDatePicker
                            name={"start_date"}
                            label={"Starting date"}
                            control={control}
                        />
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <FormInputDatePicker
                            name={"end_date"}
                            label={"Ending date"}
                            control={control}
                        />
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <FormInputDropdown
                            name={"period"}
                            label={"Period"}
                            control={control}
                            options={periods}
                        />
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <FormInputDropdown
                            name={"parameter"}
                            label={"Parameter"}
                            control={control}
                            options={parameters}
                        />
                    </Col>
                </Row>

                <br/>
                <Row className="justify-content-md-center">
                    <Col xs={3}></Col>
                    <Col xs={3}>
                        <Button variant={"contained"} color={"success"} onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Col>
                    <Col xs={3}>
                        <Button style={{marginLeft: "1em"}} onClick={() => reset()} variant={"outlined"}>Reset</Button>
                    </Col>
                    <Col xs={3}></Col>

                </Row>

            </form>
        </>
    )
}

export default Forms