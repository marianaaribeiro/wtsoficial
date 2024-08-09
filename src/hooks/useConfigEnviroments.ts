import { useState, useEffect } from 'react';

// Define an interface for configuration
interface ConfigProject {
    list: {
        host: {
            API_EMAIL_Url: string;
            API_URL_CBH: string;
            WEB_URL_CBH: string;
            development: {
                API_EMAIL_Url: string;
                API_URL_CBH: string;
                WEB_URL_CBH: string;
            };
        };
        version: string;
    };
}

// Function to search for the configuration
const getConfig = async (): Promise<ConfigProject> => {
    const response = await fetch('./configs.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const configProject: ConfigProject = await response.json();
    return configProject;
};

// Custom hook to load configuration variables
const useConfigEnviroments = () => {
    const [config, setConfig] = useState<{
        API_EMAIL_Url: string;
        API_URL_CBH: string;
        WEB_URL_CBH: string;
        version: string;
    }>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const configProject = await getConfig();

                const API_EMAIL_Url =
                    process.env.NODE_ENV === "development"
                        ? configProject.list.host.development.API_EMAIL_Url
                        : configProject.list.host.API_EMAIL_Url;

                const API_URL_CBH =
                    process.env.NODE_ENV === "development"
                        ? configProject.list.host.development.API_URL_CBH
                        : configProject.list.host.API_URL_CBH;

                const WEB_URL_CBH =
                    process.env.NODE_ENV === "development"
                        ? configProject.list.host.development.WEB_URL_CBH
                        : configProject.list.host.WEB_URL_CBH;

                const version = configProject.list.version;

                setConfig({
                    API_EMAIL_Url,
                    API_URL_CBH,
                    WEB_URL_CBH,
                    version
                });
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return { config, isLoading, error };
};

export default useConfigEnviroments;
