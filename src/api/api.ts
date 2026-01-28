import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.10.20:9901/pharma-dash-ws/api/v1/report", // LIVE
  //baseURL: "http://192.168.100.29:9901/pharma-dash-ws/api/v1/report",
});

export const WsURL = "ws://192.168.10.20:9901/pharma-dash-ws/ws"; // LIVE
// export const WsURL = "ws://192.168.100.29:9901/pharma-dash-ws/ws";

export const useGetData = (key: string[], endPoint: string) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axiosInstance.get(endPoint);
      // console.log("API Response :: ----------->", data);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
