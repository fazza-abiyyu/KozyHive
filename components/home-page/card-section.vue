<template>
  <!-- Card Blog -->
  <div class="max-w-[85rem] px-4 py-7 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="text-left px-0 py-4">
      <h2 class="text-xl text-gray-800 font-bold sm:text-3xl dark:text-black">
        Kos-Kosan Kami yang Paling Populer
      </h2>

      <div class="text-left flex items-center justify-between ">
        <p class="text-sm text-gray-500 py-7 text-[16px]">
          Kos-kosan favorit dengan fasilitas lengkap dan lokasi terbaik.
        </p>
        <a href="/all-properties" class="text-xl text-gray-500 hover:text-gray-700 transition text-[16px]">
          View All
        </a>
      </div>

    </div>

    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="property in properties" :key="property.id" class="group flex flex-col h-[500px] bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div class="h-[60%] flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
          <img :src="property.images" :alt="property.name" class="w-full h-full object-cover rounded-t-xl"/>
        </div>
        <div class="h-[40%] p-4 md:p-3">
          <span class="block mb-1 text-xs font-normal uppercase text-[#24AB70] text-[12px]">{{ property.city }}</span>
          <h3 class="text-xl font-semibold text-gray-800 text-[24px]">{{ property.name }}</h3>
<!--          <p class="mt-3 text-gray-500">{{ property.description }}</p>-->
          <p class="mt-2 text-lg font-normal text-balck text-[16px]">Rp {{ property.price.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const properties = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/properties?page=1&pagesize=3');
    const result = await response.json();
    if (result.success) {
      properties.value = result.data.slice(0, 3); // Ambil hanya 3 properti
    } else {
      console.error("Gagal mengambil data:", result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
});
</script>
