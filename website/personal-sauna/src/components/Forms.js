import React from "react";

import {useForm} from "react-hook-form";
import {Button} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import FormInputDropdown from "./FormInputDropdown";
import {FormInputDatePicker} from "./FormInputDatePicker";
import {periods, parameters} from "./FormOptions";
import {getData} from "../algo/algotithm";
import {
    filterLabelByPeriod,
    filterModesByPeriod,
    getSumByPeriod,
    generate_cumulative,
    getAvgByPeriod
} from "../helpers";

import Card from 'react-bootstrap/Card';
import FormInputSlider from "./FormInputSlider";
import FormInputSwitch from "./FormInputSwitch";


const STARTING_DATE = "2021-12-01T00:00:00Z"
const ENDING_DATE = "2021-12-31T00:00:00Z"
const STARTING_PERIOD = 24
const STARTING_PARAMETER = "external_temp"
const MIN_COMF = 0
const MAX_COMF = 192
const STARTING_COMF = 124
const STARTING_OFF = true

const Forms = ({
    setLabels,
    setOffs, 
    setEcos, 
    setComforts, 
    setIsLoading, 
    setTemperature, 
    setIsHourly, 
    setEnergy_Cons, 
    setCum_Energy_Cons,
    setEnergy_Cons_Norm,
    setEnergy_Cost,
    setEnergy_Cost_Norm,
    setCum_Energy_Cost,
    setCum_Energy_Cons_Norm,
    setCum_Energy_Cost_Norm,
    setCumComf,
    setCost_Diff
    }) => {

    const {handleSubmit, reset, control} = useForm({
        defaultValues: {
            start_date: STARTING_DATE,
            end_date: ENDING_DATE,
            period: STARTING_PERIOD,
            parameter: STARTING_PARAMETER,
            comf_slider: STARTING_COMF,
            off_input: STARTING_OFF
        }
    });

    const onSubmit = (data) => {
        setIsLoading(true)
        console.log(data);

        let start_date = new Date(data.start_date)
        let end_date = new Date(data.end_date)

        getData(start_date, end_date, data.off_input ,data.comf_slider)
            .then(response => {
                console.log("sussy response", response)
                let values = []
                let ecos = []
                let comfs = []
                let offs = []
                let labels = []
                let energy_consumption = []
                let energy_consumption_norm = []
                let energy_cost = []
                let energy_cost_norm = []
                let cost_diff = []
                let comfs_total = []
                response.map(day => {
                    values = values.concat(day.temps)
                    ecos = ecos.concat(day.modes_bool.eco)
                    comfs = comfs.concat(day.modes_bool.comf)
                    comfs_total = comfs_total.concat(day.comf)
                    offs = offs.concat(day.modes_bool.off)
                    labels = labels.concat(day.date)
                    energy_consumption = energy_consumption.concat(day.consumo)
                    energy_consumption_norm = energy_consumption_norm.concat(day.consumo_normal)
                    energy_cost = energy_cost.concat(day.cost)
                    energy_cost_norm = energy_cost_norm.concat(day.cost_normal)
                    cost_diff = cost_diff.concat(day.cost_diff)
                })

                const new_temperature = getAvgByPeriod(data.period, values)
                const new_modes = filterModesByPeriod(data.period, ecos, comfs, offs)
                const new_labels = filterLabelByPeriod(data.period, labels)
                const new_cost_diff = cost_diff.reduce((partialSum, a) => partialSum + a, 0);

                const new_energy_consumption = getSumByPeriod(data.period, energy_consumption)
                const new_energy_consumption_norm = getSumByPeriod(data.period, energy_consumption_norm)
                const new_energy_cost = getSumByPeriod(data.period, energy_cost)
                const new_energy_cost_norm = getSumByPeriod(data.period, energy_cost_norm)

                let cum_comf = getSumByPeriod(data.period, comfs_total)
                cum_comf = generate_cumulative(cum_comf)

                let cum_ene_con = getSumByPeriod(data.period, energy_consumption)
                cum_ene_con = generate_cumulative(cum_ene_con)
                let cum_ene_con_norm = getSumByPeriod(data.period, energy_consumption_norm)
                cum_ene_con_norm = generate_cumulative(cum_ene_con_norm)
                let cum_ene_cost = getSumByPeriod(data.period, energy_cost)
                cum_ene_cost = generate_cumulative(cum_ene_cost)
                let cum_ene_cost_norm = getSumByPeriod(data.period, energy_cost_norm)
                cum_ene_cost_norm = generate_cumulative(cum_ene_cost_norm)

                setTemperature(new_temperature)
                setOffs(new_modes.offs)
                setEcos(new_modes.ecos)
                setComforts(new_modes.comfs)
                setLabels(new_labels)
                setIsHourly(data.period === 1)
                setCumComf(cum_comf)

                setEnergy_Cons(new_energy_consumption)
                setCum_Energy_Cons(cum_ene_con)
                setEnergy_Cons_Norm(new_energy_consumption_norm)
                setCum_Energy_Cons_Norm(cum_ene_con_norm)
                setEnergy_Cost(new_energy_cost)
                setCum_Energy_Cost(cum_ene_cost)
                setEnergy_Cost_Norm(new_energy_cost_norm)
                setCum_Energy_Cost_Norm(cum_ene_cost_norm)

                setCost_Diff(new_cost_diff)

                setIsLoading(false)
            })
    }


    return (
        <>
        <Card>
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
                        <FormInputSlider
                            name={"comf_slider"}
                            label={"Minimum Comfort Score"}
                            control={control}
                            min={MIN_COMF}
                            max={MAX_COMF}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <FormInputSwitch 
                            style={{color: "#e60000"}}
                            name={"off_input"}
                            label={"Allow Off"}
                            control={control}
                            defaultChecked={STARTING_OFF}
                        />
                    </Col>
                </Row>

                <br/>
                <Row className="justify-content-md-center">
                    <Col xs={2}></Col>
                    <Col xs={4}>
                        <Button variant={"contained"} style={{backgroundColor: "#e60000"}} onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Col>
                    <Col xs={2}></Col>

                </Row>
                <br/>
            </form>
        </Card>
        </>
    )
}

export default Forms