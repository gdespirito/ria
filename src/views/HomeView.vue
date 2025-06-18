<script setup lang="ts">
import { getWeather } from '@/services/weather'
import { ref, onMounted, computed } from 'vue'
import WeatherItem from '@/components/WeatherItem.vue'
import WeatherDayCard from '@/components/WeatherDayCard.vue'
import { WeatherResponse } from '@/types/weather'
import { cities } from '@/data/cities'

const activeTab = ref('Rio de Janeiro')
const loading = ref(false)

const handleCityClick = async (city: { lat: number; lon: number }) => {
  const { lat, lon } = city
  activeTab.value = city.name
  loadCurrentWeather(lat, lon)
}

onMounted(() => {
  loadCurrentWeather(cities[0].lat, cities[0].lon)
})

const getDayWeather = (date: string, weather: WeatherResponse | null) => {
  if (!weather) return null

  return weather.list.filter((item) => item.dt_txt.includes(date))
}

const weather = ref<WeatherResponse | null>(null)

const loadCurrentWeather = async (lat: number, lon: number) => {
  loading.value = true
  weather.value = await getWeather(lat, lon)
  loading.value = false
}

const getDays = (weather: WeatherResponse) => {
  const days = weather.list.map((item) => item.dt_txt.split(' ')[0])
  return [...new Set(days)] // Remove duplicates
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

const nextHoursWeather = computed(() => {
  return weather.value?.list.slice(0, 12)
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
                <div v-if="loading" class="flex items-center justify-center p-4">
                  <div class="animate-pulse flex flex-row gap-4 w-full">
                    <div class="h-20 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-20 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-20 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-20 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="h-20 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div class="flex flex-row gap-2 overflow-x-auto" v-else>
                  <div class="flex flex-row gap-10" v-if="weather">
                    <WeatherItem
                      v-for="item in nextHoursWeather"
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
      <div v-if="loading" class="flex items-center justify-center p-4">
        <div class="animate-pulse flex flex-col gap-4 w-full">
          <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4" v-else>
        <WeatherDayCard v-for="day in fiveDaysWeather" :key="day.dt" :day="day" />
      </div>
    </div>
  </div>
</template>
