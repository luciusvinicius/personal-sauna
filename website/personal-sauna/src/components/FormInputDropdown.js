import React from "react";

import {Controller } from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";



const FormInputDropdown = ({name, control, label, options=[]}) => {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <FormControl fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select onChange={onChange} value={value}>
                        {options.map((option) => {
                            return (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            )}
        />
    )
};

export default FormInputDropdown