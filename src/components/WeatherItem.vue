<script setup lang="ts">
import { formatTime } from '../helpers'

interface WeatherItemProps {
  time: string
  temp: number
  pop: number
  icon: string
}

defineProps<WeatherItemProps>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="w-14 h-14">
      <img
        :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
        class="w-full h-full object-cover"
        alt="weather icon"
      />
    </div>

    <div class="flex flex-col text-gray-800">
      <p class="font-bold">{{ formatTime(time) }}</p>
      <p class="font-semibold">{{ temp }}°C</p>
      <p class="text-gray-400 text-sm">{{ pop }}%</p>
    </div>
  </div>
</template>
