
const postHttp = async (api: any, url: string, params: any) => {
    const response = await api.post(`${url}`, params);
    return response?.data
};

export default postHttp;

