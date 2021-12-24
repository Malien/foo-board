import React from "react";
import CharRestrictionIndicator from "./CharRestrictionIndicator";
import Label from "../Label";

interface Props {
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isValid: boolean;
  errorMessage?: string;
  maxLength: number;
}

function DescriptionField({
  value,
  onBlur,
  onChange,
  innerRef,
  errorMessage,
  maxLength,
  isValid,
}: Props & { innerRef?: React.Ref<HTMLTextAreaElement> }) {
  return (
    <Label label="Description" invalid={!isValid} className="mb-8">
      <textarea
        name="title"
        className="w-full h-full px-3 py-2 outline-none min-h-[150px]"
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

export default React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => (
  <DescriptionField {...props} innerRef={ref} />
));
