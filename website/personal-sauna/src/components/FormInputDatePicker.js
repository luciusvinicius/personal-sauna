import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Controller } from "react-hook-form";

export const FormInputDatePicker = ({name, label, control}) => {
    // const [value, setValue] = React.useState(null);

    return (
        <Controller
            control={control}
            name={name}
            render={({field: { onChange, value }}) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={label}
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            )}
        />

    );
}

