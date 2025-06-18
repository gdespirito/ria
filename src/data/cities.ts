export interface City {
  name: string
  lat: number
  lon: number
}

export const cities: City[] = [
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
