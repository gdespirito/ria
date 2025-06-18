<script setup lang="ts">
import { getWeather } from '@/services/weather'
import { ref, onMounted, computed } from 'vue'
import NextHoursWeather from '@/components/NextHoursWeather.vue'
import FiveDaysWeather from '@/components/FiveDaysWeather.vue'
import { WeatherResponse } from '@/types/weather'
import { searchCities, findCityByName, type City } from '@/services/searchCities'

const activeTab = ref('Rio de Janeiro')
const loading = ref(false)
const searchQuery = ref('')
const showSearchResults = ref(false)

const filteredCities = computed(() => searchCities(searchQuery.value))

const handleCityClick = async (city: City) => {
  const { lat, lon } = city
  activeTab.value = city.city_name
  loadCurrentWeather(lat, lon)
  showSearchResults.value = false
  searchQuery.value = ''
}

const handleSearchClick = () => {
  showSearchResults.value = true
}

const handleSearchBlur = () => {
  // Small delay to allow clicking on search results
  setTimeout(() => {
    showSearchResults.value = false
  }, 200)
}

onMounted(() => {
  const rio = findCityByName('Rio de Janeiro')
  if (rio) {
    loadCurrentWeather(rio.lat, rio.lon)
  }
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
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search city..."
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="handleSearchClick"
              @blur="handleSearchBlur"
            />
            <!-- Search Results Dropdown -->
            <div
              v-if="showSearchResults && filteredCities.length > 0"
              class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              <div
                v-for="city in filteredCities"
                :key="`${city.city_name}-${city.country_code}-${city.lat}-${city.lon}`"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @mousedown="handleCityClick(city)"
              >
                {{ city.city_name }}, {{ city.country_code }}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

    <h2 class="text-xl font-semibold mb-4">{{ activeTab }} Weather</h2>

    <div class="shadow-lg bg-white my-10 rounded-md p-4">
      <main>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="p-4">
              <NextHoursWeather :weather="weather" :loading="loading" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <FiveDaysWeather v-if="weather" :weather="weather" :loading="loading" />
  </div>
</template>
