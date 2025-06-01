<template>
  <!-- ========== HEADER ========== -->
  <header class="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-7">
    <nav class="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
      <div class="lg:col-span-3 flex items-center">
        <!-- Logo -->
        <a class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="/home-page" aria-label="Preline">
          <AppLogo/>
        </a>
        <!-- End Logo -->
        <div class="ms-1 sm:ms-2">

        </div>
      </div>

      <!-- Button Group -->
      <div class="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
        <button
            type="button"
            :onclick="`location.href='${userProfileLink}'`"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-[35px] border border-transparent bg-[#2563EB] text-white hover:bg-[#1E4BB8] focus:bg-[#1E4BB8] transition disabled:opacity-50 disabled:pointer-events-none">

          <!-- Hanya tampil jika sudah login -->
          <template v-if="isLoggedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z" stroke="white" stroke-linejoin="round"/>
              <path d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z" stroke="white"/>
            </svg>
          </template>

          {{ isLoggedIn ? 'Profile' : 'Login' }} <!-- ✅ Jika sudah login, ubah jadi "Profile" -->
        </button>
      </div>
      <!-- End Button Group -->

      <!-- Collapse -->
      <div id="hs-navbar-hcail" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6" aria-labelledby="hs-navbar-hcail-collapse">
        <div class="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
          <div>
            <a class="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600 dark:text-black dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Beranda</a>
          </div>
          <div>
            <a class="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600 dark:text-black dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Tentang Kami</a>
          </div>
          <div>
            <a class="inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600 dark:text-black dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Kontak Kami</a>
          </div>
        </div>
      </div>
      <!-- End Collapse -->
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isLoggedIn = ref(false);
const userProfileLink = ref("/auth/login");

onMounted(() => {
  if (process.client) { // ✅ Pastikan hanya di client-side
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn.value = true;
      userProfileLink.value = "/profile"; // Ganti ke halaman profil
    }
  }
});
</script>