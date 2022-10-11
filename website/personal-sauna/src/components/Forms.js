import React, {useState} from "react";

import { Controller, useForm } from "react-hook-form";
import {Button, TextField} from "@mui/material";
import FormInputText from "./FormInputText";

const Forms = () => {
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <form>
                <FormInputText
                    name={"sus"}
                    label={"sussy baka"}
                    control={control}
                />
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </form>
        </>
    )
}

export default Forms