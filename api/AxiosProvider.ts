import axios from "axios";

const AxiosProvider = (baseUrl: string) => {
    const instance = axios.create({
      baseURL: baseUrl,
    });
  
    return instance;
  }
  
  export default AxiosProvider;