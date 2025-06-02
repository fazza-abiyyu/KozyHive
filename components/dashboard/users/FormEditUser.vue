<template xmlns="http://www.w3.org/1999/html">
  <DashSidebar/>

  <div class="w-full lg:ps-64">
    <!-- Header -->
    <div>
      <h2 class="p-4 sm:p-6 space-y-4 sm:space-y-6 text-xl font-medium text-gray-800 w-full">Edit Pengguna</h2>
    </div>
    <!-- End Header -->
    <form v-if="selectedUser" @submit.prevent="handleSubmit" class="space-y-4">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <!-- Email -->
        <div class="grid sm:grid-cols-3">
        <label class="block text-sm font-medium mb-2 w-full">Email</label>
        <input
            type="text" v-model="selectedUser.email"
            class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
      </div>

      <!-- Role -->
        <div class="grid sm:grid-cols-3">
        <label class="block text-sm font-medium mb-2 w-full">Role</label>
        <select v-model="selectedUser.role"
                class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="ADMIN">ADMIN</option>
          <option value="TENANT">TENANT</option>
          <option value="OWNER">OWNER</option>
        </select>
      </div>


      <!-- Tombol Submit -->
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

import { useRouter } from "vue-router";

const router = useRouter();
const user = ref<string | null>(null);

const goBack = () => {
  window.history.back(); // Navigasi ke halaman sebelumnya
};


const selectedUser = ref({
  id: null,
  email: "",
  role: "",
  createdAt: "",
  updatedAt: "",
});


const isLoading = ref<boolean>(false);


const fetchUserById = async (id: number) => {
  try {
    isLoading.value = true;
    const response = await useFetchApi(`/api/users/${id}`,
        { method: "GET" });
    if (response?.data) {
      selectedUser.value = { ...response.data };
      console.log("Data pengguna:", selectedUser.value); // Debugging
    } else {
      $toast("Gagal mengambil data pengguna.", "error");
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    $toast("Terjadi kesalahan, coba lagi nanti.", "error");
  } finally {
    isLoading.value = false;
  }
};

// Fungsi untuk submit booking
const handleSubmit = async () => {
  try {
    isLoading.value = true;

    const response = await useFetchApi(`/api/users/${route.params.id}`, {
      method: "PATCH",
      body: {
        role : selectedUser.value.role
      }
    });

      $toast("Berhasil memeperbarui data.", "success");
      router.push(`/dashboard/users`);

  } catch (error) {
    console.error("Error saat memperbarui:", error);
    $toast("Gagal memperbarui data.", "error");
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchUserById(route.params.id);
})
</script>