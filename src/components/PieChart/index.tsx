import { PieChart } from '@mui/x-charts/PieChart';
import useStyle from './style';
import { IProps } from './IProps';
import { Box } from '@mui/system';

const LegendItem = ({ color, label}: any) => {
    return (
        <Box sx={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
            >
                <circle cx="4.5" cy="4.8689" r="4" fill={color} />
            </svg>
            <span style={{
                paddingLeft: 5
            }}>{label}</span>
        </Box>
    );
}

const CustomPieChart = (props: IProps) => {
    const { data, containerStyle, size } = props;
    const { defaultSize, defaultContainerStyle } = useStyle();
    const sizeProp = size ? size : defaultSize;
    
    return data ? 
        <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
            <PieChart
                series={[
                    {
                    // arcLabel: (item) => `${item.label} (${item.value})`,                    
                    // arcLabelMinAngle: 45,
                        arcLabel: (item) => `${item.value}`,
                        data,
                    },
                ]}
                sx={containerStyle ? containerStyle : defaultContainerStyle}
                {...sizeProp}
                slotProps={{
                    legend: {
                        hidden: true
                    }
                }}
            />

            <Box sx={{
                columnCount: 4,
                paddingLeft: '1rem'
            }}>
                {data.map((item: any) => {
                    return <LegendItem color={item.color} label={item.label} />
                })}
            </Box>
            
        </Box>        
        : null;
}

export default CustomPieChart;