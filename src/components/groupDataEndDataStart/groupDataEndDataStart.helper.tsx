import { useState } from "react";



const useGoupDataHelper = () => {

    const [dataStart, setDataStart] = useState<any>({
        formart: null,
        noFormart: null,
        error: null
    });
    const [dataEnd, setDataEnd] = useState<any>({
        formart: null,
        noFormart: null,
        error: null
    });

    const handleDateEnd = (end: any) => {
        const dates = new Date(String(end)).toLocaleDateString('en', {
            month: '2-digit',
            day: '2-digit',
            year: "numeric",
        })
        const formatValue = dates.split("/")
        const value = formatValue[2] + "-" + formatValue[0] + "-" + formatValue[1]

        setDataEnd({
            formart: value,
            noFormart: end,
            error: null
        });

    }

    const handleDateStart = (start: any) => {
        const dates = new Date(String(start)).toLocaleDateString('en', {
            month: '2-digit',
            day: '2-digit',
            year: "numeric",
        })
        const formatValue = dates.split("/")
        const value = formatValue[2] + "-" + formatValue[0] + "-" + formatValue[1]

        setDataStart({
            formart: value,
            noFormart: start,
            error: null
        });
    }

    return {
        dataStart,
        dataEnd,
        handleDateEnd,
        handleDateStart,
    };
};

export default useGoupDataHelper;
