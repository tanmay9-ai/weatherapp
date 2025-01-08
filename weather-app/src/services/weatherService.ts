import axios from "axios";
import type { weatherResponse, GeoLOcation, ErrorResponse } from "../types/weather.ts";

const API_KEY = "b93636ba461c7294ecf793aae36a3107";
const BASE_URL="https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherByCity = async (city:string): Promise<weatherResponse | ErrorResponse> =>{
    try{
        const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
      const location: GeoLOcation = geoRes.data
      const weatherRes = await axios.get(`${BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`)

      return weatherRes.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return{
                message:error.response?.data?.message || "N error",
                cod:error.response?.status || 500,
            }
        }
        return{
            message:"unpexpted error",
          cod:500
        }

    }

}