import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FSelect({ name, label, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default FSelect;
