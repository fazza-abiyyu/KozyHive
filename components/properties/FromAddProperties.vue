<template xmlns="http://www.w3.org/1999/html">
  <DashSidebar/>

  <div class="w-full lg:ps-64">
    <!-- Header -->
    <div>
      <h2 class="p-4 sm:p-6 space-y-4 sm:space-y-6 text-xl font-medium text-gray-800 w-full">Tambah Kost</h2>
    </div>
    <!-- End Header -->
    <form @submit.prevent="handleSubmit">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <!-- Nama -->
        <div class="grid sm:grid-cols-3">
          <label for="name" class="block text-sm font-medium mb-2 w-full">Nama</label>
          <input type="text" id="name"
                 v-model="name"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                 placeholder="Masukan nama kost">
        </div>

        <!-- Kota -->
        <div class="grid sm:grid-cols-3">
          <label for="description" class="block text-sm font-medium mb-2 w-full">Kota</label>
          <input type="text" id="city"
                 v-model="city"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                 placeholder="Masukan kota">
        </div>

        <!-- Alamat -->
        <div class="grid sm:grid-cols-3">
          <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
          <textarea type="text" id="address"
                 v-model="address"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
                    placeholder="Alamat Kost"></textarea>
        </div>

        <!-- Jumlah -->
        <div class="grid sm:grid-cols-3">
          <label class="block text-large font-medium text-black mb-1">Harga</label>
          <input
              type="number" v-model="price"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
              placeholder="Rp. ">
        </div>

        <!-- Jumlah Kamar Kosong -->
        <div class="grid sm:grid-cols-3">
          <label class="block text-large font-medium text-black mb-1">Jumlah Kamar Kosong</label>
          <input
              type="number" v-model="avaibleRoom"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
              placeholder="0">
        </div>

        <!-- Jumlah -->
        <div class="grid sm:grid-cols-3">
          <label class="block text-large font-medium text-black mb-1">Jumlah Kamar</label>
          <input
              type="number" v-model="totalRoom"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required
              placeholder="0">
        </div>

        <!-- Deskripsi -->
        <div class="grid sm:grid-cols-3">
          <label for="description" class="block text-sm font-medium mb-2 w-full">Deskripsi</label>
          <textarea type="text" id="description"
          v-model="description"
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
import {useNuxtApp} from "#imports";
import useFetchApi from '~/composables/useFetchApi';
import { useRouter } from "vue-router";
import DashSidebar from "~/components/DashSidebar.vue";

const router = useRouter();
const {$toast} = useNuxtApp();



const name = ref<string | null>(null);
const city = ref<string | null>(null);
const address = ref<string | null>(null);
const price = ref<number | null>(null);
const avaibleRoom = ref<number | null>(null);
const totalRoom = ref<number | null>(null);
const description = ref<string | null>(null);
const file = ref<File | null>(null);
const isLoading = ref<boolean>(false);


const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    file.value = input.files[0]
  }
}

const clearForm = () => {
  name.value = null;
  city.value = null;
  address.value = null;
  price.value = null;
  avaibleRoom.value = null;
  totalRoom.value = null;
  description.value = null;
  file.value = null;
};


const validateForm = () => {
  if (!name.value || !city.value || !address.value || !price.value || !avaibleRoom.value || !totalRoom.value || !description.value || !file.value) {
    $toast('Harap lengkapi semua field.', 'error')
    return false
  }
  return true
}

const handleSubmit = async () => {
  try {
    isLoading.value = true;

    // Transform data for API (map frontend fields to backend expected fields)
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('city', city.value);
    formData.append('address', address.value);
    formData.append('price', price.value);
    formData.append('availableRooms', avaibleRoom.value);
    formData.append('totalRooms', totalRoom.value);
    formData.append('description', description.value);
    formData.append('file', file.value);
    // API call
    await useFetchApi('/api/properties', {
      method: 'POST',
      body: formData,
    });

    $toast('Kos berhasil ditambahkan!', 'success');
    clearForm();
    router.push('/dashboard/properties/my-properties');
  } catch (error) {
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};

</script>

<style lang="css" scoped>
</style>
