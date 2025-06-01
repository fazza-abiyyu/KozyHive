<template>
  <div class="h-screen w-screen grid grid-cols-1 md:grid-cols-2">

    <!-- Kolom Form -->
    <div class="flex items-center justify-center bg-white px-6 py-10 md:py-0">
      <div class="w-full max-w-md">
        <div class="text-center">
          <AppLogo />
          <h1 class="text-2xl font-bold text-gray-800 mt-4">Biodata Pengguna</h1>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
          <div>
            <label for="name" class="block text-sm mb-2">Nama lengkap</label>
            <input v-model="name" type="text" id="name" placeholder="Masukkan Lengkap"
                   class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>
          <div>
            <label for="name" class="block text-sm mb-2">Nomer Telepon</label>
            <input v-model="phone" type="text" id="phone" placeholder="Nomer Telepon"
                   class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>
          <div>
            <label for="name" class="block text-sm mb-2">Alamat</label>
            <input v-model="address" type="text" id="address" placeholder="Alamat"
                   class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>

          <button type="submit" :disabled="isLoading"
                  class="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
            {{ isLoading ? "Loading..." : "Selesaikan Pendaftaran" }}
          </button>
        </form>
      </div>
    </div>

    <!-- Kolom Gambar -->
    <div class="hidden md:flex items-center justify-center bg-gray-100">
      <img src="~/assets/cove-image.svg" alt="Login Illustration" class="w-4/5 max-w-xl" />
    </div>

  </div>
</template>



<script setup lang="ts">
import AppLogo from "~/components/AppLogo.vue";

// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});

// Mendapatkan instance nuxtApp untuk menggunakan toast
const { $toast } = useNuxtApp();

const clearForm = () => {
  name.value = null;
  phone.value = null;
  address.value = null;
};

const handleSubmit = async () => {
  try {

    isLoading.value = true;

    await useFetchApi('/api/profile', {
      method: 'POST',
      body: {
        name: name.value,
        phone: phone.value,
        address: address.value,
      }
    });

    $toast('Berhasil menyimpan biodata.', 'success');
    clearForm();
  } catch (error) {
    $toast('Gagal menyimpan biodata.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>

</style>