import axios, {AxiosError} from "axios";
import  store  from "./../store";
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMiIsIkhldEhhblN0cmluZyI6IjAxLzAzLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzYyODgwMDAwMCIsIm5iZiI6MTY0MTgzNDAwMCwiZXhwIjoxNjc3Nzc2NDAwfQ.9XnfBg1uQK-rVl3jWTGs6bJfWZTFuSEx2qP57XEGwPI",
  },
});
interface ErrorResponse{
  content:string;
}
axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error:AxiosError<ErrorResponse>) => {
    console.log(error);
    
    return Promise.reject(error.response?.data.content);
  }
);


// setup request interceptor
axiosClient.interceptors.request.use(
  (config)=>{
    // config là thông tin của request sẽ được gửi lên server
    const {accessToken}=store.getState().auth.currentUser;
    if(config.headers){
      if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
    // Kiểm tra xem user đã đăng nhập hay chưa để lấy accesstoken gẵn vào headers
  }
)



export default axiosClient;
