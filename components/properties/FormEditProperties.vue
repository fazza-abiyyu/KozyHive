<template xmlns="http://www.w3.org/1999/html">
  <DashSidebar/>

  <div class="w-full lg:ps-64">
    <!-- Header -->
    <div>
      <h2 class="p-4 sm:p-6 space-y-4 sm:space-y-6 text-xl font-medium text-gray-800 w-full">Tambah Kost</h2>
    </div>
    <!-- End Header -->
    <form v-if="selectedProperties" @submit.prevent="handleSubmit">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <!-- Nama -->
        <div class="grid sm:grid-cols-3">
          <label for="name" class="block text-sm font-medium mb-2 w-full">Nama</label>
          <input type="text" id="name"
                 v-model="selectedProperties.name"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                 placeholder="Masukan nama kost">
        </div>

        <!-- Kota -->
        <div class="grid sm:grid-cols-3">
          <label for="description" class="block text-sm font-medium mb-2 w-full">Kota</label>
          <input type="text" id="city"
                 v-model="selectedProperties.city"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                 placeholder="Masukan kota">
        </div>

        <!-- Alamat -->
        <div class="grid sm:grid-cols-3">
          <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
          <textarea type="text" id="address"
                    v-model="selectedProperties.address"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                    placeholder="Alamat Kost"></textarea>
        </div>

        <!-- Jumlah -->
        <div class="grid sm:grid-cols-3">
          <label class="block text-large font-medium text-black mb-1">Harga</label>
          <input
              type="number" v-model="selectedProperties.price"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
              placeholder="Rp. ">
        </div>

        <!-- Jumlah Kamar Kosong -->
        <div class="grid sm:grid-cols-3">
          <label class="block text-large font-medium text-black mb-1">Jumlah Kamar Kosong</label>
          <input
              type="number" v-model="selectedProperties.availableRooms"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
              placeholder="0">
        </div>

        <!-- Jumlah -->
        <div class="grid sm:grid-cols-3">
          <label class="block text-large font-medium text-black mb-1">Jumlah Kamar Kosong</label>
          <input
              type="number" v-model="selectedProperties.totalRooms"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
              placeholder="0">
        </div>

        <!-- Deskripsi -->
        <div class="grid sm:grid-cols-3">
          <label for="description" class="block text-sm font-medium mb-2 w-full">Deskripsi</label>
          <textarea type="text" id="description"
                    v-model="selectedProperties.description"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                    placeholder="Deskripsi kost"></textarea>
        </div>

        <!-- Foto -->
        <div class="grid sm:grid-cols-3">
          <label for="file" class="block text-sm font-medium mb-2 w-full">Foto</label>
          <input type="file" id="file" @change="handleFileChange" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required/>
        </div>

        <!-- Submit Button -->
        <div class="space-x-3 self-end">
          <button type="submit"
                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  :disabled="isLoading">
            Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';
import { useNuxtApp } from '#app';

const { $toast } = useNuxtApp();
const route = useRoute();
const propertyId = ref<string | null>(route.params.id);

const selectedProperties = ref({
  name: "",
  city: "",
  address: "",
  price: "",
  totalRooms: "",
  availableRooms: "",
  description: "",
  file: ""
});

const isLoading = ref<boolean>(false);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedProperties.value.file = input.files[0];
  }
};

const fetchPropertyById = async (id: number) => {
  try {
    isLoading.value = true;
    const response = await useFetchApi(`/api/properties/${id}`, { method: "GET" });
    if (response?.data) {
      selectedProperties.value = { ...response.data };
      console.log("Data Properti:", selectedProperties.value); // Debugging
    } else {
      $toast("Gagal mengambil data properti.", "error");
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    $toast("Terjadi kesalahan, coba lagi nanti.", "error");
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  try {
    isLoading.value = true;

    const formData = new FormData();
    formData.append("name", selectedProperties.value.name);
    formData.append("city", selectedProperties.value.city);
    formData.append("address", selectedProperties.value.address);
    formData.append("price", selectedProperties.value.price);
    formData.append("avaibleRoom", selectedProperties.value.availableRooms);
    formData.append("totalRoom", selectedProperties.value.totalRooms);
    if (selectedProperties.value.file) {
      formData.append("file", selectedProperties.value.file);
    }

    const response = await useFetchApi(`/api/properties/${propertyId.value}`, {
      method: "PUT",
      body: formData,
    });

    if (response?.success) {
      $toast("Kos berhasil diperbarui!", "success");
      navigateTo('/dashboard/properties/my-properties')
    } else {
      $toast("Gagal memperbarui kos.", "error");
    }
  } catch (error) {
    console.error("Error updating property:", error);
    $toast("Terjadi kesalahan, coba lagi nanti.", "error");
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (propertyId.value) {
    await fetchPropertyById(parseInt(propertyId.value));
  }
});
</script>
