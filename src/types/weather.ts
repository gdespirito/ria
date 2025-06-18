export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface WeatherListItem {
  dt: number
  main: Main
  weather: Weather[]
  clouds: { all: number }
  wind: { speed: number; deg: number }
  visibility: number
  pop: number
  dt_txt: string
}

export interface WeatherResponse {
  cod: string
  message: number
  cnt: number
  list: WeatherListItem[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
