<script setup lang="ts">
interface WeatherCardProps {
  date: string
  description: string
  icon: string
  minTemp: number
  maxTemp: number
}

defineProps<WeatherCardProps>()
</script>

<template>
  <div
    class="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-4">
      <div class="w-16 h-16">
        <img
          :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
          alt="weather icon"
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex flex-col">
        <h4 class="font-medium text-gray-900">{{ date }}</h4>
        <p class="text-sm text-gray-600">{{ description }}</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-gray-600">{{ minTemp }}°C</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-900 font-medium">{{ maxTemp }}°C</span>
    </div>
  </div>
</template>
