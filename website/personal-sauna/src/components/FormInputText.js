import React from "react";

import { Controller } from "react-hook-form";
import {TextField} from "@mui/material";

const FormInputText = ({name, control, label}) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} label={label} />
            )}
        />
    )
}

export default FormInputText