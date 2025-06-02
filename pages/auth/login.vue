<template>
  <div class="h-screen w-screen grid grid-cols-1 md:grid-cols-2">

    <!-- Kolom Form -->
    <div class="flex items-center justify-center bg-white px-6 py-10 md:py-0">
      <div class="w-full max-w-md">
        <div class="text-center">
          <AppLogo />
          <h1 class="text-2xl font-bold text-gray-800 mt-4">Masuk</h1>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
          <div>
            <label for="email" class="block text-sm mb-2">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Masukkan Email"
                   class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>

          <div>
            <div class="flex justify-between items-center">
              <label for="password" class="block text-sm mb-2">Kata Sandi</label>
              <NuxtLink to="/auth/forget-password" class="text-sm text-blue-600 hover:underline">Lupa kata sandi?</NuxtLink>
            </div>
            <div class="relative">
              <input v-model="password" id="password" type="password" placeholder="Kata Sandi"
                     class="w-full py-3 px-4 pr-10 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" />
              <!-- Toggle Password -->
              <button type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.7 2.36-2.152 4.274-4.09 5.434" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <input v-model="isRemember" id="remember-me" type="checkbox"
                   class="text-blue-600 border-gray-200 rounded focus:ring-blue-500">
            <label for="remember-me" class="ml-2 text-sm">Ingat saya</label>
          </div>

          <button type="submit" :disabled="isLoading"
                  class="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
            {{ isLoading ? "Loading..." : "Masuk" }}
          </button>

          <p class="text-sm text-center text-gray-600">
            Belum punya akun?
            <NuxtLink to="/auth/register" class="text-blue-600 hover:underline font-medium">Daftar disini</NuxtLink>
          </p>
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
import AppLogo from "~/components/AppLogo.vue"; // Impor komponen AppLogo
import useAuth from "~/composables/useAuth";

// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});

// Mendapatkan instance nuxtApp untuk menggunakan toast
const { $toast } = useNuxtApp();

// Mendeklarasikan state untuk form login
const email = ref<string | null>(null); // Menyimpan email
const password = ref<string | null>(null); // Menyimpan password
const isRemember = ref<boolean>(false); // Flag untuk "Ingat Saya"
const isLoading = ref<boolean>(false); // Flag untuk status loading

// Mengambil fungsi login dari composable useAuth
const { login } = useAuth();
import { useCookie } from "nuxt/app";

const userRole = useCookie("user.role");

const handleSubmit = async () => {
  try {
    isLoading.value = true;

    if (!email.value || !password.value) {
      return;
    }

    // Melakukan proses login
    const data = await login({
      email: email.value,
      password: password.value
    });

    if (data?.success) {
      userRole.value = data.data.user.role; // Menyimpan role ke cookie
      localStorage.setItem("access_token", data.data.access_token);
    }

    if (isRemember.value && email.value) {
      localStorage.setItem("email", email.value);
    } else {
      localStorage.removeItem("email");
    }

    return navigateTo('/home-page');

  } catch (error: any) {
    console.error(error);
    $toast('Email atau kata sandi tidak cocok.', 'error');
  } finally {
    isLoading.value = false;
  }
};


// Menyimpan email pengguna di localStorage ketika komponen dipasang
onMounted(() => {
  email.value = localStorage.getItem("email") || null;
});
</script>

<style scoped>

</style>