import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';

const useApi = (API_URL: string) => {
  let cookieValue = Cookies.get('AppSessionCookie');
  const api = axios.create({
    baseURL: API_URL,
    responseType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieValue ?? ""}`,
    }
  });
  api.interceptors.request.use(
    async (response: InternalAxiosRequestConfig) => {
      return response;
    },
  );
  api.interceptors.response.use(
    async (response: any) => {
      return response;
    },
  )
  return {
    api,
  };
};

export default useApi;
