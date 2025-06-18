<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '../helpers'

interface WeatherDayCardProps {
  day: {
    weather: { icon: string; main: string }[]
    dt_txt: string
    main: { temp_min: number; temp_max: number }
  }[]
}

const props = defineProps<WeatherDayCardProps>()

const minTemperature = computed(() => {
  return Math.min(...props.day.map((item) => item.main.temp_min))
})
const maxTemperature = computed(() => {
  return Math.max(...props.day.map((item) => item.main.temp_max))
})
</script>

<template>
  <div
    class="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-4">
      <div class="w-16 h-16">
        <img
          :src="`https://openweathermap.org/img/wn/${day[0].weather[0].icon}@2x.png`"
          alt="weather icon"
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex flex-col">
        <h4 class="font-medium text-gray-900">{{ formatDate(day[0].dt_txt) }}</h4>
        <p class="text-sm text-gray-600">{{ day[0].weather[0].main }}</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-gray-600">{{ minTemperature.toFixed(1) }}°C</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-900 font-medium">{{ maxTemperature.toFixed(1) }}°C</span>
    </div>
  </div>
</template>
