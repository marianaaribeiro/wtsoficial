import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

const TextMaskNumber = forwardRef(function TextMaskNumber(props, ref) {
    const { onChange, name, ...other } = props as any;

    return (
        <IMaskInput
            {...other}
            name="number"
            type="number"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: name, value } })}
            overwrite 
            sx={other.sx}
        />
    );
});

export default TextMaskNumber;