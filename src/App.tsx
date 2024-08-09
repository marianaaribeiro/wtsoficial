import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "simplebar-react/dist/simplebar.min.css";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";

import RoutesAll from "./route";
import { createEmotionCache } from "./hooks/useCreateEmotionCache";
import { AuthConsumer, AuthProvider } from "./contexts/authContext";
import "./index.css";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = () => {

    const queryClient = new QueryClient()

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <Helmet>
                <title>Company WTS</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Helmet>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <CssBaseline />
                        <AuthConsumer>
                            {(auth: any) =>
                                auth?.isLoading ? (
                                    <SplashScreen />
                                ) : (
                                    <RoutesAll />
                                )
                            }
                        </AuthConsumer>
                    </AuthProvider>
                </QueryClientProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
};

export default App;
