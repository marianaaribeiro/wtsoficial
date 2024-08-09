import { CSSProperties } from "react";

const useStyle = () => {
    
    const containerStyleDefault: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
    }

    const switchStyleDefault: any = {
        width:'70px',
        '.MuiSwitch-track': {
            backgroundColor: 'white',
            border: '2px solid #6366F1'
        },
        '.MuiSwitch-thumb': {
            backgroundColor: '#483C69',
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            '& +.MuiSwitch-track': {
                backgroundColor: '#483C69',
            },
            '& +.MuiSwitch-thumb': {
                backgroundColor: 'white',
                border: '2px solid #6366F1'
            }
        },
    }

    const textStyleDefault: CSSProperties = {
        padding: '5px'
    }    

    return {
        containerStyleDefault,
        switchStyleDefault,
        textStyleDefault
    };
};

export default useStyle;
