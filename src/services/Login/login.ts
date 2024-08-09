
import axios from "axios";

async function urlsEnviroment() {
    try {
        const result = await axios.get(`./configs.json`);
        return result.data.list;
    } catch (error) { }
}

export const loginServices = {
    urlsEnviroment
};

