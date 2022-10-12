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
const STARTING_PERIOD = "daily"
const STARTING_PARAMETER = "external_temp"


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
        setValues(response.temps)
        setOffs(response.offs)
        setEcos(response.ecos)
        setComforts(response.comforts)
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