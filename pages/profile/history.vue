<template>
  <profile-sidebar/>

  <div class="w-200 lg:ps-64">
    <h1 class=" lg:ps-64 text-center font-semibold mb-4">Riwayat Booking</h1>

    <div v-if="bookings.length > 0">
      <div v-for="(booking, index) in bookings" :key="booking.id"  @click="goToBooking(booking.id)" class="flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
        <!-- Nomor Booking -->
        <div class="flex w-6 h-6 p-3 m-4 bg-blue-500 rounded-xl items-center justify-center">
          <span class="text-gray-800 text-xs font-semibold text-white">{{ index + 1 }}.</span>
        </div>

        <div class="flex flex-col item-left ">
          <!-- Gambar Properti -->
          <div class="w-100 h-40 flex justify-center items-center bg-blue-600 rounded-xl overflow-hidden">
            <img :src="booking.property?.images || 'https://via.placeholder.com/300'" :alt="booking.property?.name" class="w-full h-full object-cover"/>
          </div>

          <!-- Detail Properti -->
          <div class="text-left mt-2">
            <p class="text-xs text-green-600 mb-1">
              {{ booking.property?.city || "Lokasi tidak tersedia" }}
            </p>
            <h2 class="font-semibold text-xl leading-tight mb-1">
              {{ booking.property?.name || "Properti Tidak Diketahui" }}
            </h2>
            <p class="text-sm font-normal">Rp {{ formatRupiah(booking.property?.price || 0) }}</p>
          </div>
        </div>



        <!-- Detail Booking -->
        <div class="flex flex-col justify-between flex-1">
            <div>
              <label class="block text-xs font-medium mb-1">Tanggal Masuk</label>
              <input type="text" class="w-full rounded-md border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500" :value="formatTanggal(booking.checkInDate)" readonly/>
            </div>
            <div>
              <label class="block text-xs font-medium mb-1">Bulan</label>
              <input type="text" class="w-full rounded-md border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500" :value="booking.duration" readonly/>
            </div>

          <!-- Total Harga & Status -->
          <div class="flex justify-between items-center text-sm mt-3">
            <span>Total Harga </span>
            <span>Rp {{ formatRupiah(booking.totalAmount) }}</span>
          </div>

          <div class="flex items-center gap-2 text-sm mt-2">
            <span>Status:</span>
            <span :class="statusClass(booking.status)" class="text-white text-xs font-semibold rounded-full px-4 py-1">
            {{ booking.status || "Tidak Tersedia" }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Jika Tidak Ada Booking -->
    <div v-else class="text-center text-gray-600 text-lg mt-6">
      <p>Belum ada riwayat booking.</p>
    </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const { handleError } = useErrorHandling();
const { $toast } = useNuxtApp();

const bookingsData = ref([]);
const isLoading = ref<boolean>(false);

const bookings = computed(() => bookingsData.value);
import { useRouter } from "vue-router";

const router = useRouter();

const goToBooking = (id: number) => {
  router.push(`/bookings/${id}`);
};
const meta = ref({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1
});

const fetchBookings = async (page= 1) => {
  try {
    isLoading.value = true;
    const response = await useFetchApi(`/api/bookings/my-bookings?page=${page}&limit=${meta.value.limit}`);
    // const result = await response.json();
    if (response?.success) {
      bookingsData.value = response.data || [];
      meta.value = response.meta;
    } else {
      throw new Error(response?.message || "Gagal mengambil data booking.");
    }
  } catch (error) {
    handleError(error);
    $toast("Gagal mengambil data booking.", "error");
  } finally {
    isLoading.value = false;
  }
};


const goToPage = (page) => {
  if (page >= 1 && page <= meta.value.totalPages) {
    fetchBookings(page);
  }
};


const statusClass = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500"; // Warna kuning untuk status menunggu konfirmasi
    case "CONFIRMED":
      return "bg-blue-500"; // Warna biru untuk status dikonfirmasi
    case "PAID":
      return "bg-indigo-500"; // Warna indigo untuk sudah dibayar
    case "ACTIVE":
      return "bg-green-500"; // Warna hijau untuk sedang berlangsung
    case "COMPLETED":
      return "bg-gray-500"; // Warna abu-abu untuk selesai
    case "CANCELLED":
      return "bg-red-500"; // Warna merah untuk dibatalkan
    default:
      return "bg-gray-300"; // Warna abu-abu jika status tidak diketahui
  }
};

onMounted(async () => {
  await fetchBookings(1);
});

const formatTanggal = (tanggal: string) => {
  const date = new Date(tanggal);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const formatRupiah = (angka: number) => angka.toLocaleString('id-ID');
</script>
