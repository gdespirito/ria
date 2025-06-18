import citiesData from '@/data/cities.json'

export interface City {
  city_name: string
  country_code: string
  lat: number
  lon: number
}

const cities: City[] = citiesData as City[]

export const searchCities = (query: string): City[] => {
  if (!query) return []
  const searchQuery = query.toLowerCase()
  return cities
    .filter(
      (city) =>
        city.city_name.toLowerCase().includes(searchQuery) ||
        city.country_code.toLowerCase().includes(searchQuery),
    )
    .slice(0, 10) // Limit to 10 results for better performance
}

export const findCityByName = (cityName: string): City | undefined => {
  return cities.find((city) => city.city_name === cityName)
}
