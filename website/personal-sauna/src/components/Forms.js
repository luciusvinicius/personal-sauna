import React, {useState} from "react";

import { Controller, useForm } from "react-hook-form";
import {Button, TextField} from "@mui/material";
import FormInputText from "./FormInputText";
import {Col, Row} from "react-bootstrap";
import FormInputDropdown from "./FormInputDropdown";
import {FormInputDatePicker} from "./FormInputDatePicker";

const Forms = () => {
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            sus: "amogus"
        }
    });
    const onSubmit = (data) => console.log(data);

    const options = [
        {
            label: "Dropdown Option 1",
            value: "1",
        },
        {
            label: "Dropdown Option 2",
            value: "2",
        },
    ];

    return (
        <>
            <form>
                <Row>
                    <Col xs={6}>
                        <FormInputText
                            name={"sus"}
                            label={"sussy baka"}
                            control={control}
                        />
                    </Col>
                    <Col xs={6}>
                        <FormInputDropdown
                            name={"sus2"}
                            label={"sussy baka2"}
                            control={control}
                            options={options}
                        />
                    </Col>
                </Row>

                <FormInputDatePicker
                    name={"date"}
                    label={"date sus"}
                    control={control}
                />

                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </form>
        </>
    )
}

export default Forms