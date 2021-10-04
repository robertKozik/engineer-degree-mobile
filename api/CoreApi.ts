import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../config';
import { humidityEntry, informationNode, temperatureEntry, user } from '../interfaces';
import AxiosProvider from './AxiosProvider';

class CoreApi {
    api: Axios;
    baseUrl: string;

    constructor(baseUrl = env.baseURL) {
        this.api = AxiosProvider(baseUrl);
        this.baseUrl = baseUrl;
        this.setInterceptors(this.beforeRequest, this.requestError, this.afterResponse, this.responseError);
    }

    setEndpointUrl(url: string) {
        this.api.defaults.baseURL = `${this.baseUrl}/${url}`;
      }

    setInterceptors(
        beforeRequest: (config: AxiosRequestConfig<any>) => AxiosRequestConfig<any>,
        requestError: (error: AxiosError) => Promise<AxiosError>,
         afterResponse: (data: any) => AxiosResponse|user|humidityEntry|temperatureEntry|informationNode,
         responseError: (error: AxiosError) => Promise<AxiosError>
         ) {
        this.api.interceptors.request.use(beforeRequest, requestError);
        this.api.interceptors.response.use(afterResponse, responseError);
      }

    beforeRequest (config: AxiosRequestConfig): AxiosRequestConfig {
        return config;
    }
    
    afterResponse(response: any): AxiosResponse {
        return response.data || response;
    }

    requestError (error: AxiosError): Promise<AxiosError> {
        throw error;
    };
    responseError (error: AxiosError): Promise<AxiosError> {
        throw error;
    };
}