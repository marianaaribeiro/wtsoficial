
interface ConfigProject {
    HOST: {
        API_DIGITAL_URL: string;
        API_URL_CBH: string;
        WEB_URL_CBH: string;
    };
    VERSION: string;
}

const getConfig = async (): Promise<ConfigProject> => {
    const urls = process.env.NODE_ENV === "development"
        ? '/config.json'
        : './config.json';

    const response = await fetch(`${urls}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const configProject: ConfigProject = await response.json();
    return configProject;
};

export const enviromentServices = {
    getConfig
};

