import React, {useState} from "react"
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import {palette} from "@mui/system"

import {Controller } from "react-hook-form";


const FormButtonSubmit = ({name, control, onSubmit, handleSubmit}) => {

    const RED = "rgb(230, 0 ,0)"
    const ITEMS = ["Hourly", "Daily", "Weekly"]
    const PERIODS = [1, 24, 24*7]

    const FAKE_RED = "rgb(250, 0, 0, 0.5)"
    const BLACK_RED = "rgb(190, 0, 0)"

    const [val, setVal] = useState("fds")

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RadioGroup
                            row
                            aria-labelledby="segmented-controls-example"
                            name="justify"
                            value={value}
                            onChange={(e) => {
                                onChange(e)
                                console.log(handleSubmit)
                                handleSubmit(onSubmit)()
                            }}
                            style={{margin: "auto"}}
                            sx={{
                                minHeight: 48,
                                padding: '4px',
                                borderRadius: 'md',
                                bgcolor: 'neutral.softBg',
                                '--RadioGroup-gap': '4px',
                                '--Radio-action-radius': '8px',
                            }}
                        >
                            {ITEMS.map((item, i) => (
                                <Radio
                                    key={item}
                                    color="neutral"
                                    value={PERIODS[i]}
                                    disableIcon
                                    label={item}
                                    variant="plain"

                                    sx={{
                                        px: 2,
                                        alignItems: 'center',
                                    }}
                                    style={{color: "white"}}
                                    componentsProps={{
                                        action: ({ checked }) => ({
                                            sx: {
                                                bgcolor: FAKE_RED,
                                                "&:hover": {
                                                  bgcolor: BLACK_RED
                                                },
                                                ...(checked && {
                                                    bgcolor: RED,
                                                    boxShadow: 'md',
                                                    '&:hover': {
                                                        bgcolor: BLACK_RED,
                                                    },

                                                }),
                                            },
                                        }),
                                    }}
                                />
                            ))}
                        </RadioGroup>
                    </Box>
                )}
            />

        </>
    )
}

export default FormButtonSubmit