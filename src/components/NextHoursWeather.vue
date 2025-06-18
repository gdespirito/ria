<script setup lang="ts">
import { WeatherResponse } from '@/types/weather'
import WeatherItem from '@/components/WeatherItem.vue'
import { computed } from 'vue'

const props = defineProps<{
  weather: WeatherResponse | null
  loading: boolean
}>()

const nextHoursWeather = computed(() => {
  return props.weather?.list.slice(0, 12)
})
</script>

<template>
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
</template>
