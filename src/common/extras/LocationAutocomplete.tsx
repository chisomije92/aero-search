"use client";

import { ILocation } from "@/src/types/locations";
import { Theme } from "@emotion/react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  SxProps,
  TextField,
} from "@mui/material";

interface LocationAutocompleteProps {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;

  options: ILocation[];
  value: ILocation | null;
  inputValue: string;

  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  disabled?: boolean;
  autoComplete?: boolean;

  onChange: (value: ILocation | null, reason: AutocompleteChangeReason) => void;
  onInputChange: (value: string, reason: AutocompleteInputChangeReason) => void;
  sx?: SxProps<Theme> | undefined;
}

export function LocationAutocomplete({
  label,
  placeholder,
  icon,
  options,
  value,
  inputValue,
  autoComplete,
  loading = false,
  loadingText = "Loading results…",
  noOptionsText = "No locations found",
  disabled = false,
  sx,
  onChange,
  onInputChange,
}: LocationAutocompleteProps) {
  return (
    <Autocomplete
      options={options}
      value={value}
      inputValue={inputValue}
      loading={loading}
      loadingText={loadingText}
      disabled={disabled}
      autoComplete={autoComplete}
      includeInputInList
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value?.name}
      noOptionsText={noOptionsText}
      onChange={(_, newValue, reason) => {
        onChange(newValue, reason);
      }}
      onInputChange={(_, newInputValue, reason) => {
        onInputChange(newInputValue, reason);
      }}
      renderOption={(props, option) => (
        <span {...props} key={`${option.iataCode}-${option.id}`}>
          {option.name}
        </span>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  {icon}
                  {params.InputProps.startAdornment}
                </>
              ),
            },
          }}
          sx={sx}
        />
      )}
    />
  );
}
