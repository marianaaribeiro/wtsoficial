import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { IProps, MenuItemIProps } from "./IProps";

const InputSelects = ({ title, sx, label, valueSelect, menuItem, disabled, handleChangeLanguage }: IProps) => {
    return (
        <FormControl variant="standard" sx={sx ? sx : { m: 1, width: 180 }}>
            <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={valueSelect}
                label={label}
                onChange={handleChangeLanguage}
                defaultValue={menuItem && menuItem[0]?.value}
                disabled={disabled ? disabled : false}
            >
                {menuItem?.map((item: MenuItemIProps, index: number) => (
                    <MenuItem key={index} value={item.value}>{item.context}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default InputSelects;
