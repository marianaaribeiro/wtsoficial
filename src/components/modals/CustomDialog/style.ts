import { CSSProperties } from "react";

const useStyle = () => {
	const containerDialog: CSSProperties = {
		background: "#00000061",
		textAlign: "center",
		border: "none",
	};

	const containerItem: CSSProperties = {
		background: "#fff",
		color: "#000",
		alignItems: "center",
		display: "inline",
	};
	const containerText: CSSProperties = {
		color: "#FFFFFFDE",
		background: "#0F298F",
	};

	const containerButton: CSSProperties = {
		color: "#000",
		background: "#41B8D4 0% 0% no-repeat padding-box",
		boxShadow: "0px 3px 3px #0000005C",
		opacity: 1,
	};

	return {
		containerDialog,
		containerItem,
		containerText,
		containerButton,
	};
};

export default useStyle;
