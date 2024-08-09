import { CSSProperties } from "react";

const useStyle = () => {
    
    const containerStyleDefault: CSSProperties = {
        height: '2rem',
        border: '1px solid blue',
        borderRadius: '8px',
        padding: '0 5px',
        display: 'flex',
        alignItems: 'center'
    }

    return {
        containerStyleDefault,
    };
};

export default useStyle;
