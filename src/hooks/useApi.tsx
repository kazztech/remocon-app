import React, { useState } from "react";

import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// type ConnectionState = "loading" | "success" | "error";
// type Content = {
//   remocons: any[]
// };
// type Data = {
//   exitCode: number;
//   errorMessage: string;
//   content: Content;
// };

// type GetApiProps<T> = {
//   url: string;
//   method: "GET" | "POST" | "PUT" | "DELETE";
//   data?: T | {};
//   offsetTimeMs?: number;
//   timeoutLimitMs?: number;
// };

// type GetApiReturn = {
//   response: AxiosResponse<any> | null;
//   connectionState: ConnectionState;
//   runRequest: () => void;
// };

// function useGetApi<T>({ url, method, data = {}, offsetTimeMs = 500, timeoutLimitMs = 5000 }: GetApiProps<T>): GetApiReturn {

//   const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
//   const [connectionState, setConnectionState] = useState<ConnectionState>("loading");

//   const runRequest = () => {
//     const axiosConfig: AxiosRequestConfig = {
//       method: method,
//       url: url,
//       baseURL: "http://192.168.3.200:3000",
//       data: data,
//       timeout: timeoutLimitMs
//     };
//     Axios(axiosConfig).then(response => {
//       setTimeout(() => {
//         setResponse(response);
//         setConnectionState("success");
//       }, offsetTimeMs)
//     }).catch(error => {
//       setConnectionState("error");
//     });
//   }

//   return { response, connectionState, runRequest };
// }

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ConnectionStatus = "wait" |"loading" | "success" | "error";
type Response = any;
type UseApi = {
  timeoutLimitMs: number;
  offsetTimeMs: number;
}

function useApi({ timeoutLimitMs, offsetTimeMs }: UseApi) {
  const [response, setResponse] = useState<Response>(null);
  const [status, setConnectionStatus] = useState<ConnectionStatus>("wait");

  const getApi = (url: string, method: Method, data?: {}) => {
    const axiosConfig = {
      method: method,
      url: url,
      baseURL: "http://192.168.3.200:3000",
      data: data,
      timeout: timeoutLimitMs
    };
    setConnectionStatus("loading");
    Axios(axiosConfig).then(response => {
      setTimeout(() => {
        setResponse(response);
        setConnectionStatus("success");
      }, offsetTimeMs)
    }).catch(error => {
      setResponse(null);
      setConnectionStatus("error");
    });
  }

  return { response, status, getApi };
}

export default useApi;