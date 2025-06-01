<template>
  <!-- Card Blog -->
  <div class="max-w-[85rem] px-4 py-7 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Button Kembali -->
    <button @click="goBack"
            class="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">
      <span>&larr;</span> <!-- Panah kiri -->
      <span>Kembali</span>
    </button>

    <div class="text-left px-0 py-4">
      <h2 class="text-xl text-gray-800 font-bold sm:text-3xl dark:text-black">
        Kos-Kosan Kami yang Paling Populer
      </h2>

      <div class="text-left flex items-center justify-between ">
        <p class="text-sm text-gray-500 py-7 text-[16px]">
          Kos-kosan favorit dengan fasilitas lengkap dan lokasi terbaik.
        </p>
      </div>
    </div>
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <router-link
          v-for="property in properties"
          :key="property.id"
          :to="'/properties/' + property.id"
          class="group flex flex-col h-[400px] bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md transition-shadow">
        <div class="h-[60%] flex justify-center items-center bg-blue-600 rounded-t-xl">
          <img :src="property.images || 'https://via.placeholder.com/300'" :alt="property.name" class="w-full h-full object-cover rounded-t-xl"/>
        </div>
        <div class="h-[40%] p-4">
          <span class="block mb-1 text-xs font-normal uppercase text-[#24AB70]">{{ property.city }}</span>
          <h3 class="text-lg font-semibold text-gray-800">{{ property.name }}</h3>
          <p class="mt-2 text-sm font-normal text-black">Rp {{ property.price.toLocaleString() }}</p>
        </div>
      </router-link>
    </div>

    <!-- Pagination -->
    <nav class="flex justify-center items-center gap-2">
      <button
          @click="goToPage(meta.page - 1)"
          :disabled="meta.page <= 1"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
        Previous
      </button>

      <span class="px-4 text-sm text-gray-600">Page {{ meta.page }} of {{ meta.totalPages }}</span>

      <button
          @click="goToPage(meta.page + 1)"
          :disabled="meta.page >= meta.totalPages"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
        Next
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const goBack = () => {
  window.history.back(); // Navigasi ke halaman sebelumnya
};

const properties = ref([]);
const meta = ref({
  page: 1,
  limit: 15,
  total: 0,
  totalPages: 1
});

const fetchProperties = async (page = 1) => {
  try {
    const response = await fetch(`http://localhost:3000/api/properties?page=${page}&limit=${meta.value.limit}`);
    const result = await response.json();
    if (result.success) {
      properties.value = result.data.filter(property => property.status === "ACTIVE");
      meta.value = result.meta;
    } else {
      console.error("Gagal mengambil data:", result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= meta.value.totalPages) {
    fetchProperties(page);
  }
};


onMounted(() => {
  fetchProperties(1);
});

</script>