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

const STARTING_DATE = "2021-12-01T00:00:00Z"
const ENDING_DATE = "2021-12-31T00:00:00Z"
const STARTING_PERIOD = 24
const STARTING_PARAMETER = "external_temp"






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
    }) => {

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
                let energy_consumption_norm = []
                let energy_cost = []
                let energy_cost_norm = []
                response.map(day => {
                    values = values.concat(day.temps)
                    ecos = ecos.concat(day.modes_bool.eco)
                    comfs = comfs.concat(day.modes_bool.comf)
                    offs = offs.concat(day.modes_bool.off)
                    labels = labels.concat(day.date)
                    energy_consumption = energy_consumption.concat(day.consumo)
                    energy_consumption_norm = energy_consumption_norm.concat(day.consumo_normal)
                    energy_cost = energy_cost.concat(day.cost)
                    energy_cost_norm = energy_cost_norm.concat(day.cost_normal)
                })

                const new_temperature = getAvgByPeriod(data.period, values)
                const new_modes = filterModesByPeriod(data.period, ecos, comfs, offs)
                const new_labels = filterLabelByPeriod(data.period, labels)

                const new_energy_consumption = getSumByPeriod(data.period, energy_consumption)
                const new_energy_consumption_norm = getSumByPeriod(data.period, energy_consumption_norm)
                const new_energy_cost = getSumByPeriod(data.period, energy_cost)
                const new_energy_cost_norm = getSumByPeriod(data.period, energy_cost_norm)


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

                setEnergy_Cons(new_energy_consumption)
                setCum_Energy_Cons(cum_ene_con)
                setEnergy_Cons_Norm(new_energy_consumption_norm)
                setCum_Energy_Cons_Norm(cum_ene_con_norm)
                setEnergy_Cost(new_energy_cost)
                setCum_Energy_Cost(cum_ene_cost)
                setEnergy_Cost_Norm(new_energy_cost_norm)
                setCum_Energy_Cost_Norm(cum_ene_cost_norm)

                setIsLoading(false)
            })
    }


    return (
        <>
        <Card style={{minHeight:"450px"}}>
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
        </Card>
        </>
    )
}

export default Forms