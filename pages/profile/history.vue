<template>
  <profile-sidebar/>
  <div class="w-full lg:ps-64">
    <h1 class="text-center text-base font-normal mb-6">Riwayat Booking</h1>

    <div v-if="bookings.length > 0">
      <div
          v-for="(booking, index) in bookings"
          :key="booking.id"
          class="flex gap-4 mb-6">

        <!-- Kartu Booking -->
        <div class="flex flex-1 border border-gray-200 rounded-lg p-4 gap-6">
          <!-- Nomor Booking -->
          <span class="w-8 h-8text-gray-800 text-xs font-semibold flex items-top justify-center">
        {{ index + 1 }}
        </span>
          <!-- Gambar Properti -->
          <img
              :src="booking.property?.images || 'https://via.placeholder.com/300x200'"
              :alt="booking.property?.name || 'Properti Tidak Diketahui'"
              class="w-full w-max-[20%] rounded-lg object-cover flex-shrink-0"
          />

          <!-- Detail Booking -->
          <div class="flex flex-col justify-between flex-1">
            <div class="mb-4">
              <p class="text-xs text-green-600 mb-1">
                {{ booking.property?.city || "Lokasi tidak tersedia" }}
              </p>
              <h2 class="font-extrabold text-lg leading-tight mb-1">
                {{ booking.property?.name || "Properti Tidak Diketahui" }}
              </h2>
              <p class="text-sm font-normal">
                Rp {{ formatRupiah(booking.property?.price || 0) }}
              </p>
            </div>

            <div class="flex flex-col gap-3 max-w-xs">
              <div>
                <label class="block text-sm font-normal mb-1">Tanggal Masuk</label>
                <input
                    type="text"
                    class="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                    :value="formatTanggal(booking.checkInDate)"
                    readonly
                />
              </div>
              <div>
                <label class="block text-sm font-normal mb-1">Bulan</label>
                <input
                    type="text"
                    class="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                    :value="booking.duration"
                    readonly
                />
              </div>

              <div class="flex justify-between text-sm font-normal">
                <span>Total Harga</span>
                <span>Rp {{ formatRupiah(booking.totalAmount) }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm font-normal">
                <span>Status</span>
                <span
                    class="bg-green-500 text-white text-xs font-semibold rounded-full px-4 py-1"
                >
                  {{ booking.status || "Tidak Tersedia" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Jika Tidak Ada Booking -->
    <div v-else class="text-center text-gray-600 text-lg mt-6">
      <p>Belum ada riwayat booking.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const { handleError } = useErrorHandling();
const { $toast } = useNuxtApp();

const bookingsData = ref([]);
const isLoading = ref<boolean>(false);

const bookings = computed(() => bookingsData.value);

const fetchBookings = async () => {
  try {
    isLoading.value = true;
    const response = await useFetchApi('/api/bookings/my-bookings');

    if (response?.success) {
      bookingsData.value = response.data || [];
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

onMounted(async () => {
  await fetchBookings();
});

const formatTanggal = (tanggal: string) => {
  const date = new Date(tanggal);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
};

const formatRupiah = (angka: number) => {
  return angka.toLocaleString('id-ID');
};
</script>
