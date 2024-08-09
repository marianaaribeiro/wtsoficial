import { Box, InputAdornment } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { IProps } from "./IProps";
import useGoupDataHelper from "./groupDataEndDataStart.helper";

const GroupDataEndDataStart = ({ valueDataStart,
    isLoading,
    isRefetching,
    valueDataEnd,
    values,
    errors,
    touched,
    useFormik,
    disabled,
    setFieldValue,
    handleOnchangeDateEnd,
    handleOnchangeDateStart }: IProps) => {

    const { handleDateEnd, handleDateStart } = useGoupDataHelper()
    return (
        <>
            {useFormik && values && errors && touched && setFieldValue ?
                <Box sx={{
                    width: { lg: "auto", md: "auto", sm: "100%", xs: "94%" },
                    gap: "15px",
                    display: "flex",
                    borderRadius: 30,
                    bgcolor: 'primary.light',
                    height: 105,
                    mt: { lg: -2, md: -2, sm: 0, xs: 0 },
                    mx: { lg: 3, md: 0, sm: 0, xs: 0 },
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        gap: "15px",
                        display: "flex",
                        mx: 2
                    }}>
                        <MobileDatePicker
                            sx={{ ml: 1, border: '0.5px solid primary.main' }}
                            label="Data inicial"
                            value={values.dataStart}
                            onChange={(start: any) => {
                                handleDateStart(start);
                                setFieldValue("dataStart", start)
                            }}
                            disabled={disabled}
                            format="DD/MM/YYYY"
                            views={['day', 'month', 'year']}
                            slotProps={{
                                textField: {
                                    focused: true,
                                    helperText: errors.dataStart,
                                    error: errors.dataStart,
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarMonthIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                },
                            }}
                        />
                        <MobileDatePicker
                            sx={{ mr: 1, border: '0.5px solid primary.main' }}
                            label="Data Fim"
                            value={values.dataEnd}
                            onChange={(end: any) => {
                                handleDateEnd(end);
                                setFieldValue("dataEnd", end)
                            }}
                            disabled={disabled}
                            format="DD/MM/YYYY"
                            views={['day', 'month', 'year']}
                            slotProps={{
                                textField: {
                                    focused: true,
                                    helperText: errors.dataEnd,
                                    error: errors.dataEnd,
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarMonthIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>
                :
                <Box sx={{
                    width: { lg: "auto", md: "auto", sm: "100%", xs: "94%" },
                    gap: "15px",
                    display: "flex",
                    borderRadius: 30,
                    bgcolor: 'primary.light',
                    height: 105,
                    mt: { lg: -2, md: -2, sm: 0, xs: 0 },
                    mx: { lg: 3, md: 0, sm: 0, xs: 0 },
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        gap: "15px",
                        display: "flex",
                        mx: 2
                    }}>
                        <MobileDatePicker
                            sx={{ ml: 1, border: '0.5px solid primary.main' }}
                            label="Data inicial"
                            value={valueDataStart.noFormart}
                            onChange={handleOnchangeDateStart}
                            disabled={isLoading || isRefetching}
                            format="DD/MM/YYYY"
                            views={['day', 'month', 'year']}
                            slotProps={{
                                textField: {
                                    focused: true,
                                    helperText: valueDataStart.error || "",
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarMonthIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                },
                            }}
                        />
                        <MobileDatePicker
                            sx={{ mr: 1, border: '0.5px solid primary.main' }}
                            label="Data Fim"
                            value={valueDataEnd.noFormart}
                            onChange={handleOnchangeDateEnd}
                            disabled={isLoading || isRefetching}
                            format="DD/MM/YYYY"
                            views={['day', 'month', 'year']}
                            slotProps={{
                                textField: {
                                    focused: true,
                                    helperText: valueDataEnd.error || "",
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarMonthIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>
            }
        </>
    );
};

export default GroupDataEndDataStart;
