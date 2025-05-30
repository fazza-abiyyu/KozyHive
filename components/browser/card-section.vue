<template>
  <!-- Card Blog -->
  <div class="max-w-[85rem] px-4 py-7 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <router-link 
        v-for="property in properties" 
        :key="property.id" 
        :to="'/property/' + property.id" 
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const properties = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/properties?page=1&limit=20');
    const result = await response.json();
    if (result.success) {
      properties.value = result.data.filter(property => property.status === "ACTIVE"); // Hanya properti aktif
    } else {
      console.error("Gagal mengambil data:", result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
});
</script>   