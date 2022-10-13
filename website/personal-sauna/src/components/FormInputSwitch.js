import React from "react";

import { Controller } from "react-hook-form";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

const FormInputSwitch = ({name, control, label, defaultChecked}) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={onChange} value={value} label={label}
                                defaultChecked={defaultChecked}
                                sx={{
                                    color: '#e60000',
                                }}
                            />
                        }
                        label={label}
                    />

                </FormGroup>

            )}
        />
    )
}

export default FormInputSwitch