import axios, { AxiosInstance } from "axios";


const createAxiosInstance = (serviceUrl?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: false,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Api-Key",
      "Access-Control-Allow-Methods": "OPTIONS,POST,PATCH,DELETE,PUT,GET"
    },
  });

  client.defaults.timeout = 30000;

  // You can add any other configuration here if needed


  return client;
};

export const axiosInstance = createAxiosInstance();

export const apiService = {
  get: async (
    endpoint: string,
    headers: any = {"Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Api-Key",
      "Access-Control-Allow-Methods": "OPTIONS,POST,PATCH,DELETE,PUT,GET"},
    params: object = {}
  ): Promise<any> => {
    console.log(headers)
    return axiosInstance
      .get(endpoint, { headers, params })
      .then((resp) => {
        return resp.data
      });
  },

  post: async (
    endpoint: string,
    payload: object = {},
    headers: any = {}
  ): Promise<any> => {
    return axiosInstance
      .post(endpoint, payload, { headers })
      .then((resp) => resp.data);
  },

  put: async (
    endpoint: string,
    payload: any = {},
    headers: any = {}
  ): Promise<any> => {
    return axiosInstance
      .put(endpoint, payload, { headers })
      .then((resp) => resp.data);
  },

  patch: async (
    endpoint: string,
    payload: any = {},
    headers: any = {}
  ): Promise<any> => {
    return axiosInstance
      .patch(endpoint, payload, { headers })
      .then((resp) => resp.data);
  },

  delete: async (endpoint: string, headers: any = {}, data: object = {}): Promise<any> => {
    return axiosInstance
      .delete(endpoint, { headers, data })
      .then((resp) => resp.data);
  },
};
