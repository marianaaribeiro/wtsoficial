import { IMaskInput } from "react-imask";

export const InputMaskPhone = (props: any) => {
	const { onChange, name, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="000 000 000"
			definitions={{
				"#": /[1-9]/,
			}}
			onAccept={(value) => onChange({ target: { name: name, value } })}
			overwrite
		/>
	);
}
