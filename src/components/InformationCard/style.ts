import { CSSProperties } from "react";

const useStyle = () => {

    const containerStyleDefault: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EBEEFE',
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        padding: 7
    };

    const titleStyleDefault: CSSProperties = {
        fontSize: 'larger',
        fontWeight: 'bold',
    };

    const descriptionStyleDefault: CSSProperties = {
        fontSize: 'medium',
        color: '#79747E'
    };

    return {
        containerStyleDefault,
        titleStyleDefault,
        descriptionStyleDefault
    };
};

export default useStyle;
