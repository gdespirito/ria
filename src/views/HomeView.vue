<script setup lang="ts"></script>

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
            <button class="px-4 py-2 text-sm font-medium border-b-2 border-blue-500 text-blue-600">
              Rio de Janeiro
            </button>
            <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Beijing
            </button>
            <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Los Angeles
            </button>
          </div>

          <div class="flex flex-col gap-2">
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-4">Rio de Janeiro Weather</h2>
              <!-- Weather content will go here -->

              <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold mb-4">Next hours</h2>
                <div class="flex flex-row gap-2">
                  <div class="flex flex-row gap-10">
                    <div class="flex items-center gap-2">
                      <div class="w-14 h-14">
                        <img
                          src="https://openweathermap.org/img/wn/10d@2x.png"
                          class="w-full h-full object-cover"
                          alt="weather icon"
                        />
                      </div>
                      <div class="flex flex-col">
                        <p>10:00</p>
                        <p>20°C</p>
                        <p>0%</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <div class="w-14 h-14">
                        <img
                          src="https://openweathermap.org/img/wn/10d@2x.png"
                          class="w-full h-full object-cover"
                          alt="weather icon"
                        />
                      </div>
                      <div class="flex flex-col">
                        <p>10:00</p>
                        <p>20°C</p>
                        <p>0%</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <div class="w-14 h-14">
                        <img
                          src="https://openweathermap.org/img/wn/01d@2x.png"
                          class="w-full h-full object-cover"
                          alt="weather icon"
                        />
                      </div>
                      <div class="flex flex-col">
                        <p>10:00</p>
                        <p>20°C</p>
                        <p>0%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-gray-800">Next 5 days</h2>
      <div class="grid grid-cols-1 gap-4">
        <div
          class="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-4">
            <div class="w-16 h-16">
              <img
                src="https://openweathermap.org/img/wn/10d@2x.png"
                alt="weather icon"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="flex flex-col">
              <h4 class="font-medium text-gray-900">Friday, Nov 1</h4>
              <p class="text-sm text-gray-600">Clear throughout the day</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-gray-600">10°C</span>
            <span class="text-gray-400">/</span>
            <span class="text-gray-900 font-medium">20°C</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
