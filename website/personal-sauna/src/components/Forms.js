import React, {useEffect, useState} from "react";

import {Controller, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import FormInputText from "./FormInputText";
import {Col, Row} from "react-bootstrap";
import FormInputDropdown from "./FormInputDropdown";
import {FormInputDatePicker} from "./FormInputDatePicker";
import {periods, parameters} from "./FormOptions";
import {getData} from "../api/API";

const STARTING_DATE = "2021-12-01T01:00:00Z"
const ENDING_DATE = "2021-12-31T01:00:00Z"
const STARTING_PERIOD = 24
const STARTING_PARAMETER = "external_temp"

const filterModesByPeriod = (period=1, ecos=[], comfs=[], offs=[]) => {

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

    for (let i=0; i < ecos.length; i++) {
        let idx = Math.floor(i/period)
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
        comfs: new_offs,
        offs: new_comfs
    }
}

const filterValueByPeriod = (period=1, values=[]) => {
    let new_val = []

    let idx = 0
    let hadLastDivision = false
    for (let i=0; i < values.length; i++) {
        idx = Math.floor(i/period)
        hadLastDivision = false
        if (idx >= new_val.length) {
            new_val[idx-1] = new_val[idx-1]/period
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

const Forms = ({setLabels, setOffs, setEcos, setComforts, setIsLoading, setValues}) => {

    const {handleSubmit, reset, control} = useForm({
        defaultValues: {
            start_date: STARTING_DATE,
            end_date: ENDING_DATE,
            period: STARTING_PERIOD,
            parameter: STARTING_PARAMETER
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        const response = getData(data)
        // .then(response => {
        console.log("response", response)
        setLabels(response.labels)
        const new_value = filterValueByPeriod(data.period, response.temps)
        setValues(new_value)
        const new_period = filterModesByPeriod(data.period, response.ecos, response.comforts, response.offs)
        setOffs(new_period.offs)
        setEcos(new_period.ecos)
        setComforts(new_period.comfs)

        // })
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