import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

const TextMaskPhone = forwardRef(function TextMaskPhone(props, ref) {
    const { onChange, name, ...other } = props as any;
    return (
        <IMaskInput
            {...other}
            mask="000 000 000"
            definitions={{
                "#": /[1-9]/,
            }}
            name="mobile"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: name, value } })}
            overwrite
        />
    );
});

export default TextMaskPhone;
