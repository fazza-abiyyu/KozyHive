<template xmlns="http://www.w3.org/1999/html">
  <div class="w-full lg:ps-64">
    <!-- Header -->
    <div>
      <h2 class="p-4 sm:p-6 space-y-4 sm:space-y-6 text-xl font-medium text-gray-800 w-full text-center">Detail Profile</h2>
    </div>
    <!-- End Header -->

    <form @submit.prevent="updateProfile" class="space-y-4">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-black mb-1">Nama</label>
        <input
            type="text" v-model="user.profile.name"
            class="col-span-2 py-3 px-4 block w-full max-w-[30%] border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"/>
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm font-medium text-black mb-1">Nomer Telepon</label>
        <input
            type="text" v-model="user.profile.phone"
            class="col-span-2 py-3 px-4 block w-full max-w-[30%] border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"/>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-black mb-1">Email</label>
        <input
            type="text" v-model="user.email"
            class="col-span-2 py-3 px-4 block w-full max-w-[30%] border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
      </div>

      <!-- Alamat -->
      <div>
        <label class="block text-sm font-medium text-black mb-1">Alamat</label>
        <textarea v-model="user.profile.address" rows="3"
                  class="w-full max-w-[30%] px-[10px] py-[10px] border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
      </div>

      <!-- Tombol Submit -->
      <div>
        <button type="submit"
                class="w-full max-w-[15%] font-light font-[14px] bg-blue-600 hover:bg-blue-700 text-white px-[10px] py-[10px] rounded-lg shadow transition">
          Simpan Perubahan
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

const goBack = () => {
  window.history.back(); // Navigasi ke halaman sebelumnya
};

const property = ref<Record<string, any>>({
  owner: {
    profile: {
      name: "Nama tidak diketahui",
    }
  }
});


const user = ref({
  id: null,
  email: "",
  role: "",
  createdAt: "",
  updatedAt: "",
  profile: {
    name: "",
    phone: "",
    address: "",
  },
  tenantBookings: [],
  tenantTransactions: [],
  properties: [],
  ownerBookings: [],
  ownerTransactions: []
});

const isLoading = ref<boolean>(false);

const updateProfile = async () => {
  isLoading.value = true;
  try {
    // Pastikan data yang dikirim tidak kosong
    if (!user.value.profile.name || !user.value.profile.phone || !user.value.profile.address) {
      $toast("Pastikan semua kolom terisi sebelum menyimpan perubahan!", "error");
      isLoading.value = false;
      return;
    }

    // Kirim request ke API
    const response = await useFetchApi("http://localhost:3000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        name: user.value.profile.name,
        phone: user.value.profile.phone,
        address: user.value.profile.address
      }
    });

    // Hanya tampilkan toast sukses jika `success === true`
    if (response?.success) {
      $toast("Profil berhasil diperbarui!", "success");
    } else {
      console.error("Gagal memperbarui profil:", response?.message);
      $toast("Gagal memperbarui profil.", "error");
    }
  } catch (error) {
    console.error("Error saat memperbarui profil:", error);
    $toast("Gagal memperbarui profil.", "error");
  } finally {
    isLoading.value = false;
  }
};



onMounted(async () => {
  try {
    isLoading.value = true;

    // Ambil data pengguna
    const userRes = await useFetchApi("/api/users/me", { method: "GET" });
    if (userRes?.data) {
      user.value = { ...userRes.data };
    } // <-- Menutup `if` dengan `}` agar tidak error

  } catch (error) {
    console.error("Gagal mengambil data profil:", error);
    $toast("Gagal mengambil data profil.", "error");
  } finally {
    isLoading.value = false;
  }
});



</script>
