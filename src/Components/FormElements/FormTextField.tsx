import React, { ChangeEvent } from "react";
import { TextField, InputAdornment } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { OverridableStringUnion } from '@mui/types';

import { FormElementsThemes } from "Themes/Components/FormElementsThemes";

export interface TextFieldPropsColorOverrides { }

export type TextInterface = {
  label: string;
  placeholder?: string;
  error?: { isError: boolean; errorMsg: string | undefined };
  value: string | number;
  onChange: (data: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
  required?: boolean;
  type?: string;
  fullWidth?: boolean;
  name: string;
  color?: OverridableStringUnion<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning', TextFieldPropsColorOverrides>;
  endAdornment?: any;
  [others: string]: any;
}

export const FormTextField: React.FC<TextInterface> = (props) => {
  const { label, placeholder, error, onChange = () => { }, value, required, type, fullWidth, name, color = 'primary', endAdornment, ...others } = props;

  return (
    <ThemeProvider theme={FormElementsThemes}>
      <TextField
        variant="outlined"
        size="small"
        color={color || "primary"}
        type={type}
        fullWidth={fullWidth}
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        required={required}
        error={error?.isError}
        helperText={error?.isError ? error.errorMsg : ""}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {endAdornment}
            </InputAdornment>
          ),
        }}
        {...others}
      />
    </ThemeProvider>
  );
};
