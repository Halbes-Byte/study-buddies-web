import React from 'react';
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {deDE} from "@mui/x-date-pickers/locales";

interface TimePickerProps {
    date: Dayjs;
    time: Dayjs;
    setDate: (date: Dayjs) => void;
    setTime: (time: Dayjs) => void;
    label: string;
}

dayjs.locale('de');

export function TimePickerComponent({date, time, setTime, setDate, label}: TimePickerProps) {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="de"
            localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <div className={"ml-5 flex-row mt-4 flex w-80 h-12 items-center gap-2 md:mb-0 mb-8"}>
                <label htmlFor="To"
                       className="mr-3 block text-bs font-medium text-white ">{label}</label>
                <div className="flex md:flex-row flex-col gap-2 ">
                    <DatePicker
                        sx={{
                            '& .MuiIconButton-root': {
                                color: '#9fa3a8',
                            },
                        }}
                        minDate={dayjs()}
                        className="mt-1 block bg-[#333C4F] w-36 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                        slotProps={{
                            textField: {
                                size: 'small', variant: 'standard', InputProps: {
                                    disableUnderline: true,
                                    sx: {
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        color: '#e2e8f0',
                                    }
                                },
                            }
                        }}
                        format="DD.MM.YYYY" defaultValue={date} value={date}
                        onChange={(newDate: Dayjs | null) => {
                            if (newDate) setDate(newDate);
                        }}
                    />
                    <TimePicker
                        sx={{
                            '& .MuiIconButton-root': {
                                color: '#9fa3a8',
                            },
                        }}
                        className="mt-1 block bg-[#333C4F] w-24 px-2 py-1 mb-4 border rounded-full shadow-sm border-[#333C4F] placeholder-gray-400 placeholder:text-xs"
                        slotProps={{
                            textField: {
                                size: 'small', variant: 'standard', InputProps: {
                                    disableUnderline: true,
                                    sx: {
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        color: '#e2e8f0',
                                    }
                                },
                            }
                        }}
                        ampm={false} format="HH:mm" value={time}
                        onChange={(newTime: Dayjs | null) => {
                            if (newTime)
                                setTime(newTime);
                        }}
                    />
                </div>
            </div>
        </LocalizationProvider>
    )
}