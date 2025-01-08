

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="weather-app">
  <h1>Weather App</h1>
  <input v-model="city" @input="fetchWeather" placeholder="Enter city name"/>
  <button @click="demo">Toggle Units</button>
  <div v-if="loading">
  Loading........
  </div>
  <div>
    <div v-if="weather">
        <h2>{{weather.name}}</h2>
        <p>temperature:{{weather.main.temp}}</p>
        <p>temperature:{{weather.weather[0].description}}</p>
        <p>Description:{{weather.main.temp}}</p>
        <p>Humidity:{{weather.main.temp}}</p>
        <p>wind speed:{{weather.main.temp}}</p>
        <p>Visiblity:{{weather.main.temp}}</p>


    </div>
  </div>
  </div>
</template>


<script lang="ts">

import { ref } from "vue";
// import {fetchWeatherByCity} from "./services/weatherService";
import {fetchWeatherByCity} from '../services/weatherService'
import {weatherResponce,ErrorResponse} from "../types/weather";

export default {
    name:"WeatherApp",
    setup(){
        const city = ref<string>("");
        const weather = ref<WeatherResponse | null>(null);
        const errorMessage = ref<string | null>(null);
        const loading = ref<boolean>(false);
        const temperatureUnit = ref<string>(null);

const demo = () => {
	console.log("called demofun")
}
				const fetchWeather = async ()=>{
					console.log("function is calle")
					if(city.value ==="") return;
					loading.value =true;
					errorMessage.value=null;
					try{
						const data = await fetchWeatherByCity(city.value);
						console.log("called ", city , data)
						if((data as ErrorResponse).cod){
							errorMessage.value=(data as ErrorResponse).message;
							weather.value =null;

						}else{
							weather.value = data as WeatherResponse
						}
					}catch (error){
						errorMessage.value ="Failed to fetch weather data"
						weather.value =null;
					}finally{
						loading.value =false;
					}
				};


				const toggleTemeratureUnit = ()=>{
					if(temperatureUnit.value ==="c"){
						temperatureUnit.value ="F";
					}else{
						temperatureUnit.value ="C";
					}
					fetchWeather();
				};

				return {
					city,
					weather,
					errorMessage,
					loading,
					temperatureUnit,
					fetchWeather,
					toggleTemeratureUnit
				}

    }
}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

