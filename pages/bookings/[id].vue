<template>
  <div class="container mx-auto p-6 space-y-8">
    <!-- Tombol Kembali -->
    <button @click="goBack"
            class="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">
      <span>&larr;</span>
      <span>Kembali</span>
    </button>

    <!-- Form Booking -->
    <div class="max-w-xl mx-auto">
      <h2 class="text-2xl font-bold w-full text-center space-y-10">Detail Riwayat Pemesanan</h2>
      <br><br><br>
      <div class="bg-white rounded-xl shadow-lg ">
        <form class="space-y-5"> <!-- Menambahkan space-y-5 -->
          <div class="w-full space-y-5"> <!-- Menambahkan space-y-5 -->
            <!-- Gambar Properti -->
            <div v-if="property" class="w-full">
              <img :src="property.images || 'https://via.placeholder.com/1200x500'"
                   class="rounded-xl shadow-lg w-full h-120 object-cover"
                   alt="Gambar properti">
            </div>

            <!-- Detail Properti -->
            <div class="w-full">
              <p class="text-sm text-[#24AB70]">{{ property.city }}</p>
              <h2 class="text-2xl font-bold">{{ property.name }}</h2>
              <p class="text-xl font-normal">
                Rp {{ property.price ? property.price.toLocaleString() : '...' }}
              </p>
            </div>
          </div>

          <br><br><br>

          <!-- Detail Pemesanan -->
          <div class="w-full text-center space-y-10"> <!-- Menambahkan space-y-5 -->
            <h2 class="text-2xl font-bold">Detail Pemesanan</h2>

            <!-- Nama -->
            <div class="text-left">
              <label class="block text-sm font-medium text-black mb-1">Nama</label>
              <input type="text" v-model="tenant.profile.name"
                     class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
            </div>

            <!-- Nomer Telepon -->
            <div class="text-left">
              <label class="block text-sm font-medium text-black mb-1">Nomer Telepon</label>
              <input type="text" v-model="tenant.profile.phone"
                     class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm" readonly/>
            </div>

            <!-- Email -->
            <div class="text-left">
              <label class="block text-sm font-medium text-black mb-1">Email</label>
              <input type="email" v-model="tenant.email"
                     class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm" readonly/>
            </div>

            <!-- Tanggal Masuk -->
            <div class="text-left">
              <label class="block text-sm font-medium text-black mb-1">Tanggal Masuk</label>
              <input type="date" v-model="booking.checkInDate"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg" readonly/>
            </div>

            <!-- Notes -->
            <div class="text-left">
              <label class="block text-sm font-medium text-black mb-1">Catatan</label>
              <textarea type="text" v-model="booking.notes"
                     class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm" readonly/>
            </div>

            <h1 class="text-lg font-normal flex justify-between">
              <span>Total harga:</span>
              <span>Rp {{ booking.totalAmount?.toLocaleString() || '0' }}</span>
            </h1>

          </div>

          <br>
          <br>

          <h2 class="text-2xl font-bold w-full text-center space-y-10">Bukti Pembayaran</h2>

          <div v-if="booking" class="w-full space-y-5">
            <!-- Kalau sudah ada bukti pembayaran -->
            <div v-if="booking.paymentLink" class="w-full flex justify-center">
              <img
                  :src="booking.paymentLink"
                  alt="Bukti pembayaran"
                  class="w-full max-w-md rounded shadow"
              />
            </div>

            <!-- Kalau belum ada -->
            <div v-else class="w-full">
              <p class="mb-2 text-sm text-gray-600 text-center">Belum ada bukti pembayaran.</p>
              <br>
              <router-link
                  :to="`/bookings/payment/${booking.id}`"
                  class="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Kirim Bukti Pembayaran
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import useFetchApi from "~/composables/useFetchApi";
import { useRouter } from 'vue-router';

const router = useRouter();


const { $toast } = useNuxtApp();
const route = useRoute();
const propertyId = ref<string | null>(route.params.id);
const isLoading = ref<boolean>(false);
const file = ref<File | null>(null);

const goBack = () => window.history.back();

const booking = ref({
  paymentLink: "",
  checkInDate: "",
  totalAmount: 0,
});

const tenant = ref({
  email: "",
  profile: {
    name: "",
    phone: "",
  },
});

const property = ref({
  name: "",
  city: "",
  price: 0,
  images: "",
});

const formatDate = (isoString: string) => {
  return isoString.split("T")[0]; // Mengambil bagian tanggal saja (YYYY-MM-DD)
};


onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await useFetchApi(`/api/bookings/${propertyId.value}`);

    if (response.success) {
      booking.value = response.data;
      tenant.value = response.data.tenant;
      property.value = response.data.property;
      booking.value.checkInDate = formatDate(response.data.checkInDate);
    } else {
      $toast("Gagal mengambil data booking", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    $toast("Terjadi kesalahan saat mengambil data.", "error");
  } finally {
    isLoading.value = false;
  }
});
</script>
