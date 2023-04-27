import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

function FDateTimePicker({ name, label, ...other }) {
  const { control } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            defaultValue={new Date()}
            label={label}
            value={value}
            onChange={(value) => onChange(dayjs(value))}
            slotProps={{ textField: { variant: "outlined" } }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default FDateTimePicker;
