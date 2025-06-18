<script setup lang="ts">
import { WeatherResponse } from '@/types/weather'
import WeatherDayCard from '@/components/WeatherDayCard.vue'
import { computed } from 'vue'

const props = defineProps<{
  weather: WeatherResponse | null
  loading: boolean
}>()

const getDayWeather = (date: string, weather: WeatherResponse | null) => {
  if (!weather) return null
  return weather.list.filter((item) => item.dt_txt.includes(date))
}

const getDays = (weather: WeatherResponse) => {
  const days = weather.list.map((item) => item.dt_txt.split(' ')[0])
  return [...new Set(days)] // Remove duplicates
}

const fiveDaysWeather = computed(() => {
  if (!props.weather) return []
  const days = getDays(props.weather)
  const result = []
  for (const day of days) {
    const dayWeather = getDayWeather(day, props.weather)
    result.push(dayWeather)
  }
  return result
})
</script>

<template>
  <div class="flex flex-col gap-4">
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
</template>
