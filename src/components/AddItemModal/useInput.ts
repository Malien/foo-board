import React, { useRef, useState } from "react";

export interface UseInputProps {
  value: string;
  onBlur: (e: React.FocusEvent<{ value: string }>) => void;
  onChange: (e: React.ChangeEvent<{ value: string }>) => void;
  ref: React.Ref<any>;
}

export interface UseInputValidation {
  isValid: boolean;
  errorMessage?: string;
  validate: () => boolean;
}

export default function useInput(
  initialValue: string,
  maxLength: number
): [UseInputProps, UseInputValidation] {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const ref = useRef<HTMLElement>(null);

  const onChange = (e: React.ChangeEvent<{ value: string }>) => {
    setValue(e.target.value);
    if (e.target.value.length <= maxLength) {
      setIsValid(true);
    }
  };
  const onBlur = (e: React.FocusEvent<{ value: string }>) => {
    if (value.length > maxLength) {
      setIsValid(false);
    }
  };

  const validate = () => {
    if (value.length > maxLength) {
      setIsValid(false);
      ref.current?.focus();
      return false;
    }
    return isValid;
  };

  return [
    { value, onBlur, onChange, ref: ref as React.Ref<any> },
    {
      isValid,
      errorMessage: isValid ? undefined : "Too many characters",
      validate,
    },
  ];
}
