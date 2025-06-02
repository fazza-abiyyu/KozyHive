<template>
  <!-- Sidebar -->
  <div id="hs-application-sidebar" class="hs-overlay  [--auto-close:lg]
    hs-overlay-open:translate-x-0
    -translate-x-full transition-all duration-300 transform
    w-[260px] h-full
    hidden
    fixed inset-y-0 start-0 z-[60]
    bg-white border-e border-gray-200
    lg:block lg:translate-x-0 lg:end-auto lg:bottom-0" role="dialog" tabindex="-1" aria-label="Sidebar">
    <div class="relative flex flex-col h-full max-h-full">
      <div class="px-6 pt-4">
        <!-- Logo -->
        <AppLogo/>
        <!-- End Logo -->
      </div>

      <!-- Content -->
      <div
          class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <nav class="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul class="flex flex-col space-y-1">
            <li>
              <NuxtLink class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/home-page" active-class="bg-gray-100">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Dashboard
              </NuxtLink>
            </li>

            <li>
                    <NuxtLink
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/dashboard/users" active-class="bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Pengguna

                      <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                    </NuxtLink>
            </li>

            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/dashboard/booking" active-class="bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>

                Penyewa

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/dashboard/properties" active-class="bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.0001 3.33301H6.00008C5.64646 3.33301 5.30732 3.47348 5.05727 3.72353C4.80722 3.97358 4.66675 4.31272 4.66675 4.66634V15.333C4.66675 15.6866 4.80722 16.0258 5.05727 16.2758C5.30732 16.5259 5.64646 16.6663 6.00008 16.6663H14.0001C14.3537 16.6663 14.6928 16.5259 14.9429 16.2758C15.1929 16.0258 15.3334 15.6866 15.3334 15.333V4.66634C15.3334 4.31272 15.1929 3.97358 14.9429 3.72353C14.6928 3.47348 14.3537 3.33301 14.0001 3.33301Z" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 12.6665L8.232 12.5065C9.20867 11.8312 10.792 11.8312 11.768 12.5065L12 12.6665" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.33325 6.66699H7.33992" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.6667 6.66699H12.6734" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 6.66699H10.0067" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 9.33301H10.0067" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.6667 9.33301H12.6734" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.33325 9.33301H7.33992" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.66675 16.6663V12.333M11.3334 12.333V16.6663" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Kost

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/dashboard/transactions" active-class="bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3335 6H4.66683C3.93045 6 3.3335 6.59695 3.3335 7.33333V12.6667C3.3335 13.403 3.93045 14 4.66683 14H15.3335C16.0699 14 16.6668 13.403 16.6668 12.6667V7.33333C16.6668 6.59695 16.0699 6 15.3335 6Z" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.99984 11.3337C10.7362 11.3337 11.3332 10.7367 11.3332 10.0003C11.3332 9.26395 10.7362 8.66699 9.99984 8.66699C9.26346 8.66699 8.6665 9.26395 8.6665 10.0003C8.6665 10.7367 9.26346 11.3337 9.99984 11.3337Z" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 10H6.00667M14 10H14.0067" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Transaksi

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </NuxtLink>
            </li>

            <li class="hs-accordion" id="properties-accordion">
              <button type="button"
                      class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      aria-expanded="true" aria-controls="properties-accordion-child">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_220994_2241)">
                    <path d="M10.0002 16.6663C13.6821 16.6663 16.6668 13.6816 16.6668 9.99967C16.6668 6.31778 13.6821 3.33301 10.0002 3.33301C6.31826 3.33301 3.3335 6.31778 3.3335 9.99967C3.3335 13.6816 6.31826 16.6663 10.0002 16.6663Z" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.6668 7.33301H8.66683C8.31321 7.33301 7.97407 7.47348 7.72402 7.72353C7.47397 7.97358 7.3335 8.31272 7.3335 8.66634C7.3335 9.01996 7.47397 9.3591 7.72402 9.60915C7.97407 9.8592 8.31321 9.99967 8.66683 9.99967H11.3335C11.6871 9.99967 12.0263 10.1402 12.2763 10.3902C12.5264 10.6402 12.6668 10.9794 12.6668 11.333C12.6668 11.6866 12.5264 12.0258 12.2763 12.2758C12.0263 12.5259 11.6871 12.6663 11.3335 12.6663H7.3335" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 14V6" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_220994_2241">
                      <rect width="16" height="16" fill="white" transform="translate(2 2)"/>
                    </clipPath>
                  </defs>
                </svg>
                Kost

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>

                <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              <div id="posyandu-accordion-child"
                   class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                   role="region" aria-labelledby="posyandu-accordion">
                <ul class="ps-4 pt-1 mt-2 space-y-1 border-l-2 ml-4">
                  <li>
                    <NuxtLink
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/dashboard/properties/my-properties" active-class="bg-gray-100">
                      Daftar
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/dashboard/properties/add" active-class="bg-gray-100">
                      Tambah
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>

            <li class="hs-accordion" id="keuangan-accordion">
              <button type="button"
                      class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      aria-expanded="true" aria-controls="keuangan-accordion-child">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_220994_2241)">
                    <path d="M10.0002 16.6663C13.6821 16.6663 16.6668 13.6816 16.6668 9.99967C16.6668 6.31778 13.6821 3.33301 10.0002 3.33301C6.31826 3.33301 3.3335 6.31778 3.3335 9.99967C3.3335 13.6816 6.31826 16.6663 10.0002 16.6663Z" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.6668 7.33301H8.66683C8.31321 7.33301 7.97407 7.47348 7.72402 7.72353C7.47397 7.97358 7.3335 8.31272 7.3335 8.66634C7.3335 9.01996 7.47397 9.3591 7.72402 9.60915C7.97407 9.8592 8.31321 9.99967 8.66683 9.99967H11.3335C11.6871 9.99967 12.0263 10.1402 12.2763 10.3902C12.5264 10.6402 12.6668 10.9794 12.6668 11.333C12.6668 11.6866 12.5264 12.0258 12.2763 12.2758C12.0263 12.5259 11.6871 12.6663 11.3335 12.6663H7.3335" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 14V6" stroke="#E5E7EB" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_220994_2241">
                      <rect width="16" height="16" fill="white" transform="translate(2 2)"/>
                    </clipPath>
                  </defs>
                </svg>
                Keuangan

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>

                <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              <div id="posyandu-accordion-child"
                   class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                   role="region" aria-labelledby="posyandu-accordion">
                <ul class="ps-4 pt-1 mt-2 space-y-1 border-l-2 ml-4">
                  <li>
                    <NuxtLink
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/dashboard/cashflow" active-class="bg-gray-100">
                      Daftar
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/dashboard/cashflow/owner" active-class="bg-gray-100">
                      Daftar
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        to="/dashboard/cashflow/add" active-class="bg-gray-100">
                      Pengajuan
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/home-page" active-class="bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                Kembali

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <!-- End Content -->
    </div>
  </div>
  <!-- End Sidebar -->
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>