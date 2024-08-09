import { useFlags } from "./useFlags";

export const formatPhoneCode = (value: number) => {
	const list = useFlags.filter((item, id) => {
		if (id === Number(value)) {
			return item.code;
		}
	});

	return list[0].phone;
};

export const formatPhoneText = (value: string) => {
	let text = "";
	if (value.split("-")) {
		const phone = value.split("-");
		const itens = phone[0].split("+");
		text = itens[1];
	}

	let index = 0;
	if (text !== "") {
		const list = useFlags.filter((item, id) => {
			if (item.phone === text) {
				index = id;
				return id;
			}
		});
		return list.length > 0 ? index : 182;
	} else {
		return 182;
	}
};
