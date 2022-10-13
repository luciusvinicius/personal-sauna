import React from "react";

import {useForm} from "react-hook-form";
import {Button} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import FormInputDropdown from "./FormInputDropdown";
import {FormInputDatePicker} from "./FormInputDatePicker";
import {periods, parameters} from "./FormOptions";
import {getData} from "../algo/algotithm";
import {filterLabelByPeriod, filterModesByPeriod, filterValueByPeriod, generate_cumulative} from "../helpers";


const STARTING_DATE = "2021-12-01T00:00:00Z"
const ENDING_DATE = "2021-12-31T00:00:00Z"
const STARTING_PERIOD = 24
const STARTING_PARAMETER = "external_temp"



const Forms = ({setLabels, setOffs, setEcos, setComforts, setIsLoading,
                   setTemperature, setIsHourly, setEnergy_Cons, setCumEnergyCost}) => {

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
                let energy_cost = []
                response.map(day => {
                    values = values.concat(day.temps)
                    ecos = ecos.concat(day.modes_bool.eco)
                    comfs = comfs.concat(day.modes_bool.comf)
                    offs = offs.concat(day.modes_bool.off)
                    labels = labels.concat(day.date)
                    energy_consumption = energy_consumption.concat(day.consumo)
                    energy_cost = energy_cost.concat(day.cost)
                })

                const new_value = filterValueByPeriod(data.period, values)
                const new_modes = filterModesByPeriod(data.period, ecos, comfs, offs)
                const new_labels = filterLabelByPeriod(data.period, labels)
                const new_energy_consumption = filterValueByPeriod(data.period, energy_consumption)
                const cum_energy_cost = generate_cumulative(energy_cost)
                const new_energy_cost = filterValueByPeriod(data.period, cum_energy_cost)

                setTemperature(new_value)
                setOffs(new_modes.offs)
                setEcos(new_modes.ecos)
                setComforts(new_modes.comfs)
                setLabels(new_labels)
                setIsHourly(data.period === 1)
                setEnergy_Cons(new_energy_consumption)
                setCumEnergyCost(new_energy_cost)

                // console.log("new value", new_value)
                // console.log("new modes", new_modes)
                // console.log("new labels", new_labels)
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