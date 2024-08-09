import { pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { CSSProperties } from "react";


const useStyle = () => {
    const defaultSize: CSSProperties = {
        width: 400,
        height: 200,
    };    
    
    
    const defaultContainerStyle: CSSProperties = {
        [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold'
        },
        // [`& .${legendClasses.root}`]: {
        //     display: 'flex',
        //     color: 'yellow'
        // },
    }

    return {
        defaultSize,
        defaultContainerStyle
    };
};

export default useStyle;
