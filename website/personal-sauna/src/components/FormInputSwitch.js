import React, {useEffect} from "react";

import { Controller } from "react-hook-form";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

const SWITCH_TRACK = "MuiSwitch-track"
const SWITCH_CIRCLE = "MuiSwitch-thumb"

const FormInputSwitch = ({offInput, setOffInput, label, defaultChecked, color}) => {

    useEffect(() => {
        const switchInput = document.getElementsByClassName(SWITCH_TRACK)
        const switchCircle = document.getElementsByClassName(SWITCH_CIRCLE)
        let tracker = switchInput[0]
        let circle =  switchCircle[0]
        tracker.style.backgroundColor = offInput ? color : "black"
        circle.style.backgroundColor = offInput ? color : "white"


    }, [offInput])

    return (
        // <Controller
        //     name={name}
        //     control={control}
        //     render={({ field: { onChange, value } }) => (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={() => {setOffInput(!offInput)}}
                                value={offInput}
                                label={label}
                                defaultChecked={defaultChecked}
                                // sx={{
                                //     color: '#e60000',
                                // }}
                                classes={{
                                    // switchBase: switchClasses.switchBase,
                                    // thumb: switchClasses.thumb,
                                    // track: switchClasses.track,
                                    checked: {
                                        "& + $bar": {
                                            opacity: 1.0,
                                            backgroundColor: "rgb(129, 171, 134)" // Light green, aka #74d77f
                                        }
                                    },

                                }}
                            />
                        }
                        label={label}
                    />

                </FormGroup>

            // )}
        // />
    )
}

export default FormInputSwitch