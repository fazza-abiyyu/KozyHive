<template>
  <div class="container mx-auto p-6 space-y-8">
    <!-- Button Kembali -->
      <button @click="goBack"
              class="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-100">
        <span>&larr;</span> <!-- Panah kiri -->
        <span>Kembali</span>
      </button>

    <!-- Gambar Properti -->
    <div class="w-full">
      <img :src="property.images || 'https://via.placeholder.com/1200x500'"
           class="rounded-xl shadow-lg w-full h-120 object-cover"
           alt="Gambar properti">
    </div>

    <!-- Profile -->
    <div class="flex items-center space-x-4">
      <img class="size-16 rounded-full"
           src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=320&h=320&fit=facearea&facepad=3&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           alt="Avatar">
      <h1 class="text-lg font-medium text-gray-800 black:text-neutral-200">
        {{ property.owner.profile.name || "Nama tidak diketahui" }}
      </h1>
    </div>


    <!-- Deskripsi Properti & Form Booking -->
    <div class="grid md:grid-cols-2 gap-8">

      <!-- Deskripsi Properti -->
        <!-- End Profile -->
      <div class="space-y-4 text-black">
        <p class="text-sm text-[#2563EB]">{{ property.address }}</p>
        <h2 class="text-2xl font-bold">{{ property.name }}</h2>
        <p class="text-xl font-normal">
          Rp {{ property.price ? property.price.toLocaleString() : '...' }}
        </p>
        <p class="text-sm text-gray-600">Sisa Kamar {{ property.availableRooms }}/{{ property.totalRooms }}</p>

        <h2 class="text-2xl font-semibold text-[20px]">Deskripsi</h2>
        <p class="text-gray-700 text-sm">{{ property.description }}</p>
      </div>
      <!-- Form Booking Minimal -->
      <div class="w-[90%] mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-[10px]">
          <form @submit.prevent="submitBooking" class="space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-black mb-1">Nama</label>
              <input
                  type="text" v-model="user.profile.name"
                  class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-black mb-1">Nomer Telepon</label>
              <input
                  type="text" v-model="user.profile.phone"
                  class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-black mb-1">Email</label>
              <input
                  type="text" v-model="user.email"
                  class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
            </div>

            <!-- Tanggal Masuk -->
            <div>
              <label class="block text-sm font-medium text-black mb-1">Tanggal Masuk</label>
              <input type="date" v-model="booking.checkInDate"
                     class="w-full px-[10px] py-[10px] border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                     required>
            </div>

            <!-- Lama Sewa -->
            <div>
              <label class="block text-sm font-medium text-black mb-1">Lama Sewa (bulan)</label>
              <div class="flex justify-between items-center border border-white rounded-lg shadow-sm bg-white px-4">
                <!-- Input Angka -->
                <input type="number" v-model="booking.duration" min="1"
                       class="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                       required>

                <!-- Tombol "-" dan "+" di ujung kanan -->
                <div class="flex space-x-2">
                  <button type="button" @click="booking.duration = Math.max(1, booking.duration - 1)"
                          class="px-2 py-2 text-gray-700 bg-white  hover:bg-gray-100">
                    -
                  </button>

                  <button type="button" @click="booking.duration++"
                          class="px-2 py-2 text-gray-700 bg-white hover:bg-gray-100">
                    +
                  </button>
                </div>
              </div>
            </div>


            <!-- Deposit -->
<!--            <div>-->
<!--              <label class="block text-sm font-medium text-black mb-1">Deposit (Rp)</label>-->
<!--              <input type="number" v-model="booking.deposit" min="0"-->
<!--                     class="w-full px-[10px] py-[10px] border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"-->
<!--                     required>-->
<!--            </div>-->

            <!-- Catatan -->
            <div>
              <label class="block text-sm font-medium text-black mb-1">Catatan</label>
              <textarea v-model="booking.notes" rows="3"
                        class="w-full px-[10px] py-[10px] border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>

            <!-- Tombol Submit -->
            <div>
              <button type="submit"
                      class="w-full bg-blue-600 hover:bg-blue-700 text-white px-[10px] py-[10px] rounded-lg shadow transition">
                Pesan Sekarang
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';
import { useNuxtApp } from '#app';

