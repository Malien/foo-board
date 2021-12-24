import React from "react";
import CharRestrictionIndicator from "./CharRestrictionIndicator";
import Label from "../Label";

interface Props {
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  errorMessage?: string;
  maxLength: number;
}

function TitleField({
  value,
  onBlur,
  onChange,
  innerRef,
  errorMessage,
  maxLength,
  isValid,
}: Props & { innerRef?: React.Ref<HTMLInputElement> }) {
  return (
    <Label label="Title*" invalid={!isValid} className="mb-8">
      <input
        name="title"
        required
        className="w-full outline-none px-4 py-2 [background:none]"
        // maxLength={MAX_TITLE}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        ref={innerRef}
      />
      <CharRestrictionIndicator length={value.length} maxLength={maxLength} />
      {errorMessage && (
        <div className="absolute left-0 -bottom-[18px] text-rose-600 px-1 text-sm">
          {errorMessage}
        </div>
      )}
    </Label>
  );
}

export default React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <TitleField {...props} innerRef={ref} />
));
