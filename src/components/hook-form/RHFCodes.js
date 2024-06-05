import { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Stack, TextField } from "@mui/material";

export default function RHFCodes({ keyName = "", inputs = [], ...other }) {
  const codesRef = useRef(null);
  const { control } = useFormContext();

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace(keyName, "");
    const fieldIntIndex = Number(fieldIndex);
    const nextfield = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );
    const prevfield = document.querySelector(
      `input[name=${keyName}${fieldIntIndex - 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }

    if (value.length >= maxLength && fieldIntIndex < 6 && nextfield !== null) {
      nextfield.focus();
    }

    handleChange(event);
  };

  const handleKeyDown = (event) => {
    const { name, value } = event.target;
    const fieldIndex = name.replace(keyName, "");
    const fieldIntIndex = Number(fieldIndex);
    const prevfield = document.querySelector(
      `input[name=${keyName}${fieldIntIndex - 1}]`
    );

    if (
      event.key === "Backspace" &&
      value.length === 0 &&
      fieldIntIndex > 0 &&
      prevfield !== null
    ) {
      prevfield.focus();
    }
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder="-"
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onKeyDown={handleKeyDown}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}