const { $toast } = useNuxtApp();
const route = useRoute();
const propertyId = ref<string | null>(route.params.id);
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  window.history.back(); // Navigasi ke halaman sebelumnya
};

const property = ref<Record<string, any>>({
  owner: {
    profile: {
      name: "",
    }
  }
});

const booking = ref({
  propertyId:  Number(propertyId.value), // ID otomatis dari URL
  checkInDate: "",
  duration: 1, // User input
  deposit: 0, // User input
  notes: "",
  name: "",
  phone: "",
  email: ""
});


const user = ref({
  id: null,
  email: "",
  role: "",
  createdAt: "",
  updatedAt: "",
  profile: { name: "", phone: "", email: "" }, // Pastikan profile sudah ada
  tenantBookings: [],
  tenantTransactions: [],
  properties: [],
  ownerBookings: [],
  ownerTransactions: []
});


const isLoading = ref<boolean>(false);

const profile = ref<Record<string, any>>({});


// Fetch data properti berdasarkan ID dari URL
onMounted(async () => {
  try {
    await fetchUserData()
    const res = await fetch(`/api/properties/${propertyId.value}`);
    const result = await res.json();
    if (result.success) {
      property.value = result.data;
    } else {
      console.error("Gagal mengambil data properti:", result.message);
    }
  } catch (err) {
    console.error("Terjadi kesalahan saat mengambil data properti:", err);
  }
});



// Fungsi untuk reset form
const clearForm = () => {
  booking.value = {
    propertyId: propertyId.value,
    checkInDate: "",
    duration: 1,
    deposit: 0,
    notes: "",
    name: "",
    phone: "",
    email: ""
  };
};

async function fetchProfileData() {
  isLoading.value = true;
  try {
    const {data} = await useFetchApi(`/api/profile`, {
      method: "GET",
    }) as { data: Profile };
    profile.value = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email
    };
  } catch (error) {
    $toast("Gagal mengambil data profil.", "error");
  } finally {
    isLoading.value = false;
  }
}
async function fetchUserData() {
  isLoading.value = true;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan, harap login ulang.");
    }

    const response = await useFetchApi(`/api/auth/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response?.data) {
      throw new Error("User tidak ditemukan.");
    }

    user.value = {
      id: response.data.id,
      email: response.data.email,
      role: response.data.role,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
      profile: response.data.profile ?? { name: "", phone: "", email: "" }, // Prevent undefined error
      tenantBookings: response.data.tenantBookings ?? [],
      tenantTransactions: response.data.tenantTransactions ?? [],
      properties: response.data.properties ?? [],
      ownerBookings: response.data.ownerBookings ?? [],
      ownerTransactions: response.data.ownerTransactions ?? [],
    };

  } catch (error) {
    console.error("Error saat mengambil data user:", error);
    $toast("Gagal mengambil data user.", "error");
  } finally {
    isLoading.value = false;
  }
}

// Fungsi untuk submit booking
const submitBooking = async () => {
  if (!user.value) {
    $toast("Kamu harus login dulu sebelum booking.", "error");
    return router.push("/auth/login");
  }

  try {
    isLoading.value = true;

    const response = await useFetchApi("/api/bookings", {
      method: "POST",
      body: {
        propertyId: booking.value.propertyId,
        checkInDate: new Date(booking.value.checkInDate).toISOString(),
        duration: Number(booking.value.duration),
        deposit: Number(booking.value.deposit),
        notes: booking.value.notes,
      }
    });

    if (response?.success && response.data?.id) {
      $toast("Berhasil membuat reservasi.", "success");
      clearForm();
      router.push(`/bookings/payment/${response.data.id}`); // Ambil ID dari respons API
    } else {
      throw new Error(response?.message || "Terjadi kesalahan dalam pemesanan.");
    }
  } catch (error) {
    console.error("Error saat membuat reservasi:", error);
    $toast("Gagal membuat reservasi.", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
