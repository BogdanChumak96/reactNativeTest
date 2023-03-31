import axios from 'axios';

export const getWeatherForecast = async date => {
  const dt = new Date(date).getTime() / 1000;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=Kiev&appid=9c6412d22ee09805ef56e37a3a4cac9c&units=metric&cnt=40&date=${dt}`;
  const response = await axios.get(url);
  return response.data;
};
