<script setup lang="ts">
import { getWeather } from '@/services/weather'
import { ref, onMounted, computed } from 'vue'
import WeatherItem from '@/components/WeatherItem.vue'
import WeatherDayCard from '@/components/WeatherDayCard.vue'

const activeTab = ref('Rio de Janeiro')

const cities = [
  {
    name: 'Rio de Janeiro',
    lat: -22.9068,
    lon: -43.1729,
  },
  {
    name: 'Beijing',
    lat: 39.9042,
    lon: 116.4074,
  },
  {
    name: 'Los Angeles',
    lat: 34.0522,
    lon: -118.2437,
  },
]

const weather = ref(null)

const loadCurrentWeather = async (lat: number, lon: number) => {
  weather.value = await getWeather(lat, lon)
}

const handleCityClick = async (city: { lat: number; lon: number }) => {
  const { lat, lon } = city
  activeTab.value = city.name
  loadCurrentWeather(lat, lon)

  // weather.value = weather
}

const getDayWeather = (date: string, weather: any) => {
  if (!weather) return null

  console.log(weather.list)
  return weather.list.filter((item: any) => item.dt_txt.includes(date))
}

onMounted(() => {
  loadCurrentWeather(cities[0].lat, cities[0].lon)
})

const getDays = (weather: any) => {
  const days = weather.list.map((item: any) => item.dt_txt.split(' ')[0])
  return [...new Set(days)]
}

const fiveDaysWeather = computed(() => {
  const days = getDays(weather.value)
  const result = []
  for (const day of days) {
    const dayWeather = getDayWeather(day, weather.value)
    result.push(dayWeather)
  }
  return result
})
</script>

<template>
  <div class="container mx-auto max-w-screen-sm">
    <div class="shadow-lg bg-white my-10 rounded-md p-4">
      <header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Weather App</h1>
          <font-awesome-icon icon="search" class="text-xl cursor-pointer" />
        </div>
      </header>
      <main>
        <div class="flex flex-col gap-4">
          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mt-5">
            <button
              v-for="city in cities"
              :key="city.name"
              class="px-4 py-2 text-sm font-medium"
              :class="{
                'border-b-2 border-blue-500 text-blue-600': activeTab === city.name,
                'text-gray-500 hover:text-gray-700': activeTab !== city.name,
              }"
              @click="handleCityClick(city)"
            >
              {{ city.name }}
            </button>
          </div>

          <div class="flex flex-col gap-2">
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-4">Rio de Janeiro Weather</h2>
              <!-- Weather content will go here -->
              <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold mb-4">Next hours</h2>
                <div class="flex flex-row gap-2 overflow-x-auto">
                  <div class="flex flex-row gap-10" v-if="weather">
                    <WeatherItem
                      v-for="item in weather.list"
                      :key="item.dt"
                      :time="item.dt_txt"
                      :temp="item.main.temp"
                      :pop="item.pop"
                      :icon="item.weather[0].icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div class="flex flex-col gap-4" v-if="weather">
      <h2 class="text-xl font-semibold text-gray-800">Next 5 days</h2>
      <div class="grid grid-cols-1 gap-4">
        <WeatherDayCard v-for="day in fiveDaysWeather" :key="day.dt" :day="day" />
      </div>
    </div>
  </div>
</template>
