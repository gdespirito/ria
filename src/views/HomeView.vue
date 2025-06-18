<script setup lang="ts">
import { getWeather } from '@/services/weather'
import { ref, onMounted } from 'vue'
import NextHoursWeather from '@/components/NextHoursWeather.vue'
import FiveDaysWeather from '@/components/FiveDaysWeather.vue'
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

const weather = ref<WeatherResponse | null>(null)

const loadCurrentWeather = async (lat: number, lon: number) => {
  loading.value = true
  weather.value = await getWeather(lat, lon)
  loading.value = false
}
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
              <NextHoursWeather :weather="weather" :loading="loading" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <FiveDaysWeather v-if="weather" :weather="weather" :loading="loading" />
  </div>
</template>
