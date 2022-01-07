import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import env from "../config";
import {
  humidityEntry,
  informationNode,
  temperatureEntry,
  user,
} from "../interfaces";
import { store } from "../redux/store";
import * as SecureStore from "expo-secure-store";
import { getToken } from "../utils/tokenService";
import AxiosProvider from "./AxiosProvider";

class CoreApi {
  api: Axios;
  baseUrl: string;

  constructor(baseUrl = env.baseURL) {
    this.api = AxiosProvider(baseUrl);
    this.baseUrl = baseUrl;
    this.setInterceptors(
      this.beforeRequest,
      this.requestError,
      this.afterResponse,
      this.responseError
    );
  }

  setEndpointUrl(url: string) {
    this.api.defaults.baseURL = `${this.baseUrl}/${url}`;
  }

  setInterceptors(
    beforeRequest: (config: AxiosRequestConfig<any>) => AxiosRequestConfig<any>,
    requestError: (error: AxiosError) => Promise<AxiosError>,
    afterResponse: (
      data: any
    ) =>
      | AxiosResponse
      | user
      | humidityEntry
      | temperatureEntry
      | informationNode,
    responseError: (error: AxiosError) => Promise<AxiosError>
  ) {
    // this.api.interceptors.request.use(beforeRequest, requestError);
    this.api.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.api.interceptors.response.use(afterResponse, responseError);
  }

  afterResponse(response: any): AxiosResponse {
    return response.data || response;
  }

  requestError(error: AxiosError): Promise<AxiosError> {
    throw error;
  }
  responseError(error: AxiosError): Promise<AxiosError> {
    throw error;
  }
  getToken() {
    return getToken();
  }
}

export default CoreApi;
