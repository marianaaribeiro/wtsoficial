
import { ReactNode, Suspense } from 'react';
import LoadingCustom from '../../components/loadingCustom';
import { Box } from '@mui/system';


interface FallbackProps {
  children: ReactNode;
}

export const Fallback = ({ children }: FallbackProps): JSX.Element => {
    return (
        <>
            <Suspense fallback={<Box sx={{ display: "flex", alignItems: "center", height: "100vh", width: "100%", justifyContent: "center" }}><LoadingCustom /></Box>}>{children}</Suspense>
        </>
    );
};
