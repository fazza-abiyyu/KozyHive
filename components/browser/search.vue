<template>
  <div class="max-w-[85rem] px-4 py-3 mx-auto">
    <!-- Form Pencarian -->
    <form @submit.prevent="fetchProperties" class="max-w-md mx-auto mb-6">
      <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input v-model="searchQuery" type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Cari properti..." required />
        <button type="submit" class="absolute end-2.5 bottom-2.5 bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2">Search</button>
      </div>
    </form>

    <!-- Hasil Pencarian -->
    <div v-if="searched">
      <template v-if="properties.length">
        <h6 class="text-xl text-gray-800 font-normal sm:text-3xl pb-4">Hasil Pencarian</h6>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <router-link v-for="property in properties" :key="property.id" :to="'/properties/' + property.id" class="group flex flex-col bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
            <img :src="property.images || 'https://via.placeholder.com/300'" :alt="property.name" class="w-full rounded-t-xl aspect-[8/6]" />
            <div class="p-4">
              <span class="block text-xs font-normal uppercase text-green-500">{{ property.city }}</span>
              <h3 class="text-lg font-semibold text-gray-800">{{ property.name }}</h3>
              <p class="text-sm font-normal text-black">Rp {{ property.price.toLocaleString() }}</p>
            </div>
          </router-link>
        </div>
      </template>

      <!-- Pesan jika tidak ada hasil -->
      <template v-else>
        <p class="text-center text-gray-600 text-lg font-medium mt-5">Hasil Pencarian Tidak Ditemukan</p>
      </template>
      <div class="text-left px-0 py-4"> <h6 class="text-xl text-gray-800 font-normal sm:text-3xl dark:text-black"> Kos-Kosan yang Lainnya </h6> </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      properties: [],
      searched: false, // Tambahkan variabel untuk mengetahui apakah pencarian sudah dilakukan
    };
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await fetch(`/api/properties/search?q=${this.searchQuery}&page=1&pagesize=10`);
        const data = await response.json();

        this.searched = true; // Tandai bahwa pencarian telah dilakukan

        if (data.success && data.data.length) {
          this.properties = data.data;
        } else {
          this.properties = [];
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        this.properties = [];
        this.searched = true; // Pastikan pesan "Tidak Ditemukan" tetap muncul saat terjadi error
      }
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan */
</style>
