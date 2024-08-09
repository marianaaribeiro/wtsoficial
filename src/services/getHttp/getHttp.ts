const getHttp = async (api: any, url: string) => {
    const response = await api.get(`${url}`);
    return response?.data
};

export default getHttp;