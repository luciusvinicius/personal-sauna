import React from "react"
import { Controller } from "react-hook-form";
import {Slider} from "@mui/material";


const FormInputSlider = ({control, name, label, min, max, step=4}) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <>
                    <p>{label}</p>
                    <Slider
                        onChange={onChange}
                        value={value}
                        min={min}
                        max={max}
                        valueLabelDisplay={"auto"}
                        step={step}
                    />
                </>

            )}
        />
    )
}

export default FormInputSlider